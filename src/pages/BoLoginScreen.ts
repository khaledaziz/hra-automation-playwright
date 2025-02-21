import { Page } from "@playwright/test";

export default class BoLoginScreen {

    private readonly username = "#username";
    private readonly password = "#password";
    private readonly loginButton = "#kc-login";

    constructor (private page: Page){

    }

    async enterUsername(username: string){
        await this.page.locator(this.username).fill(username);
        return new BoLoginScreen(this.page);
    }

    async enterPassword(password: string){
        await this.page.locator(this.password).fill(password);
        return new BoLoginScreen(this.page);
    }

    async clickLogin(){
        await this.page.locator(this.loginButton).click();
        return new BoLoginScreen(this.page);
    }
}