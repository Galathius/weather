define(function() {
  var Utils = {};

  Utils.delay = (function () {
      var timer = 0;
      return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    }
  })();

  return Utils;
});

