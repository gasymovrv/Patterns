// Конструктор родителя пишет свойства конкретного объекта
function Animal(name) {
    this.name = name;
    this.speed = 0;
}

// Методы хранятся в прототипе
Animal.prototype.run = function() {
    alert(this.name + " бежит!");
};

// --------- Класс-потомок 1-----------
// Конструктор потомка
function Rabbit(name) {
    //вызываем конструктор родителя чтобы не дублировать код, но можем и не вызывать - в отличии от ф-го наследования
    Animal.apply(this, arguments);
}
// Унаследовать
Rabbit.prototype = Object.create(Animal.prototype);
//если написать так:
//Rabbit.prototype = Animal.prototype;
//то это приведёт к тому, что Rabbit.prototype и Animal.prototype – один и тот же объект.
// В результате методы Rabbit будут помещены в него и, при совпадении, перезапишут методы Animal

// Желательно и constructor сохранить
Rabbit.prototype.constructor = Rabbit;
// Методы потомка
Rabbit.prototype.run = function() {
    // Вызов метода родителя внутри своего
    Animal.prototype.run.apply(this);
    alert( this.name + " подпрыгивает!" );
};

// --------- Класс-потомок 2-----------
function Cat(name) {
    Animal.apply(this, arguments);
    this.own = 1;
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Rabbit;
Cat.prototype.run = function() {
    Animal.prototype.run.apply(this);
    alert( this.name + " мяучит!" );
};


var o = Object.getOwnPropertyDescriptors(new Cat());

for(var key in o){
    alert("key = "+key + ", value = " + o[key]);
}