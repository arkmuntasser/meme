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
      var buffer = $("html").hasClass("touchevents") ? $(".content-editor-track").width() * .046785 : 0;

      scrollToId(id, startingPoint, baseSpeed, buffer);
    }
  });

  var scrollToId = function(id, startingPoint, baseSpeed, buffer) {
    var thatIndex = $(".content-editor-label").index($(id)) - 1;
    var thatLeft = $("html").hasClass("touchevents") ? thatIndex * 250 + buffer / 2 : thatIndex * 250;

    var thisIndex = $(".content-editor-label").index(startingPoint) - 1;
    var thisLeft = $("html").hasClass("touchevents") ? thisIndex * 250 + buffer / 2 : thisIndex * 250;

    var offsetDiff = Math.abs(thatLeft - thisLeft);
    var speed = (offsetDiff * baseSpeed) / 1000

    $(".content-editor-wrapper").animate({
      scrollLeft : thatLeft - buffer
    }, speed);
  }
});
