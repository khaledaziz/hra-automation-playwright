import { Page } from "@playwright/test";
import BoLoginScreen from "./BoLoginScreen";

export default class BoHomeScreen {
    
    private readonly cvBank = "#viewmoduleeo";
    private readonly workspace = "#viewmodulerws";
    private readonly loginButton = "#kc-login";

    constructor (private page: Page){

    }

    async openWorkspace(){
        await this.page.locator(this.workspace).click();
        return new BoLoginScreen(this.page);
    }

}