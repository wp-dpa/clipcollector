$('body').prepend('\
<div id="clipcollector-basegui">\
  <h1 class="clipcollector-gui-h">Dieses Posting</h1><br><br>\
  <label for="clipcollector-rating">Bewertung</label>\
  <input id="clipcollector-rating" name="clipcollector-rating" type="number" placeholder="0-5" min="0" max="5" />\
  <label for="clipcollector-tags">Tags</label>\
	<input id="clipcollector-tags" name="clipcollector-tags" type="text" placeholder="#tag1 #tag2 ..." />\
	<label><input id="clipcollector-flag" name="clipcollector-flag" type="checkbox" />Interaktion n&ouml;tig</label>\
  <label for="clipcollector-notes">Notiz</label>\
	<input id="clipcollector-notes" name="clipcollector-notes" type="input" placeholder="..." />\
  <button class="clipcollector-curateButton">Speichern</button>\
');
$('#clipcollector-basegui').css({
  position: "fixed",
  right: "0",
  bottom: "50%",
  "z-index": "1000",
  "background-color": "grey",
  border: "1px solid black",
  "border-radius": "12px",
  padding: "5px",
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

var targetAnchors = $(".coreSpriteSaveOpen");
for(var csso in targetAnchors){
  $(targetAnchors[csso]).parent().parent().append('\
  <button class="clipcollector-pickButton">HI!!!</button>\
  ');
}
// TODO When curation fields change, mark as unsaved
$(".clipcollector-curateButton").click(function(evt) {
  // TODO Save curation to DB
  var curateID = $(this).attr('id').split(':')[1];
  console.log('Save op for ' + curateID);
  // TODO Mark as saved
});
$(".clipcollector-pickButton").click(function(evt) {
  var pickedID = $(this).closest('article').find('time').closest('[href^="/p/"]').attr('href').match(/\/p\/([^\/]+)/)[1];
  $('.clipcollector-curateButton').attr('id', 'curate:'+pickedID);
  var storedData = {
    rating: 3,
    tags: "#one #two #three",
    flag: false,
    notes: "Interesting"
  }; // TODO From DB
  for (field in storedData) {
    console.log('k',field,'v',storedData[field]);
    if (field != "flag") {
      $('#clipcollector-'+field).val(storedData[field]);
    } else {
      // Special case for checkbox
      $('#clipcollector-'+field).attr('checked','checked');
    }
  }
  $('#clipcollector-basegui').show();
});
