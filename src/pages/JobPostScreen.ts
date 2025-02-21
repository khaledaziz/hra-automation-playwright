import { Page } from "@playwright/test";

export default class JobPostScreen {
    
    private readonly addToRwsBtn = 'xpath = //button[contains(@class,"btn-primary floating-btn")]';
    private readonly jpSearchBar = 'xpath = (//input[@type="text"])[1]';
    private readonly jpSearchBtn = '.fa.fa-search';
    private readonly firstJpCheckbox = 'xpath = (//tr[contains(@class,"ant-table-row")]//input)[2]';


    constructor (private page: Page){

    }

    async jpSearch(jp: string){
        await this.page.locator(this.jpSearchBar).fill(jp);
        await this.page.locator(this.jpSearchBtn).click();
    }

    async addJpRwrs(){
        await this.page.locator(this.firstJpCheckbox).click();
        await this.page.locator(this.addToRwsBtn).click();
    }

}