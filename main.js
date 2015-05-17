$(document).ready(function() {
    function readURL(input, option) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                if (option == "img") {
                    $(".preview").attr("style", "background-image: url(" + e.target.result + ")");
                } else if (option == "logo") {
                    $(".preview-logo").attr("style", "background-image: url(" + e.target.result + ")");
                }
                console.log(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('input[name=img]').change(function() {
        var x = document.getElementsByClassName("input-image");
        readURL(x[0], "img");
    });

    $('input[name=logo]').change(function() {
        var y = document.getElementsByClassName("input-logo");
        readURL(y[0], "logo");
    });

    $('textarea[name=text]').keyup(function() {
        var t = $(this).val();
        $(".preview-text").text(t);
        console.log(t);
    });

    $('.button-download').click(function() {
        html2canvas(document.getElementsByClassName("preview")[0], {
            onrendered: function(canvas) {
                Canvas2Image.saveAsPNG(canvas, 1024, 512);
            }
        });
    });

    $('input[name=overlay]').change(function() {
        var color = $('input[name=overlay]:checked').val();
        $(".preview-overlay").attr("style", "background-color:" + color);
        console.log(color);
    });

});
