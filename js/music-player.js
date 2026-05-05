/* Music player: ensure no autoplay, track user interaction only */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var checkAPlayer = setInterval(function () {
      var ap = document.querySelector('.aplayer');
      if (!ap) return;
      clearInterval(checkAPlayer);

      var audio = ap.querySelector('audio');
      if (audio) {
        audio.autoplay = false;
        audio.preload = 'none';
        audio.pause();
      }

      var miniSwitcher = ap.querySelector('.aplayer-miniswitcher');
      if (miniSwitcher) {
        miniSwitcher.addEventListener('click', function () {
          try { localStorage.setItem('fu_music_touched', '1'); } catch (e) {}
        });
      }
    }, 300);

    setTimeout(function () {
      clearInterval(checkAPlayer);
    }, 10000);
  });
})();
