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
  var numberOfSteps = a.reduce(function(sum, current) {
    return sum + current;
  }, 0);
  var distancePath = a.map(function(value, index) {
    return value + b[index];
  });

  if (Array.isArray(a)) {
    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return 'Я прошёл ' + distancePath + ' метров';
  } else {
    return 'Переданы некорректные данные';
  }
}
