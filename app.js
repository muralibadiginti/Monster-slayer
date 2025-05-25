function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max-min)) + min
}

const app = Vue.createApp({
    data() {
return {
    playerHealth : 100,
    monsterHealth : 100,
    currentRound : 0,
    winner : null
}
    },
    watch :{
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <=0) {
                //draw
                this.winner = 'draw'
            }else if(value <=0) {
                // player lost
                this.winner = 'monster'
            }

        },
      monsterHealth(value) {
            if(value <=0 && this.monsterHealth <=0) {
                //draw
                this.winner = 'draw'
            }else if(value <=0) {
                // monster lost
                this.winner = 'player'
            }

        }
    },
    computed : {
        monsterBarStyles() {
            if(this.monsterHealth < 0) {
                return {width : '0%'}
            }
            return {width : this.monsterHealth+'%'}
        },
        playerBarStyles() {
            
            if(this.playerHealth < 0) {
                return {width : '0%'}
            }
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
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            this.playerHealth +=healValue;
            if(this.playerHealth >100) {
                this.playerHealth = 100;
            }
            this.attackPlayer()
        }
    }
})

app.moun('#game')