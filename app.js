function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            playerCooldown: 0,

            enemyHealth: 100,
            gameEndState: '',

            battlelogs: [],

        };
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.enemyHealth <= 0) {
                this.gameEndState = "It's a draw!";
            } else if (value <= 0) {
                this.gameEndState = 'You have lost!'
            }
        },
        enemyHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.gameEndState = "It's a draw!";
            } else if (value <= 0) {
                this.gameEndState = 'You have won!'
            }
         }
    },



    computed: {
        enemyBarStyles() {
            if (this.enemyHealth <= 0) {
                return {width: 0 + '%'};
            }
            return {width: this.enemyHealth + '%'};
        },
        playerBarStyles() {
            if (this.playerHealth <= 0) {
                return {width: 0 + '%'};
            }
            return {width: this.playerHealth + '%'};
        }
    },

    methods: {
        attackEnemy() {
            const playerAttackDamage = getRandomValue(5, 12);
            this.enemyHealth = this.enemyHealth - playerAttackDamage;
            this.battlelogs.unshift('You attacked for ' + playerAttackDamage + ' damage!');   
            this.endRound();
        },
        endRound() {
            const enemyAttackDamage = getRandomValue(6, 14);
            this.battlelogs.unshift('The enemy attacked for ' + enemyAttackDamage + ' damage!'); 
            this.playerHealth -= enemyAttackDamage;
            this.battlelogs.unshift('### The round has ended ###');
            if (this.playerCooldown > 0) {
                this.playerCooldown--;
            }
            
        },
        specialAttackEnemy() {
            if (this.playerCooldown == 0) {
                const playerSpecialAttackDamage = getRandomValue(3, 30);
                this.battlelogs.unshift('Your Special Attack hits for ' + playerSpecialAttackDamage + ' damage!');
                this.enemyHealth -= playerSpecialAttackDamage;
                this.playerCooldown = 3;
                this.endRound();
            } else {
                alert('You have to wait ' + this.playerCooldown + ' rounds to use this ability again');
            }
        },
        playerHeal() {
            const healValue = getRandomValue(8, 14);
            this.battlelogs.unshift('You heal yourself for ' + healValue + '!');
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue
            }

            this.endRound();
        },
        restartGame(){
            this.playerHealth = 100;
            this.enemyHealth = 100;
            this.playerCooldown = 0;
            this.gameEndState = '';
            this.battlelogs = [];
        },

    }





});

app.mount('#game');