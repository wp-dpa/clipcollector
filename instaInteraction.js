
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
var postSth = function(postId, interactionType) {
    // Current timestamp
    var now = new Date();
    var ts = now.toISOString();
    console.log('posting ...');

    $.ajax({
        url: 'http://localhost:3000/interactions',
        type: 'json',
        data: {
            url: 'https://www.instagram.com/p/' + postId,
            timestamp: ts,
            interactionType: interactionType
        },
        method: 'POST',
        success: function(data){

            console.log(data);
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

        });




});

