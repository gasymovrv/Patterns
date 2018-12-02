import {
    consoleLog,
    consoleLogWithName,
    consoleLogObjectJSONWithName,
    consoleLogObjectStandartWithName,
    consoleLogObjectJSONWithNameWithContext,
    consoleLogObjectStandartWithNameWithContext
} from "./resources/js/helpers/consoleLog";
consoleLog('--------------------------------------------begin code from bundle.js---------------------------------------------------');







var oscar = {
    name: 'Oscar',
    meow: function() {
        // console.log(this.name + ' meows!');
        consoleLogObjectJSONWithNameWithContext('this', this, this);
    }
};

var m = oscar.meow;
oscar.meow();//здесь this=oscar
m();//а здесь будет undefined, т.к. webpack добавляет в bundle.js "use strict"










consoleLog('--------------------------------------------end code from bundle.js---------------------------------------------------');