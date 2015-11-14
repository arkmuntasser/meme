$(document).ready(function() {
  $(function() {
    FastClick.attach(document.body);
  });

  $(".close").click(function() {
    $(this).parent().toggle();
    $(this).parent().find("img").remove();
  });

  $(".open-close-toggle").click(function() {
    $("body").toggleClass("close");
  });

  $(".icon a").click(function(e) {
    e.preventDefault();
    if(!$(this).parent().hasClass("active")) {
      var prevHref = $(".icon.active a").attr("href");

      $(".icon").removeClass("active");
      $(this).parent().addClass("active");

      var id = $(this).attr("href");
      var startingPoint = $(prevHref);
      var baseSpeed = 400;
      var buffer = 0;

      scrollToId(id, startingPoint, baseSpeed, buffer);
    }
  });

  $(".content-editor-wrapper").scroll(function() {
    var left = $(this).scrollLeft();
  });

  var scrollToId = function(id, startingPoint, baseSpeed, buffer) {
    var thatIndex = $(".content-editor-label").index($(id)) - 1;
    var thatLeft = thatIndex * 250;

    var thisIndex = $(".content-editor-label").index(startingPoint) - 1;
    var thisLeft = thisIndex * 250;

    var offsetDiff = Math.abs(thatLeft - thisLeft);
    var speed = (offsetDiff * baseSpeed) / 1000

    $(".content-editor-wrapper").animate({
      scrollLeft : thatLeft - buffer
    }, speed);
  }
});
