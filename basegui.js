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
