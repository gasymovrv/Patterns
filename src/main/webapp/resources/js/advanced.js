
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


//--------valueOf--------
//Для численного преобразования объекта используется метод valueOf, а если его нет – то toString:
var room = {
    number: 777,
    valueOf: function () {
        return this.number;
    },
    toString: function () {
        return this.number;
    }
};
alert(+room);  // 777, вызвался valueOf
delete room.valueOf; // valueOf удалён
alert(+room);  // 777, вызвался toString




//---------------------------------------------Создание объектов через "new"--------------------------------------------

//--------------------функции-конструкторы--------------------

// Если нужно создать много однотипных объектов, то используют «функции-конструкторы»,
// запуская их при помощи специального оператора new (ведь в JS функция и есть объект).
// Любая функция может быть вызвана с new,
// при этом она получает новый пустой объект в качестве this, в который она добавляет свойства.
// Чтобы выделить функции, задуманные как конструкторы, их называют с большой буквы: Animal
function Animal(name) {
    this.name = name;
    this.canWalk = true;
    this.toString = function () {
        return "name: " +this.name+", canWalk: "+this.canWalk;
    };

    this.getThis = function () {
        return "this: {"+this+"}";//печатаем объект
    }
}
var animal = new Animal("ёжик");//по сути получается что функция становится методом самой себя
console.log(animal);//name: ёжик, canWalk: true
console.log(animal.getThis());//this: name: ёжик, canWalk: true

//сравнение с this внутри методов
//мы можем сделать эту функцию методом другого объекта и получится тоже самое,
//но создать сможем только один раз так:
var obj = {
    anim: Animal
};
obj.anim("черепаха");
console.log("---------");
console.log(obj);//name: черепаха, canWalk: true
console.log(obj.getThis());//this: name: черепаха, canWalk: true


//--------Если функция не возвращает свой объект, то её результатом будет this
// (вернуть примитив нельзя, все равно будет this):
function A() {
    this.toString = function () {
        return "A";
    }
}
var a = new A;
alert(a); // "A" - несмотря на то, что return в ф-ии А нет, печатается все равно this



//------------методы в конструкторе(выше уже применял для toString или getThis)

function User(name) {
    this.name = name;
    this.sayHi = function() {
        alert( "Моё имя: " + this.name );
    };
}
var ivan = new User("Иван");
ivan.sayHi(); // Моё имя: Иван


//------------Локальные переменные
//В функции-конструкторе бывает удобно объявить вспомогательные локальные переменные и
// вложенные функции, которые будут видны только внутри:

function User(firstName, lastName) {
    // вспомогательная переменная
    var phrase = "Привет";
    //  вспомогательная вложенная функция
    function getFullName() {
        return firstName + " " + lastName;
    }
    this.sayHi = function() {
        alert( phrase + ", " + getFullName() ); // использование
    };
}
var vasya = new User("Вася", "Петров");
vasya.sayHi(); // Привет, Вася Петров


//конструкторы возвращают один внешний объект
var obj = {};

function A() { return obj; }
function B() { return obj; }

var a = new A;
var b = new B;

alert( a === b ); // true



//Калькулятор
function Calculator() {
    this.read = function () {
        this.a = Number(prompt("Введите а",0));
        this.b =  Number(prompt("Введите b",0));
    };
    this.sum = function () {
        return this.a+this.b;
    };
    this.mul = function () {
        return this.a*this.b;
    }
}
var calculator = new Calculator();
calculator.read();
alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );

//Аккумулятор
function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function () {
        this.value += Number(prompt("Введите значение",0));
    };
}
var accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
alert( accumulator.value ); // выведет текущее значение


//Калькулятор с возможностью добавления новых методов вычисления
//(только 2 числа и операция между ними, разделенные пробелом):
function Calculator() {

    var methods = {
        "-": function(a, b) {
            return a - b;
        },
        "+": function(a, b) {
            return a + b;
        }
    };

    this.calculate = function(str) {
        var split = str.split(' ');
        var a = +split[0];
        var op = split[1];
        var b = +split[2];

        if (!methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        return methods[op](a, b);
    };

    this.addMethod = function(name, func) {
        methods[name] = func;
    };
}

var calc = new Calculator;
calc.addMethod("*", function(a, b) {return a * b;});
calc.addMethod("/", function(a, b) {return a / b;});
calc.addMethod("**", function(a, b) {return Math.pow(a, b);});

alert( calc.calculate("2 - 3")); // -1
alert( calc.calculate("2 + 3")); // 5
alert( calc.calculate("2 * 3")); // 6
alert( calc.calculate("2 ** 3")); // 8












//-----------------------------------------Дескрипторы, геттеры и сеттеры свойств------------------------------------------


//-------------------------Дескриптор - Object.defineProperty------------

//Object.defineProperty(obj, prop, descriptor)
//Аргументы:
//
//obj
//Объект, в котором объявляется свойство.
//prop
//Имя свойства, которое нужно объявить или модифицировать.
//descriptor
//Дескриптор – объект, который описывает поведение свойства.
//В нём могут быть следующие поля:
//
//value – значение свойства, по умолчанию undefined
//writable – значение свойства можно менять, если true. По умолчанию false.
//configurable – если true, то свойство можно удалять,
//  а также менять его в дальнейшем при помощи новых вызовов defineProperty. По умолчанию false.
//enumerable – если true, то свойство просматривается в цикле for..in и методе Object.keys(). По умолчанию false.
//get – функция, которая возвращает значение свойства. По умолчанию undefined.
//set – функция, которая записывает значение свойства. По умолчанию undefined.

//Примеры:


//Два таких вызова работают одинаково:
var user = {};
// 1. простое присваивание
user.name = "Вася";
// 2. указание значения через дескриптор
Object.defineProperty(user, "name", {value: "Вася", configurable: true, writable: true, enumerable: true});


//Для того, чтобы сделать свойство неизменяемым, изменим его флаги writable и configurable:
"use strict";
var user = {};
Object.defineProperty(user, "name", {
    value: "Вася",
    writable: false, // запретить присвоение "user.name="
    configurable: false // запретить удаление "delete user.name"
});
// Теперь попытаемся изменить это свойство.
// в strict mode присвоение "user.name=" вызовет ошибку
//без strict просто молча не присвоится
user.name = "Петя";
alert(user.name);//"Вася"

//Свойство, скрытое для for…in
var user = {
    name: "Вася",
    toString: function() { return this.name; }
};
// помечаем toString как не подлежащий перебору в for..in
Object.defineProperty(user, "toString", {enumerable: false});
for(var key in user) alert(key);  // name



//--------------геттеры и сеттеры--------------

//---геттеры и сеттеры через дескриптор
var user = {
    firstName: "Вася",
    surname: "Петров"
};
Object.defineProperty(user, "fullName", {

    get: function() {
        return this.firstName + ' ' + this.surname;
    },

    set: function(value) {
        var split = value.split(' ');
        this.firstName = split[0];
        this.surname = split[1];
    }
});
user.fullName = "Петя Иванов";
alert( user.firstName ); // Петя
alert( user.surname ); // Иванов


//---в литералах (внутри {...}):
var user = {
    firstName: "Вася",
    surname: "Петров",

    get fullName() {
        return this.firstName + ' ' + this.surname;
    },

    set fullName(value) {
        var split = value.split(' ');
        this.firstName = split[0];
        this.surname = split[1];
    }
};
alert( user.fullName ); // Вася Петров (из геттера)
user.fullName = "Петя Иванов";
alert( user.firstName ); // Петя  (поставил сеттер)
alert( user.surname ); // Иванов (поставил сеттер)


//---а вот вариант если объект создается через конструктор:
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    // age будет высчитывать возраст по birthday
    Object.defineProperty(this, "age", {
        get: function() {
            var today = new Date();
            var yearDelta = today.getFullYear() - this.birthday.getFullYear();

            if (today.getMonth() > this.birthday.getMonth() ||
                (today.getMonth() === this.birthday.getMonth() && today.getDate() >= this.birthday.getDate())) {
                return yearDelta;
            }

            return yearDelta - 1;
        }
    });
}
var pete = new User("Петя", new Date(1987, 6, 1));
alert( pete.birthday ); // и дата рождения доступна
alert( pete.age );      // и возраст


//--- пример геттеров/сеттеров с использованием Object.defineProperties - задаем несколько свойств сразу
function User(fullName) {
    this.fullName = fullName;

    Object.defineProperties(this, {
        firstName: {
            get: function() {
                return this.fullName.split(' ')[0];
            },
            set: function(newFirstName) {
                this.fullName = newFirstName + ' ' + this.lastName;
            }
        },
        lastName: {
            get: function() {
                return this.fullName.split(' ')[1];
            },
            set: function(newLastName) {
                this.fullName = this.firstName + ' ' + newLastName;
            }
        }
    });
}
var vasya = new User("Василий Попкин");

// чтение firstName/lastName
alert( vasya.firstName ); // Василий
alert( vasya.lastName ); // Попкин

// запись firstName/lastName
vasya.firstName = 'Аркадий';
vasya.lastName = 'Сидоров';

alert( vasya.fullName ); // Аркадий Сидоров












//-----------------------------------------Статические и фабричные методы------------------------------------------

//-------Статические свойства и методы-----
//Обратим внимание на использование this в примере ниже.
// Несмотря на то, что переменная и метод – статические, он всё ещё полезен.
// В строке (1) он равен Article.
function Article() {
    Article.count++;
}
Article.count = 0; // статическое свойство-переменная
Article.DEFAULT_FORMAT = "html"; // статическое свойство-константа
Article.showCount = function() { //статический метод
    alert( this.count ); // (1)
}

// использование
new Article();
new Article();
Article.showCount(); // (2)
alert(Article.DEFAULT_FORMAT);//"html"


//-----------фабричные методы-----
function User() {
    this.sayHi = function() {
        alert(this.name)
    };
}
User.createAnonymous = function() {
    var user = new User;
    user.name = 'Аноним';
    return user;
};
User.createFromData = function(userData) {
    var user = new User;
    user.name = userData.name;
    user.age = userData.age;
    return user;
};

// Использование
var guest = User.createAnonymous();
guest.sayHi(); // Аноним

var knownUser = User.createFromData({
    name: 'Вася',
    age: 25
});
knownUser.sayHi(); // Вася












//-----------------------------------------Явное указание this: "call", "apply"------------------------------------------

//-----------------------call------------------

//call без аргументов
function showFullName() {
    alert( this.firstName + " " + this.lastName );
}
var user = {
    firstName: "Василий",
    lastName: "Петров"
};
// функция вызовется с this=user
showFullName.call(user) // "Василий Петров"


//call с аргументами
function showFullName(firstPart, lastPart) {
    alert( this[firstPart] + " " + this[lastPart] );
}
var user = {
    firstName: "Василий",
    surname: "Петров",
    patronym: "Иванович"
};
// f.call(контекст, аргумент1, аргумент2, ...)
showFullName.call(user, 'firstName', 'surname') // "Василий Петров"
showFullName.call(user, 'firstName', 'patronym') // "Василий Иванович"


//В JavaScript есть очень простой способ сделать из arguments настоящий массив. Для этого возьмём метод массива: slice.
//По стандарту вызов arr.slice(start, end) создаёт новый массив и копирует в него элементы массива arr от start до end.
// А если start и end не указаны, то копирует весь массив.
//Вызовем его в контексте arguments:
function printArgs() {
    // вызов arr.slice() скопирует все элементы из this в новый массив
    var args = [].slice.call(arguments);
    alert(args.join(', ')); // args - полноценный массив из аргументов
}
printArgs('Привет', 'мой', 'мир'); // Привет, мой, мир


//------2 варианта создать ф-ию суммирующую свои аргументы через call:

//вар 1
function sumArgs() {
    var args = [].slice.call(arguments);
    return args.reduce(function (a, b) {
        return a+b;
    })
}
alert( sumArgs(1, 2, 3) ); // 6

//вар 2
function sumArgs() {
    // запустим reduce из массива напрямую
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    });
}
alert( sumArgs(4, 5, 6) ); // 15



//-----------------------apply------------------
function showFullName(firstPart, lastPart) {
    alert( this[firstPart] + " " + this[lastPart] );
}
var user = {
    firstName: "Василий",
    surname: "Петров",
    patronym: "Иванович"
};
var arr = ['firstName', 'surname'];
showFullName.apply(user, arr);//тоже что и call, но аргументы массивом


//функцию applyAll(func, arg1, arg2...),
// которая получает функцию func и произвольное количество аргументов.
//
//Она должна вызвать func(arg1, arg2...),
// то есть передать в func все аргументы, начиная со второго, и возвратить результат.
function applyAll(func) {
    return func.apply(this, [].slice.call(arguments, 1));
}
function sum() {
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    });
}
function mul() {
    return [].reduce.call(arguments, function(a, b) {
        return a * b;
    });
}
alert( applyAll(sum, 1, 2, 3) ); // 6
alert( applyAll(mul, 2, 3, 4) ); // 24
alert( applyAll(Math.max, 2, -2, 3) ); // 3
alert( applyAll(Math.min, 2, -2, 3) ); // -2












//-----------------------------------------Привязка контекста и карринг: "bind"------------------------------------------


//Пример ПОТЕРЯННОГО КОНТЕКСТА:
//setTimeout получил функцию user.sayHi, но не её контекст
var user = {
    firstName: "Вася",
    sayHi: function() {
        alert( this.firstName );
    }
};
setTimeout(user.sayHi, 1000); // undefined (не Вася!)


//bind:
//синтаксис: var wrapper = func.bind(context[, arg1, arg2...])
//func - Произвольная функция
//context - Контекст, который привязывается к func
//arg1, arg2, … - Если указаны аргументы arg1, arg2...
// – они будут прибавлены к каждому вызову новой функции,
// причем встанут перед теми, которые указаны при вызове.

//Пример с bind 1:
var user = {
    firstName: "Вася",
    sayHi: function() {
        alert( this.firstName );
    }
};
setTimeout(user.sayHi.bind(user), 1000);

//Пример с bind 2 (с аргументами):
var user = {
    firstName: "Вася",
    sayHi: function(arg1,arg2) {
        alert( "arg1=" + arg1 +", arg2=" + arg2 + ", firstName=" + this.firstName );
    }
};
var f = user.sayHi.bind(user,"АРГ1");
f("АРГ2");//arg1=АРГ1, arg2=АРГ2, firstName=Вася


//-----Повторный bind
function f() {
    alert( this );
}
var user = {
    g: f.bind("Hello") //user уже не привяжется, f останется связана с "Hello"
}
user.g();//Hello


//ф-ия вопроса с исправлением потерянного контекста
"use strict";
function ask(question, answer, ok, fail) {
    var result = prompt(question, '');
    if (result.toLowerCase() == answer.toLowerCase()) ok();
    else fail();
}
var user = {
    login: 'Василий',
    password: '12345',
    loginOk: function() {
        alert( this.login + ' вошёл в сайт' );
    },
    loginFail: function() {
        alert( this.login + ': ошибка входа' );
    },
    checkPassword: function() {
        //ask.bind(this,"Ваш пароль?", this.password, this.loginOk, this.loginFail);//!!!!!!так было
        ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));//!!!!!!так стало
    }
};
var vasya = user;
user = null;
vasya.checkPassword();