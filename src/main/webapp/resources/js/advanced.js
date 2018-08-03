
//-----------------------------------------------Замыкания, функции изнутри----------------------------------------------
//  Пример
//  Посмотрим пример, чтобы лучше понимать, как это работает:
function sayHi(name) {
    var phrase = "Привет, " + name;
    alert( phrase );
}
sayHi('Вася');

//  При вызове функции:
//  До выполнения первой строчки её кода, на стадии инициализации,
// интерпретатор создает пустой объект LexicalEnvironment и заполняет его.
//  В данном случае туда попадает аргумент name и единственная переменная phrase:
function sayHi(name) {
    // LexicalEnvironment = { name: 'Вася', phrase: undefined }
    var phrase = "Привет, " + name;
    alert( phrase );
}
sayHi('Вася');

//  Функция выполняется.
//
//  Во время выполнения происходит присвоение локальной переменной phrase,
// то есть, другими словами, присвоение свойству LexicalEnvironment.phrase нового значения:
function sayHi(name) {
    // LexicalEnvironment = { name: 'Вася', phrase: undefined }
    var phrase = "Привет, " + name;

    // LexicalEnvironment = { name: 'Вася', phrase: 'Привет, Вася'}
    alert( phrase );
}
sayHi('Вася');

//  В конце выполнения функции объект с переменными обычно выбрасывается и память очищается.
// В примерах выше так и происходит.
// Через некоторое время мы рассмотрим более сложные ситуации,
// при которых объект с переменными сохраняется и после завершения функции.




//Пример с веншними переменными
var userName = "Вася";
alert("window userName = "+userName); // "Вася"

var b = true;
while (b){
    b = false;
    var userName="Петя"; //перезаписывает внешнюю переменную
    alert("while userName = "+userName); // "Петя"
}

function sayHi() {
    var userName = "Коля"; //не перезаписывает внешнюю переменную, сохраняет в свой LexicalEnvironment
    alert("function userName = "+userName);
}
sayHi(); // "Коля"

alert("В итоге: "+userName);//Петя!!!


//Пример с веншними переменными 2
var value = "Внешняя переменная!";
function f() {
    if (1) {
        value = true;
    } else {
        var value = false;//хоть и недостижимо, но внутренняя переменная создалась
    }
    alert( value );
}
f();//true - выводим имено внутреннюю переменную
alert(value);//"Внешняя переменная!"


//пример со счётчиком (возвращаем вложенную функцию counter(), которая берет счетчик из замыкания):
function makeCounter() {
    var currentCount = 1;
    return function counter() {
        return currentCount++;
    };
}
var counter = makeCounter();
console.log("----counter----");
console.log(counter()); // 1
console.log(counter()); // 2
console.log("----counter2----");
var counter2 = makeCounter();
console.log(counter2()); // 1
console.log(counter2()); // 2
console.log(counter2()); // 3
console.log(counter2()); // 4
console.log("----counter----");
console.log(counter()); // 3



//Чтобы добавить счётчику возможностей – перейдём с функции на полноценный объект:
function makeCounter() {
    var currentCount = 1;

    return { // возвратим объект вместо функции
        getNext: function() {
            return currentCount++;
        },

        set: function(value) {
            currentCount = value;
        },

        reset: function() {
            currentCount = 1;
        }
    };
}
var counter = makeCounter();
console.log("----counter.getNext()----");
console.log(counter.getNext()); // 1
console.log(counter.getNext()); // 2
console.log("----counter.set(5)----");
counter.set(5);
console.log("----counter.getNext()----");
console.log(counter.getNext()); // 5
console.log(counter.getNext()); // 6
console.log("----counter.reset()----");
counter.reset();
console.log("----counter.getNext()----");
console.log(counter.getNext()); // 1
console.log(counter.getNext()); // 2



//Объект счётчика + функция
function makeCounter() {
    var currentCount = 1;
    // возвращаемся к функции
    function counter() {
        return currentCount++;
    }
    // ...и добавляем ей методы!
    counter.set = function(value) {
        currentCount = value;
    };
    counter.reset = function() {
        currentCount = 1;
    };
    return counter;
}
var counter = makeCounter();
console.log("----counter.getNext()----");
console.log(counter()); // 1
console.log(counter()); // 2
console.log("----counter.set(5)----");
counter.set(5);
console.log("----counter.getNext()----");
console.log(counter()); // 5
console.log(counter()); // 6
console.log("----counter.reset()----");
counter.reset();
console.log("----counter.getNext()----");
console.log(counter()); // 1
console.log(counter()); // 2



//реализовать строковый буфер на функциях в JavaScript
function makeBuffer() {
    var buffer = '';
    function getBuffer(string) {
        if(!string){
            return buffer;
        }
        buffer+=string;
    }
    getBuffer.clear = function () {
        buffer = '';
    };
    return getBuffer;
}
var buffer = makeBuffer();
// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');
// получить текущее значение
alert( buffer() ); // Замыкания Использовать Нужно!
buffer.clear();
alert( buffer() ); // ''


//функция, созданная new Function, игнорирует внешнюю переменную a и выводит глобальную вместо неё:
var a = 1;
function getFunc() {
    var a = 2;
    var func = new Function('', 'alert(a)');
    return func;
}
getFunc()(); // 1, из window


//-----------------Очень веселый пример замыкания! -----------
//Сумма через замыкание
function sum(a) {
    return function(b) {
        return a+b;
    };
}
console.log(sum(5)(7)); // 12
console.log(sum(3)(7)); // 10
console.log(sum(8)(-4)); // 4


//-------Свойства функции(статичные переменные)----------------

//перепишем пример со счётчиком (возвращаем вложенную функцию counter(),
// у которой задан счетчик в качестве статической переменной):
function makeCounter() {
    function counter() {
        return counter.currentCount++;
    };
    counter.currentCount = 1;
    return counter;
}
var counter = makeCounter();
console.log("----counter----");
console.log(counter()); // 1
console.log(counter()); // 2
console.log("----counter2----");
var counter2 = makeCounter();
console.log(counter2()); // 1
console.log(counter2()); // 2
console.log(counter2()); // 3
console.log(counter2()); // 4
console.log("----counter----");
console.log(counter()); // 3
console.log("----counter - меняем счетчик из вне----");
counter.currentCount = 10;
console.log(counter()); // 10
console.log(counter()); // 11
console.log(counter()); // 12






//-----------------------------------------------Приём проектирования «Модуль»-----------------------------------------------

//схема устройства библиотеки lodash
;(function() {
    // lodash - основная функция для библиотеки
    function lodash(value) {
        // ...
    }

    // код функции size, пока что доступен только внутри
    function size(collection) {
        return Object.keys(collection).length;
    }

    // присвоим в lodash size и другие функции, которые нужно вынести из модуля
    lodash.size = size;
    // lodash.defaults = ...
    // lodash.cloneDeep = ...

    // "экспортировать" lodash наружу из модуля
    window._ = lodash; // в оригинальном коде здесь сложнее, но смысл тот же
})();
alert(_.size(["Яблоко", "Апельсин", "Груша"]));


//вариант модуля - через return
var _ = (function() {
    // lodash - основная функция для библиотеки
    function lodash(value) {
        // ...
    }

    // код функции size, пока что доступен только внутри
    function size(collection) {
        return Object.keys(collection).length;
    }

    // присвоим в lodash size и другие функции, которые нужно вынести из модуля
    lodash.size = size;
    // lodash.defaults = ...
    // lodash.cloneDeep = ...

    return lodash;
})();
alert(_.size(["Яблоко", "Апельсин", "Груша"]));






//-----------------------------------------------Методы объектов, this-----------------------------------------------
//Свойства-функции называют «методами» объектов.
// Их можно добавлять и удалять в любой момент, в том числе и явным присваиванием:
var user = {
    name: 'Василий'
};
user.sayHi = function () { // присвоили метод после создания объекта
    alert('Привет!');
};
// Вызов метода:
user.sayHi();


//Доступ к объекту через this
var user = {
    name: 'Василий',

    sayHi: function () {
        alert(this.name);
    }
};
user.sayHi(); // sayHi в контексте user


//this в ф-ии которая изначально не была методом объекта
//Если одну и ту же функцию запускать в контексте разных объектов, она будет получать разный this:
var user = { firstName: "Вася" };
var admin = { firstName: "Админ" };

function func() {
    alert( this.firstName );
}
user.f = func;
admin.g = func;
// this равен объекту перед точкой:
user.f(); // Вася
admin.g(); // Админ
admin['g'](); // Админ (не важно, доступ к объекту через точку или квадратные скобки)


//---------------Очень веселый пример this! -----------
var arr = ["a", "b"];
arr.push(function() {
    alert( this );
});
arr[2](); // a,b,function() {alert( this );} - то есть вывелся весь массив


//Случаи, когда метод оказался просто функцией
"use strict";//в старом режиме строчки (3) и (4) будут брать в this - window
var obj, method;
obj = {
    go: function () {
        alert(this);
    }
};
obj.go();               // (1) object
(obj.go)();             // (2) object

(method = obj.go)();    // (3) undefined -
// здесь мы сначала сохраняем функцию в переменную method,
// затем вызываем уже method(), а он не является частью объекта, поэтому this = undefined

(obj.go || obj.stop)(); // (4) undefined -
// операция получения свойства obj.go возвращает значение особого типа Reference Type,
// оператор || делает из Reference Type обычную функцию.



//--------toString--------
//Если в объекте присутствует метод toString,
// который возвращает примитив, то он используется для преобразования.
var user = {
    firstName: 'Василий',
    toString: function () {
        return 'Пользователь ' + this.firstName;
    }
};

alert(user);  // Пользователь Василий