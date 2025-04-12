function makeHoles() {
  const multiRectClip = document.getElementById('multiRectClip');
  const video = document.getElementById('video');
  multiRectClip.innerHTML = '';
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => {
    // Пропускаем скрытые
    if (window.getComputedStyle(hole).display === 'none') {
      return;
    }
    // Все элементы наложены друг на друга, координаты можно вычислять относительно viewport
    const rectParams = hole.getBoundingClientRect();
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // Устанавливаем атрибуты rect (с учетом возможной прокрутки страницы)
    const x = window.scrollX + window.scrollX;
    const y = window.scrollY + window.scrollY;
    // координата X верхнего левого угла
    rect.setAttribute('x', x);
    // координата Y верхнего левого угла
    rect.setAttribute('y', y);
    // ширина
    rect.setAttribute('width', rectParams.width);
    // высота
    rect.setAttribute("height", rectParams.height);
    // отправляем в clipPath
    multiRectClip.appendChild(rect);
  })
  video.style.clipPath = 'url(#multiRectClip)';
}

const events = ['resize', 'load', 'scroll'];
events.forEach(event => {
  window.addEventListener(event, () => {
    makeHoles();
  })
})
