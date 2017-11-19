var util = require('util');
var Item = require('./../Item');

function Potion() {
    Item.apply(this, arguments);
    this.cost = 100;
    this.name = 'Potion';
    this.description = 'Heals player for 50 hp';
    this.max_in_inventory = 20;
}

Potion.prototype.use = function (redis, player) {
<<<<<<< HEAD
    player.setHP(player.getHP() + 50);
=======
    player.heal(50);
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
    if (player.getHP() > player.getMaxHP()) {
        player.setHP(player.getMaxHP());
    }
    player.update(redis);
};

util.inherits(Potion, Item);

module.exports = Potion;