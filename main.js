$(document).ready(function() {
<<<<<<< HEAD
    var text = $('textarea[name=text]').val();
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var width = 1024;
    var height = 512;
    var opacity = 0.5;
    var textAlign = "left";
    var position = "top";
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.font = 'bold 52px Helvetica Neue, Helvetica, Arial, sans-serif';
    wrapText(ctx, text.toUpperCase(), 35, 82, 974, 58);

    function updateCanvas() {
        var imgsrc = $("input[name=imgstr]").val();
        if(typeof imgsrc != 'undefined' && imgsrc != "") {
            var img = new Image();
            img.src = imgsrc
            img.onload = function() {
                // clear
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.rect(0, 0, width, height);
                ctx.fillStyle = '#ccc';
                ctx.fill();

                // background image
                drawImageProp(ctx, img, 0, 0, width, height);

                // overlay
                var color = $("input[name=colorstr]").val();
                if(typeof color != 'undefined' && color != "") {
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.rect(0, 0, width, height);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                // text
                var text = $('textarea[name=text]').val();
                ctx.fillStyle = "#ffffff";
                ctx.font = 'bold 52px Helvetica Neue, Helvetica, Arial, sans-serif';
                wrapText(ctx, text.toUpperCase(), 35, 82, width - 50, 58);

                // logo
                var logosrc = $("input[name=logostr]").val();
                if(typeof logosrc != 'undefined' && logosrc != "") {
                    var logo = new Image();
                    logo.src = logosrc;
                    logo.onload = function() {
                        //var ratio = 350 / logo.width;
                        //var iw = 350;
                        //var ih = ratio * logo.height;
                        var x = width - 50 - logo.width;
                        var y = height - 40 - logo.height;
                        ctx.drawImage(logo, x, y, logo.width, logo.height);
                    }
                }
            }
        } else {
            var logosrc = $("input[name=logostr]").val();
            if(typeof logosrc != 'undefined') {
                // clear
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.rect(0, 0, width, height);
                ctx.fillStyle = '#ccc';
                ctx.fill();

                // overlay
                var color = $("input[name=colorstr]").val();
                if(typeof color != 'undefined' && color != "") {
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.rect(0, 0, width, height);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                // text
                var text = $('textarea[name=text]').val();
                ctx.fillStyle = "#ffffff";
                ctx.font = 'bold 52px Helvetica Neue, Helvetica, Arial, sans-serif';
                wrapText(ctx, text.toUpperCase(), 35, 82, width - 50, 58);

                // logo
                var logo = new Image();
                logo.src = logosrc;
                logo.onload = function() {
                    //var ratio = 350 / logo.width;
                    //var iw = 350;
                    //var ih = ratio * logo.height;
                    var x = width - 50 - logo.width;
                    var y = height - 40 - logo.height;
                    ctx.drawImage(logo, x, y, logo.width, logo.height);
                }
            } else {
                ctx.clearRect(0, 0, width, height);

                // overlay
                var color = $("input[name=colorstr]").val();
                if(typeof color != 'undefined' && color != "") {
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.rect(0, 0, width, height);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }

                // text
                var text = $('textarea[name=text]').val();
                ctx.fillStyle = "#ffffff";
                ctx.font = 'bold 52px Helvetica Neue, Helvetica, Arial, sans-serif';
                wrapText(ctx, text.toUpperCase(), 35, 82, width - 50, 58);
            }
        }
    }

    function loadImg(input, option) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                if (option == "img") {
                    $("input[name=imgstr]").val(e.target.result);
                    updateCanvas();
                } else if (option == "logo") {
                    $("input[name=logostr]").val(e.target.result);
                    updateCanvas();
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill
        if (nw < w) ar = w / nw;
        if (nh < h) ar = h / nh;
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        if(textAlign == "right") {
          x = width - 35;
        } else if(textAlign == "center") {
          x = width / 2;
        }
        context.textAlign = textAlign;

        if(position == "middle") {
          y = height / 2;
        } else if(position == "bottom") {
          y = height - 100;
        }

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {

              context.fillText(line, x, y);
              line = words[n] + ' ';
              y += lineHeight;
            }
            else {
              line = testLine;
            }
        }

        context.fillText(line, x, y);
    }

    $('input[name=img]').change(function() {
        var x = document.getElementsByClassName("input-image");
        loadImg(x[0], "img");
    });

    $('input[name=logo]').change(function() {
        var y = document.getElementsByClassName("input-logo");
        loadImg(y[0], "logo");
    });

    $('textarea[name=text]').keyup(function() {
        updateCanvas();
    });

    $('input[name=overlay]').change(function() {
        var color = $('input[name=overlay]:checked').val();
        $("input[name=colorstr]").val(color);
        updateCanvas();
    });

    $('select[name=ratio]').change(function() {
      var ratio = $(this).val();
      if(ratio == 0) {
        width = 1024;
        height = 512;
      } else {
        width = 600;
        height = 600;
      }
      c.width = width;
      c.height = height;
      updateCanvas();
    });

    $('select[name=textHAlign]').change(function() {
      textAlign = $(this).val();
      updateCanvas();
    });

    $('select[name=textVAlign]').change(function() {
      position = $(this).val();
      updateCanvas();
    });

    $('input[name=opacity]').change(function() {
      opacity = $(this).val();
      updateCanvas();
    });

    function dlCanvas() {
        var dt = c.toDataURL('image/png');

        dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
        dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=meme.png');

        this.href = dt;
    };

    document.getElementsByClassName("button-download")[0].addEventListener('click', dlCanvas, false);
=======
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
>>>>>>> gh-pages
});
