"use strict";

function getDate() {
  const today = new Date();

  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  return date;
}

function sortArray(x) {
  if (x.complete) {
    return 1;
  }
  if (!x.complete) {
    return -1;
  }
  return 0;
}

export { getDate, sortArray };
