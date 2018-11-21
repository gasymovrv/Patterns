// 'use strict';
var oscar = {
    name: 'Oscar',
    meow: function() {
        console.log(this.name + ' meows!');
        console.log(this);
    }
};

var m = oscar.meow;
oscar.meow();
m();