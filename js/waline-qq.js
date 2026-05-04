/* Waline QQ auto-complete & nickname fetch */
(function () {
  var walineReady = false;

  function isQQNumber(val) {
    return /^\d{5,11}$/.test(val.trim());
  }

  function fetchQQNickname(qq, callback) {
    var url = 'https://api.usuuu.com/qq/?qq=' + qq;
    fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.code === 200 && data.data && data.data.name) {
          callback(data.data.name);
        }
      })
      .catch(function () {});
  }

  function setupWalineForm() {
    if (walineReady) return;
    var el = document.querySelector('#waline-wrap');
    if (!el) return;

    var emailInput = el.querySelector('input[name="mail"]');
    var nickInput = el.querySelector('input[name="nick"]');

    if (!emailInput || !nickInput) {
      setTimeout(setupWalineForm, 500);
      return;
    }

    walineReady = true;
    var qqFilled = false;

    emailInput.addEventListener('blur', function () {
      var val = emailInput.value.trim();
      if (isQQNumber(val) && !val.includes('@')) {
        emailInput.value = val + '@qq.com';
        qqFilled = true;
        if (!nickInput.value.trim()) {
          fetchQQNickname(val, function (name) {
            nickInput.value = name;
          });
        }
      }
    });

    emailInput.addEventListener('input', function () {
      qqFilled = false;
    });
  }

  // Watch for Waline render
  var observer = new MutationObserver(function () {
    setupWalineForm();
  });

  var checkInterval = setInterval(function () {
    var el = document.querySelector('#waline-wrap');
    if (el && el.children.length > 0) {
      clearInterval(checkInterval);
      observer.observe(el, { childList: true, subtree: true });
      setupWalineForm();
    }
  }, 300);
})();
