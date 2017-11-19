var Potion = require('../objects/items/Potion');
<<<<<<< HEAD

function ItemUtils() {

}

ItemUtils.prototype.usePlayerItemByType = function (redis, player, type) {
    item = this.getItemByType(this.getItemNameFromCommand(type));
    if (item != null) {
        item.use(redis, player);
        return this.removeItemFromPlayerByType(redis, this.getItemNameFromCommand(type), player);
    }
    return false;
};

ItemUtils.prototype.removeItemFromPlayerByType = function (redis, type, player) {
    var items = player.getItems();
    for (var i = 0; i < items.length; i++) {
        if (items[i].name === type) {
            items.splice(i, 1);
            player.setItems(items);
            player.update(redis);
            return true;
        }
    }
    return false;
};

ItemUtils.prototype.getItemByType = function (type) {
    switch (type) {
        case 'Potion':
            return new Potion();
    }
    return null;
};

ItemUtils.prototype.getItemCounts = function(items) {
  var item_counts = {};
  for (var i = 0; i < items.length; i++) {
      var item = this.getItemByType(items[i].name);
      if (!(item.getName() in item_counts)) {
          item_counts[item.getName()] = 1;
          continue;
      }
      item_counts[item.getName()]++;
  }
  return item_counts;
};

ItemUtils.prototype.getItemNameFromCommand = function (command) {
    // TODO: Just use lower case everywhere...
    switch (command) {
        case ('Potion'):
        case ('potion'):
            return 'Potion';
    }
    return null;
};
=======
var MegaPotion = require('../objects/items/MegaPotion');

class ItemUtils {
    static usePlayerItemByType(redis, player, type) {
        var item = this.getItemByType(type);
        if (item != null) {
            item.use(redis, player);
            return this.removeItemFromPlayerByType(redis, type, player);
        }
        return false;
    }

    static removeItemFromPlayerByType(redis, type, player) {
        var items = player.getItems();
        for (var i = 0; i < items.length; i++) {
            if (items[i].name.toLowerCase() === type.toLowerCase()) {
                items.splice(i, 1);
                player.setItems(items);
                player.update(redis);
                return true;
            }
        }
        return false;
    }

    static getItemByType(type) {
        switch (type.toLowerCase()) {
            case 'potion':
                return new Potion();
            case 'mega potion':
                return new MegaPotion();
        }
        return null;
    }

    static getItemCounts(items) {
        var item_counts = {};
        for (var i = 0; i < items.length; i++) {
            var item = this.getItemByType(items[i].name);
            if (!(item.getName() in item_counts)) {
                item_counts[item.getName()] = 1;
                continue;
            }
            item_counts[item.getName()]++;
        }
        return item_counts;
    }
}
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6

module.exports = ItemUtils;