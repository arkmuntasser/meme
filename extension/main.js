var c = new Canvas({});
var align = 1;
var position = 1;
var overlay = 1;

// handle image
function loadImg() {
  var input = document.getElementById("mememaker-input-image");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      c.changBackgroundImage(e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

document.getElementById("mememaker-input-image").addEventListener('change', loadImg, false);

// uploader
function uploadImage() {
  document.getElementById("mememaker-input-image").click();
};

document.getElementById("mememaker-upload").addEventListener('click', uploadImage, false);

// align
function changeAlignment() {
  align++;
  align = align > 3 ? 1 : align;

  switch (align) {
    case 1:
      c.changeTextAlignment("left");
      document.getElementById("mememaker-textarea").classList.remove('textarea-right');
      document.getElementById("mememaker-textarea").classList.add('textarea-left');
      break;
    case 2:
      c.changeTextAlignment("center");
      document.getElementById("mememaker-textarea").classList.remove('textarea-left');
      document.getElementById("mememaker-textarea").classList.add('textarea-center');
      break;
    case 3:
      c.changeTextAlignment("right");
      document.getElementById("mememaker-textarea").classList.remove('textarea-center');
      document.getElementById("mememaker-textarea").classList.add('textarea-right');
      break;
  }
}

document.getElementById("mememaker-align").addEventListener('click', changeAlignment, false);

// position
function changePosition() {
  position++;
  position = position > 3 ? 1 : position;

  switch (position) {
    case 1:
      c.changeTextPosition("top");
      document.getElementById("mememaker-textarea").classList.remove('textarea-bottom');
      document.getElementById("mememaker-textarea").classList.add('textarea-top');
      break;
    case 2:
      c.changeTextPosition("middle");
      document.getElementById("mememaker-textarea").classList.remove('textarea-top');
      document.getElementById("mememaker-textarea").classList.add('textarea-middle');
      break;
    case 3:
      c.changeTextPosition("bottom");
      document.getElementById("mememaker-textarea").classList.remove('textarea-middle');
      document.getElementById("mememaker-textarea").classList.add('textarea-bottom');
      break;
  }
}

document.getElementById("mememaker-position").addEventListener('click', changePosition, false);

// overlay
function changeColor() {
  overlay++;
  overlay = overlay > 9 ? 1 : overlay;

  switch (overlay) {
    case 1:
      c.changOverlayColor("transparent");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-black');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-none');
      break;
    case 2:
      c.changOverlayColor("#c0392b");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-none');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-red');
      break;
    case 3:
      c.changOverlayColor("#e67e22");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-red');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-orange');
      break;
    case 4:
      c.changOverlayColor("#f1c40f");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-orange');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-yellow');
      break;
    case 5:
      c.changOverlayColor("#2ecc71");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-yellow');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-green');
      break;
    case 6:
      c.changOverlayColor("#2980b9");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-green');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-blue');
      break;
    case 7:
      c.changOverlayColor("#8e44ad");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-blue');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-purple');
      break;
    case 8:
      c.changOverlayColor("#ff0080");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-purple');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-pink');
      break;
    case 9:
      c.changOverlayColor("#000000");
      document.getElementById("mememaker-overlay").classList.remove('control-overlay-pink');
      document.getElementById("mememaker-overlay").classList.add('control-overlay-black');
      break;
  }
}

document.getElementById("mememaker-overlay").addEventListener('click', changeColor, false);

// text
function updateText() {
  var text = document.getElementById("mememaker-textarea").value;

  c.changText(text);
}

document.getElementById("mememaker-textarea").addEventListener('keyup', updateText, false);

// download
function dlCanvas() {
  var dt = c.getDataUrl();

  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=meme.png');

  var d = new Date();
  this.download = "mememaker-" + d.getTime() + ".png";
  this.href = dt;
};

document.getElementById("mememaker-download").addEventListener('click', dlCanvas, false);
