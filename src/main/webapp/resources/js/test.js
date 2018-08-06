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
        //ask.bind(this,"Ваш пароль?", this.password, this.loginOk, this.loginFail);//так было
        ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));//так стало
    }
};

var vasya = user;
user = null;
vasya.checkPassword();

