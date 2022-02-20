class summerCamp {
    constructor(organizer, location) {
        this.location = location;
        this.organizer = organizer;
        this.priceForTheCamp = { "child": 150, "student": 300, "collegian": 500 };
        this.listIfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        let campConditionForUser = '';
        let campPriceForUser = 0;
        for (const prop of Object.entries(this.priceForTheCamp)) {
            if (prop[0] == condition) {
                campConditionForUser = prop[0];
                campPriceForUser = Number(prop[1]);
                break;
            }
        }
        if (campConditionForUser == '') {
            throw 'Unsuccessful registration at the camp.';
        }
        if (this.listIfParticipants.some(x => x === name)) {
            return `The ${name} is already registered at the camp.`;
        }
        if (campPriceForUser > Number(money)) {
            return 'The money is not enough to pay the stay at the camp.';
        }

        let participant = {
            name: name,
            condition: condition,
            power: 100,
            wins: 0,
        }
        this.listIfParticipants.push(participant);
        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        let beforeRemoveLength = this.listIfParticipants.length;
        this.listIfParticipants = this.listIfParticipants.filter(x => x.name != name);

        if (this.listIfParticipants.length < beforeRemoveLength) {
            return `The ${name} removed successfully.`;
        }
        else {
            throw Error(`The ${name} is not registered in the camp.`);
        }
    }

    timeToPlay(typeOfGame, participant1, participant2) {
        let existingParticipant1 = this.listIfParticipants.find(x => x.name == participant1);
        let existingParticipant2 = this.listIfParticipants.find(x => x.name == participant2);

        if (existingParticipant1 == undefined) {
            throw Error('Invalid entered name/s.');
        }

        switch (typeOfGame) {
            case 'WaterBalloonFights':
                //Validate participans names
                if (existingParticipant2 == undefined) {
                    throw Error('Invalid entered name/s.');
                }
                if (existingParticipant1.condition != existingParticipant2.condition) {
                    throw Error('Choose players with equal condition.');
                }
                if (existingParticipant1.power > existingParticipant2.power) {
                    existingParticipant1.wins += 1;
                    return `The ${existingParticipant1.name} is winner in the game ${typeOfGame}.`;
                }
                else if (existingParticipant1.power === existingParticipant2.power) {
                    return 'There is no winner.';
                }
                else {
                    existingParticipant2.wins += 1;
                    return `The ${existingParticipant2.name} is winner in the game ${typeOfGame}.`;
                }
            case 'Battleship':
                existingParticipant1.power += 20;
                return `The ${existingParticipant1.name} successfully completed the game ${typeOfGame}.`;
        }
    }

    toString() {
        let result = [];
        result.push(`${this.organizer} will take ${this.listIfParticipants.length} participants on camping to ${this.location}`);

        this.listIfParticipants
            .sort((a, b) => b.wins - a.wins)
            .forEach(x => result.push((`${x.name} - ${x.condition} - ${x.power} - ${x.wins}`)));

        return result.join('\n');
    }
}
