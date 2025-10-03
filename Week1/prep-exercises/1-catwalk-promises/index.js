'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

const img = document.querySelector('img');

// Функция для центрирования кошки по вертикали
function centerVertically() {
  img.style.top = `${(window.innerHeight - img.height) / 2}px`;
}

// Сразу центрируем и делаем адаптацию при изменении окна
centerVertically();
window.addEventListener('resize', centerVertically);

// Начальная позиция слева за экраном
img.style.left = `-${img.width}px`;

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let pos = startPos;
    img.style.left = `${pos}px`;
    
    const interval = setInterval(() => {
      if (pos >= stopPos) {
        clearInterval(interval);
        resolve(); // промис завершён
      } else {
        pos += STEP_SIZE_PX;
        img.style.left = `${pos}px`;
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const originalSrc = img.src;
    img.src = DANCING_CAT_URL;
    
    setTimeout(() => {
      img.src = originalSrc;
      resolve(); // промис завершён
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  function loop() {
    walk(img, startPos, centerPos)
      .then(() => dance(img))
      .then(() => walk(img, centerPos, stopPos))
      .then(loop); // бесконечный цикл через промисы
  }

  loop(); // запускаем цикл один раз
}

// Ждём полной загрузки страницы
window.addEventListener('load', catWalk);
