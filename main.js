$(document).ready(function() {
  $(function() {
    FastClick.attach(document.body);
  });

  $(".close").click(function() {
    $(this).parent().toggle();
    $(this).parent().find("img").remove();
  });
});
