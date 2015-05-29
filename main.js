$(document).ready(function() {
  $(window).scroll(function() {
    var position = $(this).scrollTop();
    if(position >= 65) {
      if(!$(".container").hasClass("fix")) {
        $(".container").addClass("fix");
      }
    } else {
      if($(".container").hasClass("fix")) {
        $(".container").removeClass("fix");
      }
    }
  });
});
