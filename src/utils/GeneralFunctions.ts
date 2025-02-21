export default class GeneralFunctions{

    async getRandomImaratesId() {
        return Math.floor(Math.random() * (78419906 - 1000000)) + 1000000
      }

}