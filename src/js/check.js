'use strict';
function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  }

  if (typeof a === 'number') {
    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  }

  if (Array.isArray(a) && Array.isArray(b)) {

    var distancePath = a.reduce(function(prev, current, index) {
      return prev + current * b[index];
    }, 0);
    return 'Я прошёл ' + distancePath + ' метров';
  }

  if (Array.isArray(a)) {

    var numberOfSteps = a.reduce(function(sum, current) {
      return sum + current;
    }, 0);

    return 'Я прошёл ' + numberOfSteps + ' шагов';
  } else {
    return 'Переданы некорректные данные';
  }
}

getMessage();
