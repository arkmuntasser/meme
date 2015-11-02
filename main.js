$(document).ready(function() {
  $(function() {
    FastClick.attach(document.body);
  });

  var getIOSWindowHeight = function() {
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    return window.innerHeight * zoomLevel;
  };

  var adjustHeight = function() {
    var iosHeight = getIOSWindowHeight();
    var height = $(window).height();
    var initPaddingTop = height - iosHeight;
    $(".container").attr("style", "height: " + iosHeight + "px; padding-top: " + initPaddingTop + "px;");
    $(".mobile-download-area").attr("style", "height: " + iosHeight + "px; padding-top: " + initPaddingTop + "px;");
    if($(".sidebar").css("height") === "auto") {

    }
  };

  $(window).resize(function() {
    adjustHeight();
  });

  adjustHeight();

  $(window).scroll(function() {
    var position = $(window).scrollTop();
  });

  $(".close").click(function() {
    $(this).parent().toggle();
    $(this).parent().find("img").remove();
  });

  $(".open-close-toggle").click(function() {
    $("body").toggleClass("close");
  });
});
