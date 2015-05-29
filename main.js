$(document).ready(function() {
  $('body').on({
    'touchmove': function(e) {
      affixPane();
    }
  });

  $(window).scroll(function() {
    affixPane();
  });

  $(".close").click(function() {
    $(this).parent().toggle();
    $(this).parent().find("img").remove();
  });

  $(function() {
      FastClick.attach(document.body);
  });

  function isPortait() {
    var w = $(window).width();
    var h = $(window).height();
    return h > w;
  }

  function affixPane() {
    var position = $(this).scrollTop();
    if(position >= 65) {
      if($(this).width() <= 767 && isPortait() && !$(".container").hasClass("fix")) {
        $(".container").addClass("fix");
      }
    } else {
      if($(this).width() <= 767 && isPortait() && $(".container").hasClass("fix")) {
        $(".container").removeClass("fix");
      }
    }

    if(!isPortait()) {
      $(".container").removeClass("fix");
    }
  }

  window.addEventListener("orientationchange", function() {
      affixPane();
  }, false);
});
