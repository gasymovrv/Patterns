function Machine(power) {
    this._power = power;
    this._enabled = false;
    var self = this;
    this.enable = function () {
        self._enabled = true;
    };
    this.disable = function () {
        self._enabled = false;
    };
}
function Fridge(power) {
    // унаследовать
    Machine.apply(this, arguments);
    var parentDisable = this.disable;
    var food = []; // приватное свойство food
    this.disable = function () {
        if (food.length>0) {
            throw new Error("Нельзя выключить: внутри еда");
        }
        parentDisable();
    };
    this.addFood = function () {
        if (!this._enabled) {
            throw new Error("Холодильник выключен");
        }
        if (food.length + arguments.length > this._power / 100) {
            throw new Error("Нельзя добавить, не хватает мощности");
        }
        [].forEach.call(arguments, function (elem) {food.push(elem);}); // добавить всё из arguments
    };
    this.getFood = function () {
        // копируем еду в новый массив, чтобы манипуляции с ним не меняли food
        return food.slice();
    };
    this.filterFood = function (filter) {
        return food.filter(filter);
    };
    this.removeFood = function (value) {
        var i = food.indexOf(value);
        if (i !== -1) {
            food.splice(i, 1);
        }
    }
}
//Использование
// создать холодильник мощностью 500 (не более 5 еды)
 var fridge = new Fridge(500);
// fridge.enable();
// fridge.addFood("котлета");
// fridge.addFood("сок", "варенье");
// var fridgeFood = fridge.getFood();
// alert(fridgeFood); // котлета, сок, варенье
// // добавление элементов не влияет на еду в холодильнике
// fridgeFood.push("вилка", "ложка");
// alert(fridge.getFood()); // внутри по-прежнему: котлета, сок, варенье
//
//
// fridge.enable();
// fridge.addFood("котлета");
// fridge.addFood("сок", "зелень");
// fridge.addFood("варенье", "пирог", "торт"); // ошибка, слишком много еды
//

//Использование removeFood и filterFood
// fridge.enable();
// fridge.addFood({
//     title: "котлета",
//     calories: 100
// });
// fridge.addFood({
//     title: "сок",
//     calories: 30
// });
// fridge.addFood({
//     title: "зелень",
//     calories: 10
// });
// fridge.addFood({
//     title: "варенье",
//     calories: 150
// });
// fridge.removeFood("нет такой еды"); // без эффекта
// alert( fridge.getFood().length ); // 4
// var dietItems = fridge.filterFood(function(item) {
//     return item.calories < 50;
// });
// dietItems.forEach(function(item) {
//     alert( item.title ); // сок, зелень
//     fridge.removeFood(item);
// });
// alert( fridge.getFood().length ); // 2

//Использование disable
fridge.enable();
fridge.addFood("кус-кус");
fridge.disable(); // ошибка, в холодильнике есть еда