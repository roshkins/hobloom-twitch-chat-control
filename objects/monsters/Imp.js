var Monster = require('./Monster');
var util = require('util');

function Imp(multiplier) {
    Monster.apply(this, arguments);
    this.name = "Imp";
<<<<<<< HEAD
    this.hp = 25;
    this.xp = 50;
    this.min_damage = 10;
    this.max_damage = 20;
    this.callbackFunction = callback;
}

Imp.prototype.spawn = function () {
    this.client.say(this.channel, "A WILD IMP HAS APPEARED!! It has " + this.hp + " hp!");
    this.client.say(this.channel, "CurseLit CurseLit TYPE .. IN CHAT NOW TO ATTACK CurseLit CurseLit");
};

Imp.prototype.punish = function () {
    this.client.say(this.channel, "You failed to kill the Imp! The exhaust will now be locked off for 15 minutes!");
    this.locks['exhaust'] = new Date();
    return this.locks;
};

Imp.prototype.finish = function (settings) {
    this.callbackFunction(settings, 'exhaust', false);
};

=======
    this.max_hp = 180 * multiplier;
    this.hp = this.max_hp;
    this.xp = 500;
    this.min_damage = 150;
    this.max_damage = 200;
    this.battle_begin_message = 'An Imp runs into your village from the Forgotten Forest to the north west.  It stands roughly four feet with and extra six inches coming from its pointed ears.  It has dark grey skin and large pointed claws on its hands and feet.  The Imp stares at you through its beady red eyes with a lust for blood!';
}

>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
util.inherits(Imp, Monster);

module.exports = Imp;