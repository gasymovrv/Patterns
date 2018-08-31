'use strict';
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

Promise.race([
    httpGet('https://learn.javascript.ru/article/promise/user.json'),
    httpGet('https://learn.javascript.ru/article/promise/guest.json')
]).then(firstResult => {
    firstResult = JSON.parse(firstResult);
    alert( firstResult.name ); // iliakan или guest, смотря что загрузится раньше
}, err => {alert(err)});
