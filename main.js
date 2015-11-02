$(document).ready(function() {
  $(function() {
    FastClick.attach(document.body);
  });

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
