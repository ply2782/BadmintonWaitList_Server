"use strict";

if (navigator.userAgent.indexOf("iPhone") != -1) {
  addEventListener(
    "load",
    function () {
      setTimeout(hideURLbar, 0);
    },
    false
  );
}
//아이폰이 아닌경우
else {
  hideURLbar();
}

function hideURLbar() {
  window.scrollTo(0, 1);
}
