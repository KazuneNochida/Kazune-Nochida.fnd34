'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const captureButton = document.getElementById("captureButton");
const camera = navigator.mediaDevices.getUserMedia;
let count = document.getElementById("cnt");
let color;

// カウントダウン用関数作成
function counter(num) {
  count.innerHTML = num;
}

// 一時的なPopup
function showPopup(message) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  popup.style.color = "white";
  popup.style.padding = "10px";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = "1000";
  popup.innerText = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 8000);
}

// カメラ起動
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("カメラの起動に失敗しました: ", err);
  });

// ボタンクリックで画像キャプチャ
captureButton.addEventListener("click", () => {
  setTimeout(() => counter("5"), 0);
  setTimeout(() => counter("4"), 1000);
  setTimeout(() => counter("3"), 2000);
  setTimeout(() => counter("2"), 3000);
  setTimeout(() => counter("1"), 4000);
  setTimeout(() => counter("0"), 5000);
  setTimeout(() => counter(""), 6000);
  setTimeout(() => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(canvas.width / 2, canvas.height / 2, 1, 1);
    const color = Array.from(imageData.data);
    console.log(`RGBA = ${color}`);
    if (color[0] * 3 >= color[1] * 4) {
      showPopup("あなたはブルベですねー");
      console.log(color[0]);
      console.log(color[1]);
    } else {
      showPopup("あなたはイエベですねー");
      console.log(color[0]);
      console.log(color[1]);
    }
  }, 5000);
});

function drawOmikuji() {
  const results = [
    "大吉 - 今日は絶好調💛素敵な恋が始まる予感！",
    "吉 - 今日はいいかんじ💛焦らず、自然体で！",
    "中吉 - まずまず💛誠実な気持ちで接すればいいことあるかも！",
    "小吉 - 恋愛運はやや低めですが、諦めずに努力することで状況が好転します。",
    "末吉 - 恋愛運は控えめです。自分自身を見つめ直す時期かもしれません。"
  ];
  const randomIndex = Math.floor(Math.random() * 5);
  const result = results[randomIndex];
  document.getElementById("omikuji-result").innerText = result;
}
