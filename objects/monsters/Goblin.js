var Monster = require('./Monster');
var util = require('util');

function Goblin(multiplier) {
    Monster.apply(this, arguments);
    this.name = "Goblin";
<<<<<<< HEAD
    this.hp = 5;
    this.xp = 10;
    this.min_damage = 1;
    this.max_damage = 2;
    this.callbackFunction = callback;
}

Goblin.prototype.spawn = function () {
    this.client.say(this.channel, "A WILD GOBLIN HAS APPEARED!! It has " + this.hp + " hp!");
    this.client.say(this.channel, "CurseLit CurseLit TYPE .. IN CHAT NOW TO ATTACK CurseLit CurseLit");
};

Goblin.prototype.punish = function () {
    this.client.say(this.channel, "You failed to kill the goblin! The circulating fan will now be locked off for 15 minutes!");
    this.locks['intake'] = new Date();
    return this.locks;
};

Goblin.prototype.finish = function (settings) {
    this.callbackFunction(settings, 'intake', false);
};
=======
    this.max_hp = 3 * multiplier;
    this.hp = this.max_hp;
    this.xp = 100;
    this.min_damage = 1;
    this.max_damage = 10;
    this.battle_begin_message = 'A Goblin runs into your village from the goblin infested caves north of your village!';
}
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6

util.inherits(Goblin, Monster);

module.exports = Goblin;