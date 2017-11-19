var RNGUtils = require('./RNGUtils');
<<<<<<< HEAD
=======

// Normal Weapons
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
var Dagger = require('../objects/gear/weapon/normal/Dagger');
var Sword = require('../objects/gear/weapon/normal/Sword');
var Spear = require('../objects/gear/weapon/normal/Spear');
var Axe = require('../objects/gear/weapon/normal/Axe');
<<<<<<< HEAD

class NormalGearFactory {
    static getItemForPlayer (player_level) {
        var addToLevel = 0;
        if (RNGUtils.getRandom(50, 52) == 51) {
            addToLevel = RNGUtils.getRandom(0, 4);
        }
        player_level += addToLevel;
        if (player_level > 14) {
            player_level = 14;
        }
=======
var Bow = require('../objects/gear/weapon/normal/Bow');
var RustyHammer = require('../objects/gear/weapon/normal/RustyHammer');
var BrokenBottle = require('../objects/gear/weapon/normal/BrokenBottle');

// Rare Weapons
var Greatsword = require('../objects/gear/weapon/rare/Greatsword');
var ElvenBowOfFury = require('../objects/gear/weapon/rare/ElvenBowOfFury');
var Doomdagger = require('../objects/gear/weapon/rare/Doomdagger');

// Mythical Weapons
var DiabloClaw = require('../objects/gear/weapon/mythical/DiabloClaw');
var CthulhusBow = require('../objects/gear/weapon/mythical/CthulhusBow');
var MalletOfRagnos = require('../objects/gear/weapon/mythical/MalletOfRagnos');
var TrollsClub = require('../objects/gear/weapon/mythical/TrollsClub');
var FlameDaggers = require('../objects/gear/weapon/mythical/FlameDaggers');
var SwordOfRage = require('../objects/gear/weapon/mythical/SwordOfRage');

class NormalGearFactory {
    static getItemForPlayer (player_level) {
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
        switch (player_level) {
            case 1:
            case 2:
            case 3:
            case 4:
<<<<<<< HEAD
=======
                var rng = RNGUtils.getRandom(1, 35);
                if (rng == 2) {
                    return this.getSecondTierItem();
                }
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
                return this.getFirstTierItem();
            case 5:
            case 6:
            case 7:
<<<<<<< HEAD
                var rng = RNGUtils.getRandom(1, 4);
                if (rng == 2) {
                    //return this.getSecondTierItem();
=======
                var rng = RNGUtils.getRandom(1, 10);
                if (rng == 2) {
                    return this.getSecondTierItem();
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
                }
                return this.getFirstTierItem();
            case 8:
            case 9:
<<<<<<< HEAD
                break;
            case 10:
            case 11:
                break;
            case 12:
            case 13:
                break;
            case 14:
                break;
        }
    }
    static getFirstTierItem() {
        var rng = RNGUtils.getRandom(1, 4);
=======
                var rng = RNGUtils.getRandom(1, 30);
                if (rng == 20) {
                    return this.getThirdTierItem();
                }
                rng = RNGUtils.getRandom(1, 8);
                if (rng == 5) {
                    return this.getSecondTierItem();
                }
                return this.getFirstTierItem();
            case 10:
            case 11:
                var rng = RNGUtils.getRandom(1, 20);
                if (rng == 10) {
                    return this.getThirdTierItem();
                }
                return this.getSecondTierItem();
            case 12:
            case 13:
                this.getFourthTieritem();
            case 14:
            case 15:
            case 16:
            case 17:
                var rng = RNGUtils.getRandom(1, 8);
                if (rng == 3) {
                    return this.getFifthTieritem();
                }
                return this.getFourthTieritem();
            case 18:
            case 19:
            case 20:
            case 21:
                var rng = RNGUtils.getRandom(1, 8);
                if (rng == 3) {
                    return this.getSixthTieritem();
                }
                return this.getFifthTieritem();
            default:
                return this.getSixthTieritem();
        }
    }
    static getFirstTierItem() {
        var rng = RNGUtils.getRandom(1, 7);
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
        switch(rng) {
            case 1:
                return new Dagger();
            case 2:
                return new Sword();
            case 3:
                return new Spear();
            case 4:
                return new Axe();
<<<<<<< HEAD
        }
    }
=======
            case 5:
                return new Bow();
            case 6:
                return new RustyHammer();
            case 7:
                return new BrokenBottle();
        }
    }

    static getSecondTierItem() {
        var rng = RNGUtils.getRandom(1, 3);
        switch(rng) {
            case 1:
                return new Greatsword();
            case 2:
                return new ElvenBowOfFury();
            case 3:
                return new Doomdagger();
        }
    }

    static getThirdTierItem() {
        return new DiabloClaw();
    }

    static getFourthTieritem() {
        switch(RNGUtils.getRandom(1, 3)) {
            case 1:
                return new CthulhusBow();
            case 2:
                return new MalletOfRagnos();
            case 3:
                return new TrollsClub();
        }
    }

    static getFifthTieritem() {
        return new FlameDaggers();
    }

    static getSixthTieritem() {
        return new SwordOfRage();
    }
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
}

module.exports = NormalGearFactory;