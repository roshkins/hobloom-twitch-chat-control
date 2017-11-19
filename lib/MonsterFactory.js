<<<<<<< HEAD
var Imp = require('./../objects/monsters/Imp');
var RNGUtils = require('./RNGUtils');
var Goblin = require('./../objects/monsters/Goblin');
var Dragon = require('./../objects/monsters/Dragon');
var SnowYeti = require('./../objects/monsters/SnowYeti');
var Manticore = require('./../objects/monsters/Manticore');

class MonsterFactory {
    static rollForMonster (client, channel, locks, num_previous_votes, callback) {
        var rng = RNGUtils.getRandom(1, (50 * Math.ceil(num_previous_votes / 4)));
        if (rng == 25) {
            return new Dragon(client, channel, locks, callback);
        }

        rng = RNGUtils.getRandom(1, (20 * Math.ceil(num_previous_votes / 4)));
        if (rng == 15) {
            return new SnowYeti(client, channel, locks, callback);
        }

        rng = RNGUtils.getRandom(1, (12 * Math.ceil(num_previous_votes / 4)));
        if (rng == 7) {
            return new Imp(client, channel, locks, callback);
        }

        rng = RNGUtils.getRandom(1, (8 * Math.ceil(num_previous_votes / 4)));
        if (rng == 5) {
            return new Manticore(client, channel, locks, callback);
        }

        rng = RNGUtils.getRandom(1, (4 * Math.ceil(num_previous_votes / 4)));
        if (rng == 2) {
            return new Goblin(client, channel, locks, callback);
        }
        return null;
=======
var RNGUtils = require('./RNGUtils');
var Goblin = require('./../objects/monsters/Goblin');
var GoblinThief = require('./../objects/monsters/GoblinThief');
var ShockGoblin = require('./../objects/monsters/ShockGoblin');
var ArcherGoblin = require('./../objects/monsters/ArcherGoblin');
var GoblinKing = require('./../objects/monsters/GoblinKing');
var GoblinQueen = require('./../objects/monsters/GoblinQueen');
var Troll = require('./../objects/monsters/Troll');
var Imp = require('./../objects/monsters/Imp');
var DireWolf = require('./../objects/monsters/DireWolf');
var BlackBear = require('./../objects/monsters/BlackBear');
var GiantSpider = require('./../objects/monsters/GiantSpider');
var MotherNature = require('./../objects/monsters/MotherNature');

class MonsterFactory {
    static getMonster (avg_fighter_level, num_fighters) {
        if (avg_fighter_level > 19) {
            return new MotherNature(num_fighters);
        }
        if (avg_fighter_level > 15) {
            return new GiantSpider(num_fighters);
        }
        if (avg_fighter_level > 12) {
            return new BlackBear(num_fighters);
        }
        if (avg_fighter_level > 10) {
            switch(RNGUtils.getRandom(1, 3)) {
                case 1:
                    return new Imp(num_fighters);
                case 2:
                    return new Troll(num_fighters);
                case 3:
                    return new DireWolf(num_fighters);
            }
        }
        if (avg_fighter_level > 8) {
            switch(RNGUtils.getRandom(1, 2)) {
                case 1:
                    return new GoblinQueen(num_fighters);
                case 2:
                    return new GoblinKing(num_fighters);
            }
        }
        if (avg_fighter_level > 6) {
            var rng = RNGUtils.getRandom(1, 2);
            switch(rng) {
                case 1:
                    return new ShockGoblin(num_fighters);
                case 2:
                    return new ArcherGoblin(num_fighters);
            }
        }
        if (avg_fighter_level > 2) {
            return new GoblinThief(num_fighters);
        }
        return new Goblin(num_fighters);
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
    }
}

module.exports = MonsterFactory;