var RNGUtils = require('../../lib/RNGUtils');

function Monster(multiplier) {
    this.name = '';
<<<<<<< HEAD
    this.hp = 1;
    this.xp = 0;
    this.min_damage = 1;
    this.max_damage = 2;
    this.fight_start_time = new Date();
=======
    this.hp = null;
    this.max_hp = null;
    this.xp = null;
    this.min_damage = null;
    this.max_damage = null;
    this.battle_begin_message = '';
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
}

Monster.prototype.getName = function () {
    return this.name;
};

Monster.prototype.getMaxHP = function () {
    return this.max_hp;
};

Monster.prototype.getHP = function () {
    return this.hp;
};

Monster.prototype.setHP = function (hp) {
    this.hp = hp;
    if (this.hp < 0) {
        this.hp = 0;
    }
};

Monster.prototype.getXP = function () {
    return this.xp;
};

<<<<<<< HEAD
Monster.prototype.getFightStartTime = function () {
    return this.fight_start_time;
};

=======
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
Monster.prototype.getMinDamage = function () {
    return this.min_damage;
};

Monster.prototype.getMaxDamage = function () {
    return this.max_damage;
};
<<<<<<< HEAD
=======

Monster.prototype.getDamage = function () {
    return RNGUtils.getRandom(this.min_damage, this.max_damage);
};

Monster.prototype.getAttackStartMessage = function () {
    return this.battle_begin_message;
}
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6

module.exports = Monster;