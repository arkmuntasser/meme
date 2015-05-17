$(document).ready(function() {
    function readURL(input, option) {
        document.getElementById("bannerImg").style.display = "block";

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(".preview").attr("style", "background-image: url(" + e.target.result + ")");
                console.log(e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
});
