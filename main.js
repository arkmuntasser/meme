$(document).ready(function() {
  $(function() {
    FastClick.attach(document.body);
  });

  var getIOSWindowHeight = function() {
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    return window.innerHeight * zoomLevel;
  };

  $(window).resize(function() {
    $(".container").attr("style", "height: " + getIOSWindowHeight + "px;");
  });

  $(".container").attr("style", "height: " + getIOSWindowHeight + "px;");

  $(".close").click(function() {
    $(this).parent().toggle();
    $(this).parent().find("img").remove();
  });

  $(".open-close-toggle").click(function() {
    $("body").toggleClass("close");
  });
});
