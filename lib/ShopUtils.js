var Potion = require('./../objects/items/Potion');
<<<<<<< HEAD

var items_for_sale = [
    new Potion()
=======
var MegaPotion = require('./../objects/items/MegaPotion');

var items_for_sale = [
    new Potion(),
    new MegaPotion()
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
];

class ShopUtils {
    static getHelpMessage () {
        return 'ItsBoshyTime shop list = Show all items.  displays item name, price and a brief item description ItsBoshyTime shop buy \<item name\> = Buy item from shop using item name ItsBoshyTime';
    }

    static getItemListMessage() {
        var message = 'ItsBoshyTime ';
        for (var i = 0; i < items_for_sale.length; i++) {
            message += items_for_sale[i].getName() + ' | ' + items_for_sale[i].getCost() + ' gold | ' + items_for_sale[i].getDescription() + ' ItsBoshyTime ';
        }
        return message;
    }
<<<<<<< HEAD
=======

    static playerCanAffordItem(cost, player_gold) {
        return cost < player_gold;
    }
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
}

module.exports = ShopUtils;