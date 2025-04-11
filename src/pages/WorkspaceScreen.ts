import { expect, Page } from "@playwright/test";

export default class WorkspaceScreen {
    
    private readonly addToWorkspaceBtn = 'xpath = //div[@id="btnAdd"]/span';
    private readonly jsSearchBar ='xpath = (//input[@type="text"])[1]';
    private readonly shortlistBtn = 'xpath = (//img[@class="ng-star-inserted"])[1]';
    private readonly shortlistTab = 'xpath = //*[@alt="shortlisted"]';
    private readonly scheduleInterviewBtn = 'xpath = (//app-button[@class="ng-star-inserted"]//button[@type="submit"])[1]';
    private readonly interviewDate = 'xpath = //input[@id="date"]';
    private readonly interviewHour = 'xpath = //input[@aria-label= "Hours"]';
    private readonly interviewMin = 'xpath = //input[@aria-label= "Minutes"]';
    private readonly interviewDuration = 'xpath = //input[@formcontrolname= "duration"]';
    private readonly interviewPanel = 'xpath = //ng-select[@bindlabel="fullName"]//input';
    private readonly interviewMode = 'xpath = //ng-select[@formcontrolname="mode"]//input';
    private readonly interviewLocation = 'xpath = //textarea[@formcontrolname= "location"]';
    private readonly saveInterviewBtn = 'xpath = //div[contains(@class,"modal")]//button[@type= "submit"]';
    private readonly acceptBtn = 'xpath = //div[contains(@class,"modal")]//button[contains(@class,"btn-primary mb-2 me-3 floatRight")]';
    private readonly joiningDate = 'xpath = //input[@id="joiningDate"]';
    private readonly salary = '#monthlySalary';
    private readonly comment = '#comment';
    private readonly offerBtn = 'xpath = (//app-button[@class="ng-star-inserted"]//button[@type="submit"])[2]';
    
    constructor (private page: Page){

    }

    async clickAddBtn(){
        await this.page.locator(this.addToWorkspaceBtn).click();
    }

    async startMatching(jp: string){
        await this.page.locator('(//div//span[contains(text(),"'+jp+'")]/following:: div[contains(@class,"btn-start-matching")])[1]').click();
        await this.page.waitForResponse(response => response.url().includes('/js/match/vacancy/') && response.status() === 200);
    }

    async jsSearch(js: string){
        await this.page.locator(this.jsSearchBar).fill(js);
        await this.page.locator(this.jsSearchBar).press('Enter');
        await this.page.waitForResponse(response => response.url().includes('/js/match/vacancy/') && response.status() === 200);
    }

    async jsShortlist(){
        await expect(async () => {
            await this.page.locator(this.shortlistBtn).click();
            await expect(this.page.locator(this.shortlistBtn)).toBeHidden();
          }).toPass();
        
        
    }

    async openShortlistedTab(){
        await this.page.locator(this.shortlistTab).click();
    }

    async clickScheduleInterview(){
        await this.page.locator(this.scheduleInterviewBtn).click();
        await this.page.waitForResponse(response => response.url().includes('/js/interview/') && response.status() === 200);
        await this.page.waitForResponse(response => response.url().includes('/getUsersByCompany') && response.status() === 200);
    }

    async enterInterviewDate(date: string){
        await this.page.locator(this.interviewDate).fill(date);
    }

    async enterInterviewTime(hrs: string, mins: string){
        await this.page.locator(this.interviewHour).fill(hrs);
        await this.page.locator(this.interviewMin).fill(mins);
    }

    async enterInterviewDuration(duration: string){
        await this.page.locator(this.interviewDuration).fill(duration);
    }

    async enterInterviewPanel(panel: string){
        await this.page.locator(this.interviewPanel).fill(panel);
        await this.page.locator(this.interviewPanel).press('Enter');
    }

    async enterInterviewMode(mode: string){
        await this.page.locator(this.interviewMode).fill(mode);
        await this.page.locator(this.interviewMode).press('Enter');
    }

    async enterInterviewLocation(loc: string){
        await this.page.locator(this.interviewLocation).fill(loc);
    }

    async saveInterviewOfferModal(){
        await this.page.locator(this.saveInterviewBtn).first().click();
    }

    async clickAccept(){
        await this.page.locator(this.acceptBtn).click();
    }

    async enterJoiningDate(date: string){
        await this.page.locator(this.joiningDate).fill(date);
    }

    async enterSalary(salary: string){
        await this.page.locator(this.salary).fill(salary);
    }

    async enterComment(comment: string){
        await this.page.locator(this.comment).fill(comment);
    }

    async clickOffer(){
        await this.page.locator(this.offerBtn).click();
    }
}