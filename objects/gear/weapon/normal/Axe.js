var util = require('util');
var Gear = require('../../Gear');
var RNGUtils = require('../../../../lib/RNGUtils');

function Axe() {
    Gear.apply(this, arguments);
    this.value = 20;
    this.min_str = 3;
<<<<<<< HEAD
    this.max_str = 8;
=======
    this.max_str = 6;
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
    this.min_dex = 0;
    this.max_dex = 3;
    this.min_bonus_hp = 20;
    this.max_bonus_hp = 60;
    this.min_level = 3;
    this.rarity = 'NORMAL';
    this.type = 'WEAPON';
    this.name = 'Axe';

    this.str = RNGUtils.getRandom(this.min_str, this.max_str);
    this.dex = RNGUtils.getRandom(this.min_dex, this.max_dex);
    this.hp_bonus = RNGUtils.getRandom(this.min_bonus_hp, this.max_bonus_hp);
}

util.inherits(Axe, Gear);
module.exports = Axe;