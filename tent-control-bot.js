var tmi = require("tmi.js");
var redis = require('redis');
var config = require('config');
var DateDiff = require('date-diff');
var World = require('./objects/World');
var Chest = require('./objects/Chest');
var RNGUtils = require('./lib/RNGUtils');
var ShopUtils = require('./lib/ShopUtils');
var VoteUtils = require('./lib/VoteUtils');
var ItemUtils = require('./lib/ItemUtils');
var StateUtils = require('./lib/StateUtils');
var PlayerUtils = require('./lib/PlayerUtils');
var Potion = require('./objects/items/Potion');
<<<<<<< HEAD
var ChestFactory = require('./lib/ChestFactory');
var MonsterFactory = require('./lib/MonsterFactory');
var LightInfoUtils = require('./lib/LightInfoUtils');
var CommandHelpUtils = require('./lib/CommandHelpUtils');
var Settings = require('./lib/Settings');
var ApplianceUtils = require('./lib/ApplianceUtils');
var PlayerDamageTracker = require('./lib/PlayerDamageTracker');
=======
var MegaPotion = require('./objects/items/MegaPotion');
var MonsterFactory = require('./lib/MonsterFactory');
var CommandHelpUtils = require('./lib/CommandHelpUtils');
var Settings = require('./lib/Settings');
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
var NormalGearFactory = require('./lib/NormalGearFactory');
var ChatUtils = require('./lib/ChatUtils');
var InputValidationUtils = require('./lib/InputValidationUtils');
var GameSettings = require('./objects/GameSettings');
<<<<<<< HEAD
=======
var ResultTracker = require('./lib/ResultTracker');
var AnnouncementUtils = require('./lib/AnnouncementUtils');
var WordBankUtils = require('./lib/WordBankUtils');
var NumberUtils = require('./lib/NumberUtils');
var VictoryUtils = require('./lib/VictoryUtils');
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6

var redis_client = redis.createClient();

var world = new World();
<<<<<<< HEAD
var lightInfoUtils = new LightInfoUtils();
var voteUtils = new VoteUtils();
var stateUtils = new StateUtils();
var itemUtils = new ItemUtils();
var settings = new Settings(null, null);
var applianceUtils = new ApplianceUtils(settings);
var playerDamageTracker = new PlayerDamageTracker();
=======
var resultTracker = new ResultTracker();
var voteUtils = new VoteUtils();
var stateUtils = new StateUtils();
var settings = new Settings(null, null);
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
var gameSettings = new GameSettings(config.get('game_settings'));

var client = new tmi.client(settings.getTwitchChatClientConfig());
stateUtils.setStateNewSentence();

<<<<<<< HEAD
var num_voters_last_round = 1;
var client = new tmi.client(settings.getTwitchChatClientConfig());
=======
var state_change_chat = false;
var battle_winner = null;
var last_vote_tally = new Date();

var current_round_sentance = null;
var rounds_since_sentence_repeated = 0;
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6

client.on("chat", function (channel, userstate, message, self) {
    if (self) return;

<<<<<<< HEAD
    var command = CommandHelpUtils.extractCommandFromMessage(message.toLowerCase());
    var full_command = message.toLowerCase();
    if (CommandHelpUtils.verifyCommand(command)) {
        PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            if (stateUtils.isFightingMonsterState() && CommandHelpUtils.isAttackCommand(command)) {
                var damage_return = player.getDamage();
                var damage = damage_return.damage;
                if (damage_return.crit) {
                    ChatUtils.sayInChat(client, '@' + userstate.username + ', has landed a critical hit for ' + damage + ' damage!');
                }

                playerDamageTracker.addPlayer(player);

                world.getMonster().setHP(world.getMonster().getHP() - damage);
                if (world.getMonster().getHP() <= 0) {
                    ChatUtils.sayInChat(client, "The " + world.getMonster().getName() + " has been slain!");

                    var rng = RNGUtils.getRandom(1, 3);
                    if (rng == 2) {
                        var item = NormalGearFactory.getItemForPlayer(player.getLevel());
                        if (item != null) {
                            ChatUtils.sayInChat(client, "@" + userstate.username + ' FOUND WEAPON: ' + item.getName() + " (STR-" + item.getStrength() + ") (DEX-" + item.getDexterity() + ") (HP BONUS-" + item.getHPBonus() + ")");
                            player.addGear(item);
                        }
                    }
                    player.update(redis_client);

                    playerDamageTracker.addXPForUsers(redis_client, world.getMonster().getXP());
                    playerDamageTracker.clearUsers();
                    stateUtils.setStateOpenVoting();
                    return world.setMonster(null);
                }
                ChatUtils.sayInChat(client, '@' + userstate.username + " has hit the " + world.getMonster().getName() + ' FOR ' + damage + ' DAMAGE! The Monster has ' + world.getMonster().getHP() + ' HP REMAINING!');

                var damage = RNGUtils.getRandom(world.getMonster().getMinDamage(), world.getMonster().getMaxDamage());
                player.setHP(player.getHP() - damage);
                var hp = player.getHP();
                ChatUtils.sayInChat(client, '@' + userstate.username + " the " + world.getMonster().getName() + " swings back and hits you for " + damage + ' damage! YOU HAVE ' + hp + ' HP REMAINING!');
                if (player.getHP() <= 0) {
                    player.setXP(0);
                    player.setHP(player.getMaxHP());
                    var goldToRemove = Math.ceil(player.getGold() * 0.20);
                    player.setGold(player.getGold() - goldToRemove);
                    ChatUtils.sayInChat(client, '@' + userstate.username + " the " + world.getMonster().getName() + " HAS KILLED YOU! You will now lose all your XP and " + goldToRemove + " gold!!");
                }
                player.update(redis_client);
                return;
            }
            if (CommandHelpUtils.isShowEquippedCommand(command)) {
                ChatUtils.sayInChat(client, player.getEquippedGearMessage());
                return;
            }
            if (CommandHelpUtils.isEquipCommand(command)) {
                var itemNumber = CommandHelpUtils.extractSubCommandFromMessage(full_command);
                if (!InputValidationUtils.isStringPositiveInteger(itemNumber) || itemNumber > player.gear.length) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + " you have entered an invalid item number!");
                }
                ChatUtils.sayInChat(client, player.equipGear(itemNumber));
                player.update(redis_client);
                return;
            }
            if (CommandHelpUtils.isDropCommand(command)) {
                var itemNumber = CommandHelpUtils.extractSubCommandFromMessage(full_command);
                if (!InputValidationUtils.isStringPositiveInteger(itemNumber) || itemNumber > player.gear.length) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + " you have entered an invalid item number!");
                }
                ChatUtils.sayInChat(client, player.dropGear(itemNumber));
                player.update(redis_client);
                return;
            }
            if (CommandHelpUtils.isHelpCommand(command)) {
                var subCommand = CommandHelpUtils.extractSubCommandFromMessage(full_command);
                if (CommandHelpUtils.isShopCommand(subCommand)) {
                    return ChatUtils.sayInChat(client, ShopUtils.getHelpMessage());
                }
                return ChatUtils.sayInChat(client, CommandHelpUtils.getHelpInfo());
            }
            if (CommandHelpUtils.isPlayerInfoCommand(command)) {
                return ChatUtils.sayInChat(client, player.getInfoMessage());
            }
            if (CommandHelpUtils.isShowItemsCommand(command)) {
                var message = player.getItemsMessage(itemUtils);
                if (!message) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + ", your don't have any items!");
                }
                return ChatUtils.sayInChat(client, '@' + userstate.username + ", your current items are as follows " + message);
            }
            if (CommandHelpUtils.isShowGearCommand(command)) {
                var message = player.getGearMessage(itemUtils);
                if (!message) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + ", your don't have any gear!");
                }
                return ChatUtils.sayInChat(client, '@' + userstate.username + ", your current gear is as follows " + message);
            }
            if (CommandHelpUtils.isUseItemCommand(command)) {
                if (itemUtils.usePlayerItemByType(redis_client, player, full_command.split(' ')[1])) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + " used a " + full_command.split(' ')[1]);
                }
                return ChatUtils.sayInChat(client, '@' + userstate.username + ", you entered an invalid item.  It is either spelled wrong or you don't have that item in your inventory.");
            }
            if (CommandHelpUtils.isLightInfoCommand(command)) {
                return lightInfoUtils.printLightInfo(config.get('channel'), client);
            }
            if (!stateUtils.isFightingMonsterState() && CommandHelpUtils.isAttackCommand(command)) {
                return;
            }
            if (CommandHelpUtils.isShopItemListCommand(full_command)) {
                return ChatUtils.sayInChat(client, ShopUtils.getItemListMessage());
            }
            if (CommandHelpUtils.isShopBuyItemCommand(full_command)) {
                var gold = player.getGold();
                var item = null;
                var say_message = '@' + userstate.username + ', you have entered an invalid item name';
                switch (full_command.split(' ')[2]) {
                    case ('Potion'):
                    case ('potion'):
                        item = new Potion();
                        break;
                }
                if (item == null) {
                    return ChatUtils.sayInChat(client, say_message);
                }
                if (gold < item.getCost()) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + ', you can afford this item.  Try again when you earn ' + (item.getCost() - gold) + ' more gold.');
                }
                var num_items = itemUtils.getItemCounts(player.getItems())[item.getName()];
                var max_items = item.getMaxInInventor();
                if (num_items >= max_items) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + ', you already have the max ' + item.getName() + ' in your inventory!');
                }
                player.addItem(item);
                player.setGold(gold - item.getCost());
                player.update(redis_client);
                return ChatUtils.sayInChat(client, '@' + userstate.username + ', you have purchased a ' + item.getName());
            }
            if (stateUtils.isVotingOpenState()) {
                if (CommandHelpUtils.isNonVoteCommand(full_command)) {
                    return;
                }
                if (voteUtils.hasUserVoted(userstate.username)) {
                    ChatUtils.sayInChat(client, '@' + userstate.username + ', you have already voted this round. Each user only gets one vote per round!');
                    return;
=======
    if (stateUtils.isBattleState() && resultTracker.isUserWinner(userstate.username)) {
        if (message == current_round_sentance) {
            return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
                var damage_return = player.getDamage();
                world.getMonster().setHP(world.getMonster().getHP() - damage_return.damage);
                ChatUtils.sayInChat(client, getPlayerDamageMessage(userstate.username, damage_return.crit, damage_return.damage, world.getMonster().getHP()));
                if (world.getMonster().getHP() <= 0) {
                    player.updatePlayerXP(world.getMonster().getXP());
                    ChatUtils.sayInChat(client, "@" + userstate.username + " has slain the " + world.getMonster().getName() + "!");
                    player.update(redis_client);
                    battle_winner = player.getUsername();
                    return stateUtils.setStateBattleLootAnnounce();
                }
                return stateUtils.setStateGetBattleSentence();
            });
        }
    }
    if (stateUtils.isUsersTypingState() && !resultTracker.isUserWinner(userstate.username)) {
        if (resultTracker.getWinners().length == 3) {
            return;
        }
        if (message == current_round_sentance) {
            return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
                resultTracker.addWinner(player);
                ChatUtils.sayInChat(client, '@' + userstate.username + ', has come in ' + resultTracker.getWinners().length + NumberUtils.getOrdinalIndicator(resultTracker.getWinners().length) + ' place!');

                if (resultTracker.getWinners().length == 3) {
                    stateUtils.setStateGiveWinnersLoot();
                }
            });
        }
    }

    var command = CommandHelpUtils.extractCommandFromMessage(message.toLowerCase());
    if (!CommandHelpUtils.verifyCommand(command)) {
        return;
    }
    if (CommandHelpUtils.isPlayerInfoCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            return ChatUtils.sayInChat(client, player.getInfoMessage());
        });
    }
    if (CommandHelpUtils.isVoteCommand(command)) {
        var subCommand = CommandHelpUtils.extractSubCommandFromMessage(message.toLowerCase());
        if (!CommandHelpUtils.isValidVoteSubCommand(subCommand)) {
            return ChatUtils.sayInChat(client, '@' + userstate.username + ', you have entered an invalid vote command!');
        }


        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            if (player.getGold() < gameSettings.vote_cost) {
                return ChatUtils.sayInChat(client, "@" + userstate.username + ", you cant afford a vote.  Try again after you earn " + (gameSettings.vote_cost - player.getGold()) + ' more gold!');
            }
            player.setGold(player.getGold() - gameSettings.vote_cost);
            voteUtils.addUserVote(userstate.username, subCommand);
            player.update(redis_client);
            return ChatUtils.sayInChat(client, '@' + userstate.username + ', your vote of ' + subCommand + ' has been accepted!');
        });
    }
    if (CommandHelpUtils.isHelpCommand(command)) {
        var subCommand = CommandHelpUtils.extractSubCommandFromMessage(message.toLowerCase());
        if (typeof subCommand === 'undefined' || subCommand == null) {
            return ChatUtils.sayInChat(client, CommandHelpUtils.getHelpInfo());
        }
        if (CommandHelpUtils.isVoteHelpSubCommand(subCommand)) {
            return ChatUtils.sayInChat(client, CommandHelpUtils.getVoteHelpMessage(gameSettings.vote_cost));
        }
        if (CommandHelpUtils.isShopHelpSubCommand(subCommand)) {
            return ChatUtils.sayInChat(client, ShopUtils.getHelpMessage());
        }
    }
    if (CommandHelpUtils.isShowGearCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            if (player.getGear().length >= player.max_gear) {
                ChatUtils.sayInChat(client, "@" + player.getUsername() + ' YOUR INVENTORY IS FULL! EMPTY IT OR YOU WILL NOT GET ANY NEW ITEM DROPS!!')
            }
            var message = player.getGearMessage(ItemUtils);
            if (!message) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + ", your don't have any gear!");
            }
            return ChatUtils.sayInChat(client, '@' + userstate.username + ", your current gear is as follows " + message);
        });
    }
    if (CommandHelpUtils.isDropCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            var subCommand = CommandHelpUtils.extractSubCommandFromMessage(message.toLowerCase()).toLowerCase();
            if (subCommand != null && subCommand == 'all') {
                player.dropAllGear();
                ChatUtils.sayInChat(client, "@" + player.getUsername() + ', you gave dropped all your gear!')
            } else {
                var itemNumber = CommandHelpUtils.extractSubCommandFromMessage(message.toLowerCase());
                if (!InputValidationUtils.isStringPositiveInteger(itemNumber) || itemNumber > player.gear.length) {
                    return ChatUtils.sayInChat(client, '@' + userstate.username + " you have entered an invalid item number!");
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
                }
                ChatUtils.sayInChat(client, player.dropGear(itemNumber));
            }
            return player.update(redis_client);
        });
    }
    if (CommandHelpUtils.isShowEquippedCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            return ChatUtils.sayInChat(client, player.getEquippedGearMessage());
        });
    }
    if (CommandHelpUtils.isEquipCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            var itemNumber = CommandHelpUtils.extractSubCommandFromMessage(message.toLowerCase());
            if (!InputValidationUtils.isStringPositiveInteger(itemNumber) || itemNumber > player.gear.length) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + " you have entered an invalid item number!");
            }
            ChatUtils.sayInChat(client, player.equipGear(itemNumber));
            return player.update(redis_client);
        });
    }
    if (CommandHelpUtils.isShopItemListCommand(message)) {
        return ChatUtils.sayInChat(client, ShopUtils.getItemListMessage());
    }
    if (CommandHelpUtils.isShopBuyItemCommand(message)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            var itemType = getItemTypeFromMessage(message);
            var item = ItemUtils.getItemByType(itemType);
            if (item == null) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + ', you have entered an invalid item name');
            }
            if (!ShopUtils.playerCanAffordItem(item.getCost(), player.getGold())) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + ', you can\'t afford this item.  Try again when you earn ' + (item.getCost() - player.getGold()) + ' more gold.');
            }
            var num_items = ItemUtils.getItemCounts(player.getItems())[item.getName()];
            var max_items = item.getMaxInInventor();
            if (num_items >= max_items) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + ', you already have the max ' + item.getName() + ' in your inventory!');
            }
            player.addItem(item);
            player.setGold(player.getGold() - item.getCost());
            player.update(redis_client);
            return ChatUtils.sayInChat(client, '@' + userstate.username + ', you have purchased a ' + item.getName());
        });
    }
    if (CommandHelpUtils.isShowItemsCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            var message = player.getItemsMessage(ItemUtils);
            if (!message) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + ", your don't have any items!");
            }
            return ChatUtils.sayInChat(client, '@' + userstate.username + ", your current items are as follows " + message);
        });
    }
    if (CommandHelpUtils.isUseItemCommand(command)) {
        return PlayerUtils.getPlayer(redis_client, userstate.username, function (player) {
            var itemNameArray = message.split(' ');
            var itemName = itemNameArray[1];
            if (itemNameArray.length > 2) {
                itemName += ' ' + itemNameArray[2];
            }
            if (ItemUtils.usePlayerItemByType(redis_client, player, itemName)) {
                return ChatUtils.sayInChat(client, '@' + userstate.username + " used a " + message.split(' ')[1]);
            }
            return ChatUtils.sayInChat(client, '@' + userstate.username + ", you entered an invalid item.  It is either spelled wrong or you don't have that item in your inventory.");
        });
    }
});

<<<<<<< HEAD
                var hunted = false;
                if (!CommandHelpUtils.isHuntCommand(command)) {
                    voteUtils.addUserVote(userstate.username, command);
                    ChatUtils.sayInChat(client, '@' + userstate.username + ', I have received your vote of ' + message + ' and awarded you ' + gameSettings.getGoldForVote() + ' gold for it. Any other votes sent this round will be ignored!');
                } else {
                    hunted = true;
                    voteUtils.addUserWithoutVote(userstate.username);
                    ChatUtils.sayInChat(client, '@' + userstate.username + ', is going hunting. Best of luck in pulling back a monster! You have received ' + (gameSettings.getGoldForVote() * 2) + ' gold for going out hunting!');
                }

                var gold_for_player = gameSettings.getGoldForVote();
                if (hunted) {
                    gold_for_player *= 2;
                }
                var chest_found = ChestFactory.spawnForVote();
                if (chest_found != null) {
                    gold_for_player += chest_found.getGold();
                    ChatUtils.sayInChat(client, '@' + userstate.username + ', YOU FOUND A ' + chest_found.getType() + ' CHEST!! IT CONTAINS ' + chest_found.getGold() + ' GOLD!!');
                }
                player.setGold(player.getGold() + gold_for_player);

                var monsterFactoryReturn = MonsterFactory.rollForMonster(client, config.get("channel"), applianceUtils.appliance_locks, num_voters_last_round, applianceUtils.changeAppliancePower);
                if (monsterFactoryReturn != null) {
                    stateUtils.setStateUnderAttack();
                    world.setMonster(monsterFactoryReturn);
                    ChatUtils.sayInChat(client, 'SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc SMOrc');
                    world.getMonster().spawn();
                }
                return player.update(redis_client);
            }
        });
=======
client.connect();
settings.getSettings()
.then(function (settings_update) {
    settings = new Settings(settings_update.min_humidity, settings_update.max_humidity);
    setInterval(mainLoop, 1000);
})
.catch(function (err) {
    console.log(err);
});

function mainLoop() {
    if (stateUtils.isGenerateNewSentenceState()) {
        return WordBankUtils.getSentance(function (err, data) {
            if (err) {
                return console.log(err);
            }
            resultTracker.clearWinners();
            current_round_sentance = data.replace("\n", " ").replace("\r", " ");
            ChatUtils.clearChat(client);
            ChatUtils.sayInChat(client, "A new round has begun! Type the following sentence in chat to win gold and loot! \"" + current_round_sentance + "\"");
            stateUtils.setStateUsersTyping();
        });
    }
    if (stateUtils.isUsersTypingState()) {
        rounds_since_sentence_repeated++;
        if (rounds_since_sentence_repeated >= gameSettings.rounds_repeat_sentance) {
            ChatUtils.sayInChat(client, "Enter \"" + current_round_sentance + "\" in chat to win the round!");
            rounds_since_sentence_repeated = 0;
        }

        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.max_length_seconds_main_round) {
            if (resultTracker.getWinners().length > 0) {
                rounds_since_sentence_repeated = 0;
                stateUtils.setStateGiveWinnersLoot();
            }
        }
        return;
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
    }
    if (stateUtils.isGiveWinnersLootState()) {
        ChatUtils.clearChat(client);
        ChatUtils.sayInChat(client, "Winners will now be given loot!");
        stateUtils.setStateAnnounceFirstLoot();
        return;
    }
    if (stateUtils.isAnnounceFirstLootState()) {
        if (state_change_chat == false) {
            state_change_chat = true;
            giveBootyToWinner(1, 200);
        }

<<<<<<< HEAD
client.connect();
settings.getSettings()
.then(function (settings_update) {
    settings = new Settings(settings_update.min_humidity, settings_update.max_humidity);
    setInterval(mainLoop, 2000);
})
.catch(function (err) {
    console.log(err);
});

function announcePoll() {
    ChatUtils.sayInChat(client, 'Kappa Kappa CHECK US OUT ON PATREON TO SUPPORT MORE OPEN SOURCE AUTOMATION SOFTWARE! http://patreon.com/hightek Kappa Kappa');
}

function mainLoop() {
    if (stateUtils.isFightingMonsterState()) {
        var time_in_fight = new DateDiff(new Date(), world.getMonster().getFightStartTime());
        if (time_in_fight.seconds() >= 15) {
            world.getMonster().punish();
            world.getMonster().finish(settings);
            stateUtils.setStateOpenVoting();
        }
        return;
    }
    if (stateUtils.isVotingOpenState()) {
        var time_in_round = new DateDiff(new Date(), voteUtils.getRoundStartedTime());
        if (time_in_round.minutes() >= gameSettings.getRoundTimeInMinutes()) {
        //if (time_in_round.seconds() >= 15) {
            stateUtils.setCountingVotes();
        }
        return;
    }
    if (stateUtils.isCountingVotesState()) {
        ChatUtils.sayInChat(client, 'The current round has ended and all votes have been locked in! I will now tally up the votes and announce a winner');
        var winners = voteUtils.tallyVotes();
        if (winners.length > 1) {
            ChatUtils.sayInChat(client, 'It looks like we have a tie!  Rolling for a winner!!');
            winners = [ winners[ Math.floor(Math.random() * winners.length) ] ];
        }
        ChatUtils.sayInChat(client, voteUtils.handleWinner(winners[0], settings, applianceUtils, lightInfoUtils));
        stateUtils.setStateOpenVoting();
        voteUtils.clear();
        announcePoll();
        ChatUtils.sayInChat(client, 'Voting is now open and a new round has begun!');
        return;
=======
        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.loot_announce_delay_seconds) {
            state_change_chat = false;

            if (resultTracker.getWinners().length == 1) {
                return stateUtils.setStateAnnounceBattle();
            }
            return stateUtils.setStateAnnounceSecondLoot();
        }
    }
    if (stateUtils.isAnnounceSecondLootState()) {
        if (state_change_chat == false) {
            state_change_chat = true;
            giveBootyToWinner(2, 100);
        }

        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.loot_announce_delay_seconds) {
            state_change_chat = false;

            if (resultTracker.getWinners().length == 2) {
                return stateUtils.setStateAnnounceBattle();
            }
            return stateUtils.setStateAnnounceThirdLoot();
        }
    }
    if (stateUtils.isAnnounceThirdLootState()) {
        if (state_change_chat == false) {
            state_change_chat = true;
            giveBootyToWinner(3, 50);
        }

        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.loot_announce_delay_seconds) {
            state_change_chat = false;
            return stateUtils.setStateAnnounceBattle();
        }
    }
    if (stateUtils.isAnnounceNewRoundState()) {
        if (!state_change_chat) {
            state_change_chat = true;
            ChatUtils.sayInChat(client, "A new round is about to begin!");
        }
        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.new_round_announce_delay_seconds) {
            state_change_chat = false;
            return startNewRound();
        }
    }
    if (stateUtils.isAnnounceBattleState()) {
        if (!state_change_chat) {
            state_change_chat = true;

            var monster = MonsterFactory.getMonster(resultTracker.getAverageWinnerLevel(), resultTracker.getWinners().length);
            world.setMonster(monster);

            ChatUtils.clearChat(client);
            ChatUtils.sayInChat(client, monster.getAttackStartMessage());
        }
        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.announce_battle_delay_seconds) {
            state_change_chat = false;
            return stateUtils.setStateGetBattleSentence();
        }
    }
    if (stateUtils.isGetBattleSentenceState()) {
        return WordBankUtils.getBattleSentance(function (err, data) {
            if (err) {
                return console.log(err);
            }
            current_round_sentance = data.replace("\n", " ").replace("\r", " ");
            ChatUtils.sayInChat(client, "To kill the monster enter the sentence in between the emotes! TwitchRPG " + current_round_sentance + " TwitchRPG");
            return stateUtils.setStateBattle();
        });
    }
    if (stateUtils.isBattleState()) {
        if (!resultTracker.getWinners().length) {
            stateUtils.setStateAnnounceNewRound();
        }

        rounds_since_sentence_repeated++;
        if (rounds_since_sentence_repeated >= 6) {
            ChatUtils.sayInChat(client, "Enter \"" + current_round_sentance + "\" in chat to win the round!");
            rounds_since_sentence_repeated = 0;
        }

        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.time_between_monster_attacks_seconds) {
            var user = resultTracker.getWinners()[RNGUtils.getRandom(0, resultTracker.getWinners().length - 1)];
            var damage = world.getMonster().getDamage();
            return PlayerUtils.getPlayer(redis_client, user, function (player) {
                ChatUtils.sayInChat(client, "The " + world.getMonster().getName() + ' attacks @' + user + ' for ' + damage + ' damage!');
                player.takeDamage(damage);
                if (player.getHP() <= 0) {
                    resultTracker.getWinners().splice(resultTracker.getWinners().indexOf(player.getUsername()), 1);
                    player.die();
                    ChatUtils.sayInChat(client, "@" + player.getUsername() + " has died!");
                }
                stateUtils.setStateBattle();
                return player.update(redis_client);
            });
            rounds_since_sentence_repeated = 0;
        }
    }
    if (stateUtils.isBattleLootAnnounceState()) {
        if (!state_change_chat) {
            state_change_chat = true;
            return PlayerUtils.getPlayer(redis_client, battle_winner, function (player) {
                var prize = new Chest('Mythical', 50, 100, player.getLevel(), 2, 3);
                player.setGold(player.getGold() + prize.getGold());
                for (var i = 0; i < prize.getGear().length; i++) {
                    player.addGear(prize.getGear()[i]);
                }
                ChatUtils.sayInChat(client, '@' + battle_winner + ', you find a mythical chest containing ' + prize.getGold() + ' gold!');
                var gear_message = prize.getGearMessage();
                if (gear_message) {
                    ChatUtils.sayInChat(client, gear_message);
                }
                ChatUtils.sayInChat(client, AnnouncementUtils.getAnnouncement());
                return player.update(redis_client);
            });
        }
        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.announce_battle_loot_delay_seconds) {
            state_change_chat = false;
            return startNewRound();
        }
    }
    if (stateUtils.isTallyVotesState()) {
        if (!state_change_chat) {
            state_change_chat = true;

            ChatUtils.clearChat(client);
            ChatUtils.sayInChat(client, 'The current round has ended and all votes have been locked in! I will now tally up the votes and announce a winner');
            var voteWinners = voteUtils.tallyVotes();
            if (!voteWinners.length) {
                state_change_chat = false;
                last_vote_tally = new Date();
                return startNewRound();
            }
            if (voteWinners.length > 1) {
                ChatUtils.sayInChat(client, 'It looks like we have a tie!  Rolling for a winner!!');
                voteWinners = [voteWinners[Math.floor(Math.random() * voteWinners.length)]];
            }
            ChatUtils.sayInChat(client, voteUtils.handleWinner(voteWinners[0], settings));
            voteUtils.clear();
            ChatUtils.sayInChat(client, 'Voting is now open and a new round is about to begin!');
            return ChatUtils.sayInChat(client, AnnouncementUtils.getAnnouncement());
        }
        var time_in_round = new DateDiff(new Date(), stateUtils.getLastStateChange());
        if (time_in_round.seconds() >= gameSettings.post_vote_delay_seconds) {
            state_change_chat = false;
            last_vote_tally = new Date();
            return startNewRound();
        }
    }
}

function getPlayerDamageMessage(username, wasCrit, damage, monsterHP) {
    if (wasCrit) {
        return '@' + username + ', has landed a critical hit for ' + damage + ' damage! The Monster has ' + world.getMonster().getHP() + ' HP REMAINING!';
    }
    return '@' + username + " has hit the " + world.getMonster().getName() + ' FOR ' + damage + ' DAMAGE! The Monster has ' + monsterHP + ' HP REMAINING!';
}

function giveBootyToWinner(place, xp) {
    return PlayerUtils.getPlayer(redis_client, resultTracker.getWinners()[place - 1], function (player) {
        var chest = VictoryUtils.getChestForWinner(place, player.getLevel());
        player.setGold(player.getGold() + chest.getGold());
        for (var i = 0; i < chest.getGear().length; i++) {
            player.addGear(chest.getGear()[i]);
        }
        player.updatePlayerXP(xp);
        ChatUtils.sayInChat(client, '@' + resultTracker.getWinners()[place - 1] + ' has won 200 XP and a Mythical chest! It contains ' + chest.getGold() + ' gold!');
        var gearMessage = chest.getGearMessage();
        if (gearMessage) {
            ChatUtils.sayInChat(client, gearMessage);
        }
        return player.update(redis_client);
    });
}

function getItemTypeFromMessage(message) {
    var itemType = message.split(' ')[2];
    if (message.split(' ').length > 3) {
        itemType += ' ' + message.split(' ')[3];
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
    }
    return itemType;
}
<<<<<<< HEAD
=======

function startNewRound() {
    var time_in_round = new DateDiff(new Date(), last_vote_tally);
    if (time_in_round.minutes() >= gameSettings.time_between_vote_counts_minutes && voteUtils.tallyVotes().length) {
        return stateUtils.setStateTallyVotes();
    }
    resultTracker.clearWinners();
    stateUtils.setStateNewSentence();
}
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
