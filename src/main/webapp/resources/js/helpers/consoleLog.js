export function consoleLog(text) {
    console.log(text);
}

export function consoleLogWithName(name, text) {
    consoleLog(`${name}: ${text}`);
}


export function consoleLogObjectStandartWithName(name, obj) {
    consoleLog(`${name} {`);
    consoleLog(obj);
    consoleLog('}');
}


export function consoleLogObjectJSONWithName(name, obj) {
    consoleLog(`${name} ${JSON.stringify(obj,null,4)}`);
}

export function consoleLogWithNameWithContext(name, text, context) {
    contextConditions(
        () => {consoleLog(`${context.name}: ${name}: ${text}`);},
        () => {consoleLog(`${context.constructor.name}: ${name}: ${text}`);},
        () => {consoleLog(`non-context: ${name}: ${text}`);},
        context
    )
}

export function consoleLogObjectJSONWithNameWithContext(name, obj, context) {
    contextConditions(
        () => {consoleLog(`${context.name}: ${name} ${JSON.stringify(obj,null,4)}`);},
        () => {consoleLog(`${context.constructor.name}: ${name} ${JSON.stringify(obj,null,4)}`);},
        () => {consoleLog(`non-context: ${name} ${JSON.stringify(obj,null,4)}`);},
        context
    )
}

export function consoleLogObjectStandartWithNameWithContext(name, obj, context) {
    contextConditions(
        () => {
            consoleLog(`${context.name}: ${name} {`);
            consoleLog(obj);
            consoleLog('}');
        },
        () => {
            consoleLog(`${context.constructor.name}: ${name} {`);
            consoleLog(obj);
            consoleLog('}');
        },
        () => {
            consoleLog(`non-context: ${name} {`);
            consoleLog(obj);
            consoleLog('}');
        },
        context
    )
}

function contextConditions(fn1, fn2, fn3, context) {
    if(context && typeof context === 'function') {
        fn1();
    } else if(context && context.constructor){
        fn2();
    } else {
        fn3();
    }
}