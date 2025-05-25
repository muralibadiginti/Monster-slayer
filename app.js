function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max-min)) + min
}

const app = Vue.createApp({
    data() {
return {
    playerHealth : 100,
    monsterHealth : 100,
    currentRound : 0
}
    },
    computed : {
        monsterBarStyles() {
            return {width : this.monsterHealth+'%'}
        },
        playerBarStyles() {
            return {width : this.playerHealth+'%'}
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.playerHealth -=attackValue
            this.attackPlayer();
        },

        attackPlayer() {
            const attackvalue = getRandomValue(8,15);
            this.monsterHealth -=attackvalue;
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth  -=attackValue;
            this.attackPlayer();
        },
        mayUseSpecialAttack() {
            return this.currentRound %3 !==0;
        }
    }
})

app.moun('#game')