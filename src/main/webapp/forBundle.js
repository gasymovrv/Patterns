import {consoleLog, consoleLogWithName, consoleLogObjectJSONWithName, consoleLogObjectStandartWithName} from "./resources/js/helpers/consoleLog";
consoleLog('--------------------------------------------begin code from bundle.js---------------------------------------------------');







let i = parseInt('12345.34');
let f = parseFloat('12345.457');
let i2 = Number.parseInt('12345.34');
let f2 = Number.parseFloat('12345.457');
consoleLogWithName('parseInt()', i);
consoleLogWithName('parseFloat()+toFixed', f.toFixed(2));
consoleLogWithName('Number.parseInt()', i2);
consoleLogWithName('Number.parseFloat()+toFixed', f2.toFixed(2));









consoleLog('--------------------------------------------end code from bundle.js---------------------------------------------------');