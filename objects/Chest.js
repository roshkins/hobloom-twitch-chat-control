var RNGUtils = require('../lib/RNGUtils');
var GearFactory = require('../lib/NormalGearFactory');

<<<<<<< HEAD
function Chest(type, min_gold, max_gold) {
    this.type = type;
    this.gold = RNGUtils.getRandom(min_gold, max_gold)
=======
function Chest(type, min_gold, max_gold, player_level, min_gear, max_gear) {
    this.type = type;
    this.gold = RNGUtils.getRandom(min_gold, max_gold);
    this.gear = [];

    var num_gear_to_generate = RNGUtils.getRandom(min_gear, max_gear);
    for (var i = 0; i < num_gear_to_generate; i++) {
        this.gear.push(GearFactory.getItemForPlayer(player_level));
    }
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
}

Chest.prototype.getGold = function () {
    return this.gold;
};

<<<<<<< HEAD
=======
Chest.prototype.getGear = function () {
    return this.gear;
};

>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
Chest.prototype.getType = function () {
    return this.type;
};

<<<<<<< HEAD
=======
Chest.prototype.getGearMessage = function () {
    if (!this.gear.length) {
        return false;
    }
    var message = 'bleedPurple The chest contains the following gear: ';
    for (var i = 0; i < this.gear.length; i++) {
        message += '#' + (i + 1) + " " + this.gear[i].name + "-" + this.gear[i].type + " (STR-" + this.gear[i].str + ") (DEX-" + this.gear[i].dex + ") (HP BONUS-" + this.gear[i].hp_bonus + ")" + ' ';
    }
    return message + ' bleedPurple';
};

>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
module.exports = Chest;