$(document).ready(function() {
  var c = new Canvas({});

  // Image handler
  function loadImg(input, option) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
          if (option == "img") {
              c.changBackgroundImage(e.target.result);
          } else if (option == "logo") {
              c.changLogoImage(e.target.result);
          }
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  // image inputs
  $('input[name=img]').change(function() {
    var x = document.getElementsByClassName("input-image");

    loadImg(x[0], "img");
  });

  $('input[name=logo]').change(function() {
    var y = document.getElementsByClassName("input-logo");

    loadImg(y[0], "logo");
  });

  // ratio input
  $('select[name=ratio]').change(function() {
    var ratio = $(this).val();

    $(".canvas").toggleClass("wide");
    c.changRatio(ratio);
  });

  // text inputs
  $('select[name=textHAlign]').change(function() {
    textAlign = $(this).val();

    c.changeTextAlignment(textAlign);
  });

  $('select[name=textVAlign]').change(function() {
    position = $(this).val();

    c.changeTextPosition(position);
  });

  $('textarea[name=text]').keyup(function() {
    var text = $(this).val();

    c.changText(text);
  });

  // overlay inputs
  $('input[name=opacity]').change(function() {
    opacity = $(this).val();

    c.changeOverlayOpacity(opacity);
  });

  $('input[name=overlay]').change(function() {
    var color = $('input[name=overlay]:checked').val();

    c.changOverlayColor(color);
  });

  // downloader
  function dlCanvas(e) {
      var dt = c.getDataUrl();

      if($("html").hasClass("no-touchevents")) {
        dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=meme.png');

        var d = new Date();
        this.download = this.download + "-" + d.getTime() + ".png";
        this.href = dt;
      } else {
        e.stopPropagation();
        var ratio = $("canvas").hasClass("wide") ? "wide" : "square";
        $(".mobile-download-area-img").append('<img class="' + ratio + '" src="' + dt + '"/>');
        $("body").toggleClass("open");
      }
  };

  document.getElementsByClassName("button-download")[0].addEventListener('click', dlCanvas, false);
  document.getElementsByClassName("button-download")[1].addEventListener('click', dlCanvas, false);
});
