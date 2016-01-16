if(base64Img !== "") {
  c.changBackgroundImage(base64Img);
}

if(notoggle) {
  document.getElementById('memeMakerExtension').classList.remove("hide");
} else {
  document.getElementById('memeMakerExtension').classList.toggle("hide");
  notoggle = false;
}
