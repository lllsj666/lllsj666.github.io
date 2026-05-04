/* Click Effect - Anime Hearts & Sakura */
(function () {
  var hearts = ['❤', '♥', '❣', '♡'];
  var sakuras = ['✿', '❀', '❁', '✾'];
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  function createEffect(x, y) {
    var el = document.createElement('span');
    var isSakura = Math.random() > 0.5;
    el.className = 'click-effect ' + (isSakura ? 'sakura' : 'heart');
    el.textContent = isSakura
      ? sakuras[Math.floor(Math.random() * sakuras.length)]
      : hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = (14 + Math.random() * 12) + 'px';
    document.body.appendChild(el);
    el.addEventListener('animationend', function () {
      el.remove();
    });
  }

  document.addEventListener('click', function (e) {
    if (isMobile) return;
    var count = 1 + Math.floor(Math.random() * 3);
    for (var i = 0; i < count; i++) {
      (function (delay) {
        setTimeout(function () {
          createEffect(
            e.clientX + (Math.random() - 0.5) * 30,
            e.clientY + (Math.random() - 0.5) * 20
          );
        }, delay * 80);
      })(i);
    }
  });
})();
