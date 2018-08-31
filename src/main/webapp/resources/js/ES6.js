//------------------------------------------------ES-2015 (ES6)---------------------------------------------------------------



//-------------let---------------

//Здесь, фактически, две независимые переменные apples, одна – глобальная, вторая – в блоке if
let apples = 5; // (*)
if (true) {
    let apples = 10;
    alert(apples); // 10 (внутри блока)
}
alert(apples); // 5 (снаружи блока значение не изменилось)


//Это потому что переменная let всегда видна именно в том блоке, где объявлена
if (true) {
    let apples = 10;
    alert(apples); // 10 (внутри блока)
}
alert(apples); // ошибка!


//До объявления let вообще нет.
alert(a); // ошибка, нет такой переменной
let a = 5;


//let нельзя повторно объявлять внутри одного блока
let x;
let x; // ошибка: переменная x уже объявлена


//Каждому повторению цикла соответствует своя независимая переменная let.
// Если внутри цикла есть вложенные объявления функций,
// то в замыкании каждой будет та переменная, которая была при соответствующей итерации.
//Это позволяет легко решить классическую проблему с замыканиями, описанную в задаче Армия функций:
function makeArmy() {
    let shooters = [];
    for (let i = 0; i < 10; i++) {
        shooters.push(function() {
            alert( i ); // выводит свой номер
        });
    }
    return shooters;
}
var army = makeArmy();
army[0](); // 0
army[5](); // 5
//если было бы ...for (var i = 0;...
//то:
//army[0](); // 10
//army[5](); // 10




//-------------const-----------

//Объявление const задаёт константу,
// то есть переменную, которую нельзя менять:
const apple = 5;
apple = 10; // ошибка

//если в константу присвоен объект,
// то от изменения защищена сама константа, но не свойства внутри неё
const user = {
    name: "Вася"
};
user.name = "Петя"; // допустимо
user = 5; // нельзя, будет ошибка

//В остальном объявление const полностью аналогично let.










//----------------Деструктуризация (destructuring assignment)---------------
// это особый синтаксис присваивания, при котором можно присвоить массив или объект сразу нескольким переменным, разбив его на части.



//------------Деструктуризация массива---------
'use strict';
let [firstName, lastName] = ["Илья", "Кантор"];
alert(firstName); // Илья
alert(lastName);  // Кантор


'use strict';
// первый и второй элементы не нужны
let [, , title] = "Юлий Цезарь Император Рима".split(" ");
alert(title); // Император


//параметр, который получит «всё остальное», при помощи оператора "..." («spread»)
'use strict';
let [firstName, lastName, ...rest] = "Юлий Цезарь Император Рима".split(" ");
alert(firstName); // Юлий
alert(lastName);  // Цезарь
alert(rest);      // Император,Рима (массив из 2х элементов)


//Значения по умолчанию:
'use strict';
let [firstName="Гость", lastName="Анонимный"] = [];
alert(firstName); // Гость
alert(lastName);  // Анонимный


//------------Деструктуризация объекта---------
'use strict';
let options = {
    title: "Меню",
    width: 100,
    height: 200
};
let {title, width, height} = options;
alert(title);  // Меню
alert(width);  // 100
alert(height); // 200

//Если хочется присвоить свойство объекта в переменную с другим именем,
// например, чтобы свойство options.width пошло в переменную w,
// то можно указать соответствие через двоеточие, вот так:
'use strict';
let options = {
    title: "Меню",
    width: 100,
    height: 200
};
let {width: w, height: h, title} = options;
alert(title);  // Меню
alert(w);      // 100
alert(h);      // 200


//Можно и сочетать одновременно двоеточие и равенство:
'use strict';
let options = {
    title: "Меню"
};
let {width:w=100, height:h=200, title} = options;
alert(title);  // Меню
alert(w);      // 100
alert(h);      // 200


//Деструктуризация без объявления
//Чтобы избежать интерпретации {a, b} как блока, нужно обернуть всё присваивание в скобки:
let a, b;
({a, b} = {a:5, b:6}); // внутри выражения это уже не блок
alert(a);
alert(b);


//Вложенные деструктуризации
'use strict';
let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Пончик", "Пирожное"]
}
let { title="Меню", size: {width, height}, items: [item1, item2] } = options;
// Меню 100 200 Пончик Пирожное
alert(title);  // Меню
alert(width);  // 100
alert(height); // 200
alert(item1);  // Пончик
alert(item2);  // Пирожное









//------------------------------------------------------Функции------------------------------------------------------
//В функциях основные изменения касаются передачи параметров,
// плюс введена дополнительная короткая запись через стрелочку =>.

//------Параметры по умолчанию----------
function showMenu(title = "Без заголовка", width = 100, height = 200) {
    alert(title + ' ' + width + ' ' + height);
}
showMenu("Меню"); // Меню 100 200


//Параметр по умолчанию используется при отсутствующем аргументе или равном undefined,
// например:
function showMenu(title = "Заголовок", width = 100, height = 200) {
    alert('title=' + title + ' width=' + width + ' height=' + height);
}
// По умолчанию будут взяты 1 и 3 параметры
// title=Заголовок width=null height=200
showMenu(undefined, null);


//------Оператор spread вместо arguments------
//Чтобы получить массив аргументов, можно использовать оператор …, например:
function showName(firstName, lastName, ...rest) {
    alert(firstName + ' ' + lastName + ' - ' + rest);
}
// выведет: Юлий Цезарь - Император,Рима
showName("Юлий", "Цезарь", "Император", "Рима");



//------Деструктуризация в параметрах------
function showMenu({title="Заголовок", width:w=100, height:h=200}={}) {//={} - это позволит заполнить деФолтными значениями, если вообще ничего не передадут
    alert(title + ' ' + w + ' ' + h);
}
// объект options будет разбит на переменные
showMenu({title: "Меню"}); // Меню 100 200


//------Функции в блоке-------
//Объявление функции Function Declaration, сделанное в блоке, видно только в этом блоке.
//Например:
'use strict';
if (true) {
    sayHi(); // работает
    function sayHi() {
        alert("Привет!");
    }
}
sayHi(); // ошибка, функции не существует



//------Функции через => ------
//Эти две записи – примерно аналогичны:
let inc = x => x+1;
let inc = function(x) { return x + 1; };



//------- => не имеют своего this--------
//Внутри функций-стрелок – тот же this, что и снаружи.
//Это очень удобно в обработчиках событий и коллбэках, например:
let group = {
    title: "Наш курс",
    students: ["Вася", "Петя", "Даша"],
    showList: function() {
        this.students.forEach(
            student => alert(this.title + ': ' + student)
        )
    }
}
group.showList();
// Наш курс: Вася
// Наш курс: Петя
// Наш курс: Даша



//--------- => не имеют своего arguments----------
//Сохранение внешнего this и arguments удобно использовать для форвардинга вызовов и создания декораторов.
//Например, декоратор defer(f, ms) ниже получает функцию f и возвращает обёртку вокруг неё,
// откладывающую вызов на ms миллисекунд:
function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms);
    }
}
function sayHi(who) {
    alert('Привет, ' + who);
}
let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("Вася"); // Привет, Вася через 2 секунды









//------------------------------------------------------Строки------------------------------------------------------
//Можно вставлять выражения при помощи ${…}
'use strict';
let apples = 2;
let oranges = 3;
alert(`${apples} + ${oranges} = ${apples + oranges}`); // 2 + 3 = 5


//Можно использовать свою функцию шаблонизации для строк.
'use strict';
function f(strings, ...values) {
    alert(JSON.stringify(strings));     // ["Sum of "," + "," =\n ","!"]
    alert(JSON.stringify(strings.raw)); // ["Sum of "," + "," =\\n ","!"]
    alert(JSON.stringify(values));      // [3,5,8]
}
let apples = 3;
let oranges = 5;
//          | s[0]  | v[0] |s[1]| v[1]  |s[2]  |      v[2]      |s[3]
let str = f`Sum of ${apples} + ${oranges} =\n ${apples + oranges}!`;


//Юникод – улучшена работа с суррогатными парами.
//Например:
alert( '我'.length ); // 1
alert( '𩷶'.length ); // 2

//\u{длинный код}
alert( "\u{20331}" ); // 𠌱, китайский иероглиф с этим кодом









//------------------------------------------------------Объекты и прототипы------------------------------------------------------


//---Короткое свойство---
'use strict';
let name = "Вася";
let isAdmin = true;
let user = {
    name,
    isAdmin
};
name = "dfgdfgs";
alert( JSON.stringify(user) ); // {"name": "Вася", "isAdmin": true}
alert( user.name ); // "Вася"
alert( name ); // "dfgdfgs"


//---Вычисляемые свойства---
//В качестве имени свойства можно использовать выражение, например:
'use strict';
let a = "Мой ";
let b = "Зелёный ";
let c = "Крокодил";
let user = {
    [(a + b + c).toLowerCase()]: "Гена"
};
alert( user["мой зелёный крокодил"] ); // Гена


//---Геттер-сеттер для прототипа---
var animal = {
    eats: true,
    toString: () => "animal"
};
function Rabbit(name) {
    this.name = name;
}
var rabbit = new Rabbit("Кроль");
Object.setPrototypeOf(rabbit, animal);
alert( rabbit.eats ); // true, из прототипа
alert( Object.getPrototypeOf(rabbit) ); // animal


//---Object.assign---
//Функция Object.assign получает список объектов и копирует в первый target свойства из остальных.
'use strict';
let user = { name: "Вася" };
let visitor = { isAdmin: false, visits: true };
let admin = { isAdmin: true };
Object.assign(user, visitor, admin);
// user <- visitor <- admin
alert( JSON.stringify(user) ); // name: Вася, visits: true, isAdmin: true


//---Object.is(value1, value2)---
//Новая функция для проверки равенства значений.
//Она похожа на обычное строгое равенство ===, но есть отличия:

// Сравнение +0 и -0
alert(Object.is(+0, -0)); // false
alert(+0 === -0);        // true

// Сравнение с NaN
alert(Object.is(NaN, NaN)); // true
alert(NaN === NaN);         // false


//---Методы объекта---
//Долгое время в JavaScript термин «метод объекта» был просто альтернативным названием для свойства-функции.
//Теперь это уже не так. Добавлены именно «методы объекта», которые, по сути, являются свойствами-функциями, привязанными к объекту.
//
//Их особенности:
//Более короткий синтаксис объявления.
//Наличие в методах специального внутреннего свойства [[HomeObject]] («домашний объект»),
// ссылающегося на объект, которому метод принадлежит.
'use strict';
let name = "Вася";
let user = {
    name,
    // вместо "sayHi: function() {...}" пишем "sayHi() {...}"
    sayHi() {
        alert(this.name);
    }
};
user.sayHi(); // Вася

//Также методами станут объявления геттеров get prop() и сеттеров set prop():
'use strict';
let name = "Вася", surname="Петров";
let user = {
    name,
    surname,
    get fullName() {
        return `${name} ${surname}`;
    }
};
alert( user.fullName ); // Вася Петров

//Можно задать и метод с вычисляемым названием:
'use strict';
let methodName = "getFirstName";
let user = {
    // в квадратных скобках может быть любое выражение,
    // которое должно вернуть название метода
    [methodName]() {  // вместо [methodName]: function() {
        return "Вася";
    }
};
alert( user.getFirstName() ); // Вася


//---super---
//Оно предназначено только для использования в методах объекта.
//Вызов super.parentProperty позволяет из метода объекта получить свойство его прототипа.
'use strict';
let animal = {
    walk() {
        alert("I'm walking");
    }
};
let rabbit = {
    __proto__: animal,
    walk() {
        alert(super.walk); // walk() { … }
        super.walk(); // I'm walking
    }
};
rabbit.walk();









//------------------------------------------------------Классы------------------------------------------------------
//Новая конструкция class – удобный «синтаксический сахар» для задания конструктора вместе с прототипом.
//!!! нет возможности задать в прототипе обычное значение (не функцию), такое как User.prototype.key = "value".
//Пример:
'use strict';
class User {
    //Функция constructor запускается при создании new User,
    // остальные методы записываются в User.prototype.
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        alert(this.name);
    }
}
let user = new User("Вася");
user.sayHi(); // Вася

//Это объявление примерно аналогично такому:
function User(name) {
    this.name = name;
}
User.prototype.sayHi = function () {
    alert(this.name);
};


//---Class Expression---
'use strict';
let User = class {
    sayHi() { alert('Привет!'); }
};
new User().sayHi();

//Но имя можно дать. Тогда оно, как и в Named Function Expression,
// будет доступно только внутри класса:
'use strict';
let SiteGuest = class User {
    sayHi() { alert('Привет!'); }
};
new SiteGuest().sayHi(); // Привет
new User(); // ошибка


//---Геттеры, сеттеры и вычисляемые свойства---
//В классах, как и в обычных объектах, можно объявлять геттеры и сеттеры через get/set,
// а также использовать […] для свойств с вычисляемыми именами:
'use strict';
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // геттер
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    // сеттер
    set fullName(newValue) {
        [this.firstName, this.lastName] = newValue.split(' ');
    }
    // вычисляемое название метода
    ["test".toUpperCase()]() {
        alert("PASSED!");
    }
}
let user = new User("Вася", "Пупков");
alert( user.fullName ); // Вася Пупков
user.fullName = "Иван Петров";
alert( user.fullName ); // Иван Петров
user.TEST(); // PASSED!


//---Статические свойства---
//Класс, как и функция, является объектом.
//Статические свойства класса User – это свойства непосредственно User,
// то есть доступные из него «через точку».
'use strict';
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    static createGuest() {
        return new User("Гость", "Сайта");
    }
    toString() {
        return `USER: ${this.firstName} ${this.lastName}`;
    }
}
let user = User.createGuest();
alert( user.firstName ); // Гость
alert( User.createGuest ); // createGuest ... (функция)
alert( User.createGuest() ); // USER: Гость Сайта


//---Наследование---
'use strict';
class Animal {
    get self(){
        return "Animal";
    }
    constructor(name) {
        this.name = name;
    }
    walk() {
        alert("I walk: " + this.name);
    }
    toString(){return `Object:${this.self}`}
}
class Rabbit extends Animal {
    //переопределяем это поле, чтобы в toString подставить название наследника
    get self(){
        return "Rabbit";
    }
    walk() {
        super.walk();
        alert("...and jump!");
    }
}
let r = new Rabbit("Вася");
// r.walk();// I walk: Вася, ...and jump!
alert(r.__proto__);//Object:Rabbit
alert(r.__proto__.__proto__);//Object:Animal
//в prototype лежат те же __proto__
alert("Rabbit.prototype = " + Rabbit.prototype);//Rabbit.prototype = Object:Rabbit
alert("Animal.prototype = " + Animal.prototype);//Animal.prototype = Object:Animal


//Вызываем конструктор родителя
'use strict';
class Animal {
    constructor(name) {
        this.name = name;
    }
    walk() {
        alert("I walk: " + this.name);
    }
}
class Rabbit extends Animal {
    constructor() {
        // вызвать конструктор Animal с аргументом "Кроль"
        super("Кроль"); // то же, что и Animal.call(this, "Кроль")
    }
    //Для такого вызова есть небольшие ограничения:
    //Вызвать конструктор родителя можно только изнутри конструктора потомка.
    // В частности, super() нельзя вызвать из произвольного метода.
    //В конструкторе потомка мы обязаны вызвать super() до обращения к this.
    // До вызова super не существует this, так как по спецификации в этом случае именно super инициализирует this.
    //
}
new Rabbit().walk(); // I walk: Кроль









//---------------------------------------------------Тип данных Symbol----------------------------------------------------

//Основная область использования символов – это системные свойства объектов,
// которые задают разные аспекты их поведения. Поддержка у них пока небольшая, но она растёт.
// Системные символы позволяют разработчикам стандарта добавлять новые «особые» свойства объектов,
// при этом не резервируя соответствующие строковые значения.
//
//Системные символы доступны как свойства функции Symbol, например Symbol.iterator.
//
//Мы можем создавать и свои символы, использовать их в объектах.
// Записывать их как свойства Symbol, разумеется, нельзя.
// Если нужен глобально доступный символ, то используется Symbol.for(имя)

'use strict';
let sym = Symbol();
alert( typeof sym ); // symbol
alert( sym.toString() ); // Symbol()
sym = Symbol("Новый символ");
alert( sym.toString() ); // Symbol(Новый символ)
alert( Symbol("name") == Symbol("name") ); // false


//---Глобальные символы---
//Для чтения (или создания, при отсутствии) «глобального» символа служит вызов Symbol.for(имя).
'use strict';
// создание символа в реестре
let name = Symbol.for("name");
// символ уже есть, чтение из реестра
alert( Symbol.for("name") == name ); // true

// получение имени символа
alert( Symbol.keyFor(name) ); // name
//Заметим, что Symbol.keyFor работает только для глобальных символов,
// для остальных будет возвращено undefined:
alert( Symbol.keyFor(Symbol.for("name")) ); // name, глобальный
alert( Symbol.keyFor(Symbol("name2")) ); // undefined, обычный символ

//---Использование символов---
//Символы можно использовать в качестве имён для свойств объекта следующим образом:
'use strict';
let user = {
    name: "Вася",
    age: 30,
    [Symbol.for("isAdmin")]: true
};
// в цикле for..in также не будет символа
alert( Object.keys(user) ); // name, age
// доступ к свойству через имя символа — не работает
alert( user["isAdmin"] );
// доступ к свойству через глобальный символ — работает
alert( user[Symbol.for("isAdmin")] );


//Object.getOwnPropertySymbols
let obj = {
    iterator: 1,
    [Symbol.iterator]: function() {}
};
// один символ в объекте
alert( Object.getOwnPropertySymbols(obj)[0].toString() ); // Symbol(Symbol.iterator)
// и одно обычное свойство
alert( Object.getOwnPropertyNames(obj) ); // iterator









//---------------------------------------------------Итераторы----------------------------------------------------
//Итерируемым является массив (новый цикл for of):
'use strict';
let arr = [1, 2, 3]; // массив — пример итерируемого объекта
for (let value of arr) {
    alert(value); // 1, затем 2, затем 3
}

//Также итерируемой является строка:
'use strict';
for (let char of "Привет") {
    alert(char); // Выведет по одной букве: П, р, и, в, е, т
}


//---Свой итератор---
//У итератора должен быть метод next(),
// который при каждом вызове возвращает объект со свойствами:
//value – очередное значение,
//done – равно false если есть ещё значения, и true – в конце.
'use strict';
let range = {
    from: 1,
    to: 5
};
// сделаем объект range итерируемым
range[Symbol.iterator] = function() {
    let current = this.from;
    let last = this.to;
    // метод должен вернуть объект с методом next()
    return {
        next() {
            if (current <= last) {
                return {
                    done: false,
                    value: current++
                };
            } else {
                return {
                    done: true
                };
            }
        }
    }
};
for (let num of range) {
    alert(num); // 1, затем 2, 3, 4, 5
}


//Получаем итератор для строки и вызывает его полностью «вручную»:
'use strict';
let str = "Hello";
// Делает то же, что и
// for (var letter of str) alert(letter);
let iterator = str[Symbol.iterator]();
while(true) {
    let result = iterator.next();
    if (result.done) break;
    alert(result.value); // Выведет все буквы по очереди
}









//---------------------------------------------------Set, Map, WeakSet и WeakMap----------------------------------------------------

//---------Map--------

'use strict';
let map = new Map();
map.set('1', 'str1');   // ключ-строка
map.set(1, 'num1');     // число
map.set(true, 'bool1'); // булевое значение
// в обычном объекте это было бы одно и то же,
// map сохраняет тип ключа
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'
alert( map.size ); // 3

//Метод set можно чейнить:
map.set('1', 'str1')
   .set(1, 'num1')
   .set(true, 'bool1');

//При создании Map можно сразу инициализировать списком значений.
//Объект map с тремя ключами, как и в примере выше:
let map = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);
//Аргументом new Map должен быть итерируемый объект
// (не обязательно именно массив)


//В качестве ключей map можно использовать и объекты:
'use strict';
let user = { name: "Вася" };
// для каждого пользователя будем хранить количество посещений
let visitsCountMap = new Map();
// объект user является ключом в visitsCountMap
visitsCountMap.set(user, 123);
alert( visitsCountMap.get(user) ); // 123


//Пишу свои compareTo и equals, но они не исп-ся в map
'use strict';
let visitsCountMap = new Map();
class User{
    constructor(name){
        this.name = name;
    }
    compareTo(user){
        if(this.name == user.name)
            return 0;
        else if(this.name > user.name)
            return 1;
        else
            return -1;
    }
    equals(user){
        return this.name === user.name;
    }
    toString(){
        return this.name;
    }
}
let u1 = new User("u1");
let u2 = new User("u1");
visitsCountMap
    .set(u1, 1)
    .set(u2, 2);
//Хоть объекты и одинаковые с т.з. equals и compareTo, но разные для map
//Поэтому запишутся оба:
alert(visitsCountMap.get(u1)); // 1
alert(visitsCountMap.get(u2)); // 2
alert(Object.is(u1, u2));
alert(u1.compareTo(u2));
alert(u1.equals(u2));


//итерация
let recipeMap = new Map([
    ['огурцов',   '500 гр'],
    ['помидоров', '350 гр'],
    ['сметаны',   '50 гр']
]);
// цикл по ключам
for(let fruit of recipeMap.keys()) {
    alert(fruit); // огурцов, помидоров, сметаны
}
// цикл по значениям
for(let amount of recipeMap.values()) {
    alert(amount); // 500 гр, 350 гр, 50 гр
}
// цикл по записям [ключ,значение]
for(let entry of recipeMap) { // то же что и recipeMap.entries()
    alert(entry); // огурцов,500 гр , и т.д., массивы по 2 значения
}
//forEach
recipeMap.forEach( (value, key, map) => {
    alert(`${key}: ${value}`); // огурцов: 500 гр, и т.д.
});

//Методы для удаления записей:
//map.delete(key) удаляет запись с ключом key, возвращает true, если такая запись была, иначе false.
//map.clear() – удаляет все записи, очищает map.

//Для проверки существования ключа:
//map.has(key) – возвращает true, если ключ есть, иначе false.


//--------Set---------

//Set – коллекция для хранения множества значений,
// причём каждое значение может встречаться лишь один раз.
'use strict';
let set = new Set();
let vasya = {name: "Вася"};
let petya = {name: "Петя"};
let dasha = {name: "Даша"};
// посещения, некоторые пользователи заходят много раз
set.add(vasya);
set.add(petya);
set.add(dasha);
set.add(vasya);
set.add(petya);
// set сохраняет только уникальные значения
alert( set.size ); // 3
set.forEach( user => alert(user.name ) ); // Вася, Петя, Даша


//----------WeakSet/WeakMap----------

//если некий объект присутствует только в WeakSet/WeakMap – он удаляется из памяти.
//Это нужно для тех ситуаций, когда основное место для хранения и
// использования объектов находится где-то в другом месте кода,
// а здесь мы хотим хранить для них «вспомогательные» данные, существующие лишь пока жив объект.

//Например, у нас есть элементы на странице или, к примеру, пользователи,
// и мы хотим хранить для них вспомогательную информацию, например обработчики событий или просто данные,
// но действительные лишь пока объект, к которому они относятся, существует.
//Например:

// текущие активные пользователи
let activeUsers = [
    {name: "Вася"},
    {name: "Петя"},
    {name: "Маша"}
];
// вспомогательная информация о них,
// которая напрямую не входит в объект юзера,
// и потому хранится отдельно
let weakMap = new WeakMap();
weakMap.set(activeUsers[0], 1);
weakMap.set(activeUsers[1], 2);
weakMap.set(activeUsers[2], 3);
weakMap.set('Katya', 4); //Будет ошибка TypeError: "Katya" is not a non-null object
alert( weakMap.get(activeUsers[0]) ); // 1
activeUsers.splice(0, 1); // Вася более не активный пользователь
// weakMap теперь содержит только 2 элемента
activeUsers.splice(0, 1); // Петя более не активный пользователь
// weakMap теперь содержит только 1 элемент

//WeakMap работает только на запись (set, delete) и чтение (get, has) элементов по конкретному ключу,
// а не как полноценная коллекция.
// Нельзя вывести всё содержимое WeakMap, нет соответствующих методов.

//То же самое относится и к WeakSet









//---------------------------------------------------Promise----------------------------------------------------

//Пример с setTimeout
//Возьмём setTimeout в качестве асинхронной операции,
// которая должна через некоторое время успешно завершиться с результатом «result»:
'use strict';
// Создаётся объект promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // переведёт промис в состояние fulfilled с результатом "result"
        resolve("result");
    }, 1000);
});

// promise.then навешивает обработчики на успешный результат или ошибку
promise
    .then(
        result => {
            // первая функция-обработчик - запустится при вызове resolve
            alert("Fulfilled: " + result); // result - аргумент resolve
        },
        error => {
            // вторая функция - запустится при вызове reject
            alert("Rejected: " + error); // error - аргумент reject
        }
    );
alert("Ждемс...");


//Пример с setTimeout - завершение с ошибкой
// Этот promise завершится с ошибкой через 1 секунду
var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("время вышло!"));
    }, 1000);
});

promise
    .then(
        result => alert("Fulfilled: " + result),
        error => alert("Rejected: " + error.message) // Rejected: время вышло!
    );


//------Промисификация------

//Промисификация – это когда берут асинхронный функционал и делают для него обёртку, возвращающую промис.
function httpGet(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}
httpGet("https://learn.javascript.ru/article/promise/user.json")
    .then(
        response => alert(`Fulfilled: ${response}`),//здесь появился response потому что в httpGet он передавался через resolve(this.response)
        error => alert(`Rejected: ${error}`)
    );



//-----------Цепочки промисов-----------
//При чейнинге, то есть последовательных вызовах .then…then…then,
// в каждый следующий then переходит результат от предыдущего

'use strict';
// сделать запрос
httpGet('https://learn.javascript.ru/article/promise/user.json')
// 1. Получить данные о пользователе в JSON и передать дальше
    .then(response => {//здесь появился response потому что в httpGet он передавался через resolve(this.response)
        console.log(response);
        let user = JSON.parse(response);
        return user;
    })
    // 2. Получить информацию с github
    .then(user => {
        console.log(user);
        return httpGet(`https://api.github.com/users/${user.name}`);
    })
    // 3. Вывести аватар на 3 секунды (можно с анимацией)
    .then(githubUser => {
        console.log(githubUser);
        githubUser = JSON.parse(githubUser);

        let img = new Image();
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.appendChild(img);

        setTimeout(() => img.remove(), 3000); // (*)
    });



//---------Promise.all(iterable)--------
//Вызов Promise.all(iterable) получает массив (или другой итерируемый объект) промисов и возвращает промис,
// который ждёт, пока все переданные промисы завершатся,
// и переходит в состояние «выполнено» с массивом их результатов.
let urls = [
    'https://learn.javascript.ru/article/promise/user.json',
    'https://learn.javascript.ru/article/promise/guest.json'
];
//трансформируем массив [url1, url2] в
//[httpGet(url1), httpGet(url2)]
let httpGets = urls.map(httpGet);
alert(httpGets);
Promise.all( httpGets )
    .then(results => {
        alert(results);
    });

// если какой-то из промисов завершился с ошибкой, то результатом Promise.all будет эта ошибка.
// При этом остальные промисы игнорируются.
//Например:
Promise.all([
    httpGet('/article/promise/user.json'),
    httpGet('/article/promise/guest.json'),
    httpGet('/article/promise/no-such-page.json') // (нет такой страницы)
]).then(
    result => alert("не сработает"),
    error => alert("Ошибка: " + error.message) // Ошибка: Not Found
);


//------Promise.race(iterable)--------
//в отличие от Promise.all, результатом будет только первый успешно выполнившийся промис из списка.
// Остальные игнорируются.
Promise.race([
    httpGet('https://learn.javascript.ru/article/promise/user.json'),
    httpGet('https://learn.javascript.ru/article/promise/guest.json')
]).then(firstResult => {
    firstResult = JSON.parse(firstResult);
    alert( firstResult.name ); // iliakan или guest, смотря что загрузится раньше
}, err => {alert(err)});


//-------------Fetch---------------
//Это по сути тоже что и httpGet написанный выше, но с кучей возможностей и по стандрату
//Не во всех браузерах поддерживается, но для него есть полифиллы
'use strict';
//сохраняю в переменную просто для наглядности что это тоже промис
let promise = fetch('https://learn.javascript.ru/article/promise/user.json');
promise
    .then(function(response) {
        alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
        alert(response.status); // 200
        return response.json();
    })
    .then(function(user) {//user - это то что вернул первый then
        alert(JSON.stringify(user)); // {"name":"iliakan","isAdmin":true}
    })
    .catch( alert );
//В примере выше мы можем в первом .then проанализировать ответ и,
// если он нас устроит – вернуть промис с нужным форматом.
// Следующий .then уже будет содержать полный ответ сервера.
