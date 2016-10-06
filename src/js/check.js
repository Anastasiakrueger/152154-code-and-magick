function getMessage() {

    if (typeof a == 'boolean') {

        return 'Я попал в [b]';
    } else {
        return 'Я никуда не попал';
    }

    if (typeof(a) == 'number') {
        return 'Я прыгнул на [a] * 100 сантиметров'
    }

    var a = [1, 3, 4]
    var numberOfSteps = a.reduce(function(sum, current) {
        return sum + current;
    }, 0);

    if (Array.isArray(a)) {
        return 'Я прошёл [numberOfSteps] шагов'
    }

    // if(a instanceof Array) ??? это определяет массив?

    var a = [5, 4, 6]
    var b = [1.3 .6]
    var distancePath = a.map(function(value, index) {
        return value + b[index] })

    if (Array.isArray(a, b)) {
        return 'Я прошёл [distancePath] метров';
    }

    // тут нужно || или можно через запятую?
    // if ((Array.isArray(a)) || (Array.isArray(b)))
    else {
        return 'Переданы некорректные данные'
    }

}
