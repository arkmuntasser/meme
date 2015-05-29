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

  $(".close").click(function() {
    $(this).parent().toggle();
    $(this).parent().find("img").remove();
  });
});
