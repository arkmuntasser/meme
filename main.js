$(document).ready(function() {
    function readURL(input, option) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(".preview").attr("style", "background-image: url(" + e.target.result + ")");
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

    // onchange for text input
    // put value from that into div preview-text
    // preview.val - select div with jquery and do .text as a string
    $('textarea[name=text]').keyup(function(){
        var t = $(this).val();
        $(".preview-text").text(t);
        console.log(t);
    });
});
