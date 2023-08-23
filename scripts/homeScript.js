var isIcon1Visible;

window.onload = playMusic;

document.getElementById("soundMb3").addEventListener("click", () => {
  isIcon1Visible == true ? playMusic() : pauseMusic();
});

function playMusic() {
  var soundMb3 = document.getElementById("soundMb3Id");
  var icon = document.getElementById("soundMb3");
  icon.setAttribute("class", "play-icon");
  isIcon1Visible = false;
  soundMb3.play();
}
function pauseMusic() {
  var soundMb3 = document.getElementById("soundMb3Id");
  var icon = document.getElementById("soundMb3");
  icon.setAttribute("class", "pause-icon");
  isIcon1Visible = true;
  soundMb3.pause();
}

function onClickCard(page) {
  open(page, "_self");
}
