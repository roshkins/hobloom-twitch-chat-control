var ApplianceUtils = require('./ApplianceUtils');

function VoteUtils() {
    this.current_votes = this.clearVoteCounts();
}

VoteUtils.prototype.tallyVotes = function () {
    var winners = [];
    var winning_num_votes = 0;

    for (key in this.current_votes) {
        if (this.current_votes[key] > winning_num_votes) {
            winning_num_votes = this.current_votes[key];
            winners = [];
            winners.push(key);
        } else if (this.current_votes[key] != 0 && this.current_votes[key] == winning_num_votes) {
            winners.push(key);
        }
    }
    return winners;
};

VoteUtils.prototype.addUserVote = function (username, vote) {
  this.current_votes[vote]++;
};

<<<<<<< HEAD
VoteUtils.prototype.addUserWithoutVote = function (username) {
    this.users_voted.push(username);
};

VoteUtils.prototype.hasUserVoted = function (username) {
  return this.users_voted.includes(username);
};

=======
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
VoteUtils.prototype.clearVoteCounts = function () {
    return {
        'turnofffan': 0,
        'turnonfan': 0,
        'turnonexhaust': 0,
        'turnoffexhaust': 0
    };
};

<<<<<<< HEAD
VoteUtils.prototype.handleWinner = function (command, settings, applianceUtils, lightInfoUtils) {
    switch (command) {
        case 'raisemaxh':
            settings.raiseMaxHumidity();
            return 'The winning command is raise max humidity! The max humidity setting will go up by one percent.';
        case 'lowermaxh':
            settings.lowerMaximumHumidity();
            return 'The winning command is lower max humidity! The max humidity setting will go down by one percent.';
        case 'raiseminh':
            settings.raiseMinHumidity();
            return 'The winning command is raise minimum humidity! The minimum humidity setting will go up by one percent.';
        case 'lowerminh':
            settings.lowerMinHumidity();
            return 'hThe winning command is lower minimum humidity! The minimum humidity setting will go down by one percent.';
        case 'turnofflights':
            if (lightInfoUtils.getLightsOn()) {
                lightInfoUtils.updateLightStatus(false);
            }
            applianceUtils.changeAppliancePower(settings, 'light', false);
            return 'The winning command is turn off lights! The lights will now be turning off and the icon on the dashboard will turn red.';
        case 'turnonlights':
            var lock_message = applianceUtils.checkApplianceLock('lights');
            if (lock_message != null) {
                return lock_message;
            }
            if (!lightInfoUtils.getLightsOn()) {
                lightInfoUtils.updateLightStatus(true);
                applianceUtils.changeAppliancePower(settings, 'light', true);
            }
            return 'The winning command is turn on lights! The lights will now be turning on and the icon on the dashboard will turn blue.';
        case 'turnonfan':
            var lock_message = applianceUtils.checkApplianceLock('intake');
            if (lock_message != null) {
                return lock_message;
            }
            applianceUtils.changeAppliancePower(settings, 'intake', true);
            return 'The winning command is turn on fan! The circulating fan will now be turning on and the icon on the dashboard will turn blue.';
        case 'turnofffan':
            applianceUtils.changeAppliancePower(settings, 'intake', false);
            return 'The winning command is turn off fan! The circulating fan will now be turning off and the icon on the dashboard will turn red.';
        case 'turnonexhaust':
            var lock_message = applianceUtils.checkApplianceLock('exhaust');
            if (lock_message != null) {
                return lock_message;
            }
            applianceUtils.changeAppliancePower(settings, 'exhaust', true);
            return 'The winning command is turn on exhaust fan! The exhaust fan will now be turning on and the icon on the dashboard will turn blue.';
        case 'turnoffexhaust':
            applianceUtils.changeAppliancePower(settings, 'exhaust', false);
=======
VoteUtils.prototype.handleWinner = function (command, settings) {
    switch (command) {
        case 'turnonfan':
            ApplianceUtils.changeAppliancePower(settings, 'intake', true);
            return 'The winning command is turn on fan! The circulating fan will now be turning on and the icon on the dashboard will turn blue.';
        case 'turnofffan':
            ApplianceUtils.changeAppliancePower(settings, 'intake', false);
            return 'The winning command is turn off fan! The circulating fan will now be turning off and the icon on the dashboard will turn red.';
        case 'turnonexhaust':
            ApplianceUtils.changeAppliancePower(settings, 'exhaust', true);
            return 'The winning command is turn on exhaust fan! The exhaust fan will now be turning on and the icon on the dashboard will turn blue.';
        case 'turnoffexhaust':
            ApplianceUtils.changeAppliancePower(settings, 'exhaust', false);
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
            return 'The winning command is turn off exhaust fan! The exhaust fan will now be turning off and the icon off the dashboard will turn red.';
        default:
            return '';
    }
};

VoteUtils.prototype.clear = function () {
    this.current_votes = this.clearVoteCounts();
};

module.exports = VoteUtils;