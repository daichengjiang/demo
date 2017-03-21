setInterval(function() {
  clock();
}, 1000);

function clock()
{
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  
  if ($('.h').text() != ((hours < 10 ? "0" : "") + hours)){
     $('.h').text((hours < 10 ? "0" : "") + hours);
     shake($('.h'));
  }
  
  if ($('.m').text() != ((minutes < 10 ? "0" : "") + minutes)) {
    $('.m').text((minutes < 10 ? "0" : "") + minutes);
    shake($('.m'));
  }
  
  if ($('.s').text() != ((seconds < 10 ? "0" : "") + seconds)) {
    $('.s').text((seconds < 10 ? "0" : "") + seconds);
    shake($('.s'));
  }
}

$(document).load(function(){
  clock();
});

function shake(t) {
  t.addClass('shake-constant');
  setTimeout(function() {
    t.removeClass('shake-constant');
  }, 470)
}