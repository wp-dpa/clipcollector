
// ==UserScript==
// @name     ClipCollector
// @version  0.1
// @grant    none
// @description   Collecting clip data for PR people
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @icon          https://monitor.buzzrank.de/media/images/oauth/logo.png
// @include       https://*instagram.com*
// ==/UserScript==


$('body').prepend('\
<div id="clipcollector-basegui">\
  <div class="clipcollector-guiwrapper">\
    <h1 class="clipcollector-gui-h">Dieses Posting</h1><br><br>\
    <label for="clipcollector-rating">Bewertung</label>\
    <input id="clipcollector-rating" name="clipcollector-rating" type="number" placeholder="0-5" min="0" max="5" />\
    <label for="clipcollector-tags">Tags</label>\
  	<input id="clipcollector-tags" name="clipcollector-tags" type="text" placeholder="#tag1 #tag2 ..." />\
  	<label><input id="clipcollector-flag" name="clipcollector-flag" type="checkbox" />Interaktion n&ouml;tig</label>\
    <label for="clipcollector-notes">Notiz</label>\
  	<input id="clipcollector-notes" name="clipcollector-notes" type="input" placeholder="..." />\
    <button class="clipcollector-curateButton">Speichern</button>\
  </div>\
</div>\
');
$('#clipcollector-basegui').css({
  position: "absolute",
  "z-index": "1000",
  "background-color": "grey",
  border: "1px solid black",
  "border-radius": "12px",
  padding: "5px",
});
$('.clipcollector-guiwrapper').css({
  position: "relative",
});

$('.clipcollector-gui-h').css({
  "font-size": "16px",
  "border-bottom": "1px solid grey",
});
$('#clipcollector-flag').css({
  "vertical-align": "middle",
  position: "relative",
  bottom: "2px",
});
$("#clipcollector-basegui").hide();

var curatedFields = ["rating", "tags", "flag", "notes"];

// TODO When curation fields change, mark as unsaved
$(".clipcollector-curateButton").click(function(evt) {
  var curateID = $(this).attr('id').split(':')[1];

  for (var f=0; f<curatedFields.length; f++) {
    var targetField = "#clipcollector-"+curatedFields[f];
    var value;
    if (curatedFields[f] == "flag") {
      value = $(targetField).prop("checked");
    } else {
      value = $(targetField).val();
    }
    postSth(curateID, curatedFields[f], value);
  }
  $("#clipcollector-basegui").hide();
});
function registerPickButtons() {
  console.log("REGISTER");
  $(".clipcollector-pickButton").unbind('click').click(function(evt) {
    var pickedID = $(this).closest('article').find('time').closest('[href^="/p/"]').attr('href').match(/\/p\/([^\/]+)/)[1];
    $('.clipcollector-curateButton').attr('id', 'curate:'+pickedID);
    for (var f=0; f<curatedFields.length; f++) {
      getSth(pickedID, curatedFields[f]);
    }
    // Locate right of button
    var targetPos = $(this).offset();
    $('#clipcollector-basegui').css({left: targetPos.left+'px', top: targetPos.top+'px'});
    $('#clipcollector-basegui').show();
  });
}


console.log(document.getElementsByClassName('coreSpriteHeartOpen'));



/**
 * ermittelt post-ID anhand eines DOM-Elements
 *
 */

var getPostId = function(ele) {

    var href = $(ele).closest('article').find('time').closest('[href^="/p/"]').attr('href');

    if (href.length) {
        var matches = href.match(/\/p\/([^\/]+)/);


        if (matches.length < 2 ) {
            console.log('error, post id not found', $this);
            return;
        }

        return matches[1];
    }
};

// AJAX-Post
var postSth = function(postId, interactionType, interactionValue) {
    // Current timestamp
    var now = new Date();
    var ts = now.toISOString();
    console.log('posting ...');
    postData = {
        url: 'https://www.instagram.com/p/' + postId,
        timestamp: ts,
        interactionType: interactionType
    }
    if(interactionValue !== undefined) {
      postData.value = interactionValue;
    }
    $.ajax({
        url: 'http://localhost:3000/interactions',
        type: 'json',
        data: postData,
        method: 'POST',
        success: function(data){

            console.log(data);
        }
    });

}

var getSth = function(postId, interactionType) {
  console.log("GET", postId, interactionType);
  $.get({
    url: 'http://localhost:3000/interactions?url=https://www.instagram.com/p/'+postId+'&interactionType='+interactionType,
    success: function(data) {
      console.log(data);
      if(data.length) {
        if (interactionType != "flag") {
          $('#clipcollector-'+interactionType).val(data[data.length-1].value);
        } else {
          // Special case for checkbox
          $('#clipcollector-'+interactionType).prop('checked', (data[data.length-1].value === "true"));

        }
      } else {
        if (interactionType != "flag") {
          $('#clipcollector-'+interactionType).val("");
        } else {
          // Special case for checkbox
          $('#clipcollector-'+interactionType).prop("checked", false);
        }

      }
    },
    error: function(err) {
      console.log('ERROR', err);
    }
  });
}

// Kommentarinteraktion erkennen
window.addEventListener('keypress', function(e) {


    var target = e.originalTarget;

    if ('undefined' === target['tagName'] || 'TEXTAREA' !== target.tagName) {
        return;
    }

    var id = getPostId(target);

    if (! id) {
        console.log('no post id');
        return;
    }


    if ('undefined' == typeof(e.which)) {
        console.log('unabale to detect key');
        return;
    }

    if (13 != e.which) {
        console.log('kein return');
        return;
    }

    postSth(id, 'comment');

});



window.addEventListener('scroll', function(e) {


    var $articles = $('article').not('.cc-found');

    if (! $articles.length) {
        return;
    }

    $articles
        .each(function(){

            var	$this = $(this);

            $this.addClass('cc-found');

            $btnLike = $this.find('.coreSpriteHeartOpen');
            if ($btnLike.length) {
                $btnLike.on('click', function(){
                    postSth(getPostId($this.get(0)), 'like');
                });
            }

            $btnLike.parent().parent().append('\
            <button class="clipcollector-pickButton">ClipCollector</button>\
            ');
            registerPickButtons();

        });




});


// Compile date Sa 17. Feb 12:24:15 CET 2018

