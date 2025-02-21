import { test, expect } from '@playwright/test';
import BoLoginScreen from '../pages/BoLoginScreen';
import GeneralFunctions from '../utils/GeneralFunctions';
import JsRegister from '../api/js/JsRegister';
import JpCreation from '../api/jp/JpApis';
import * as fs from 'fs';
import * as authenticator from '../utils/AuthenticatorHelper';
import type { APIResponse } from '@playwright/test';
import BoHomeScreen from '../pages/BoHomeScreen';
import WorkspaceScreen from '../pages/WorkspaceScreen';
import JobPostScreen from '../pages/JobPostScreen';

const jsBaseJSON = require('../data/requests-data/jobseekers/registerJobseekerData.json');
const algBaseJSON = require('../data/requests-data/job-posts/algorithm.json');
const jpBaseJSON = require('../data/requests-data/job-posts/jobPost-data.json');

var jsId ;
let jpId;
let jpCode;
let algorithmId;
let templateId;
let jsRegisterContext
let jpCreationContext
const _ = require('lodash');

test.beforeEach(async ({ request }) => {
  const generalFunctionsObj = new GeneralFunctions();
  jsRegisterContext = new JsRegister();
  jpCreationContext = new JpCreation();

  let idn = await generalFunctionsObj.getRandomImaratesId();

  
  // const data = await fs.promises.readFile('src/data/requests-data/jobseekers/registerJobseekerData.json', 'utf8');
  // const jsonData = JSON.parse(data);

  // //Process the JSON data here
  // jsonData.uaePassData.idn = ''+idn+'';
  // jsonData.uaePassData.userEmail = 'testuser' + idn + '@test.com';
  // jsonData.icaData.personName.fullEnglishName = '111 ' + idn;

  // // Write the updated data back to the file (optional)
  // const updatedData = JSON.stringify(jsonData, null, 2);
  // await fs.promises.writeFile('src/data/temp/registerJobseekerData' + idn +'.json', updatedData);
  // const registerFile = await fs.promises.readFile('src/data/temp/registerJobseekerData' + idn +'.json', 'utf8');
  // const registerBody = JSON.parse(registerFile);

  //   //create algorithm
  //   const algData = await fs.promises.readFile('src/data/requests-data/job-posts/algorithm.json', 'utf8');
  //   const jsonalgData = JSON.parse(algData);
    
  //   jsonalgData.name = 'algorithm test' + idn;
  
  //   // Write the updated data back to the file (optional)
  //   const updatedAlgData = JSON.stringify(jsonalgData, null, 2);
  //   await fs.promises.writeFile('src/data/temp/algorithm' + idn +'.json', updatedAlgData);
  //   const algFile = await fs.promises.readFile('src/data/temp/algorithm' + idn +'.json', 'utf8');
  //   const algBody = JSON.parse(algFile);
  
  //   let algResponse = await (await jpCreationContext.algCreate(algBody)).json();
  //   algorithmId = algResponse.algorthimTemplate.id;
  //   console.log(algorithmId);
  

  const jsRequestBody = _.cloneDeep(jsBaseJSON); // Deep clone

  jsRequestBody.uaePassData.idn = ''+idn+'';
  jsRequestBody.uaePassData.userEmail = 'testuser222@test.com';
  jsRequestBody.icaData.personName.fullEnglishName = '222 ' + idn;
  
  let jsResponses = await (await jsRegisterContext.register(jsRequestBody, idn.toString())).json();
  jsId = jsResponses.data.id;
  console.log(jsId);

  

  



  const algRequestBody = _.cloneDeep(algBaseJSON);
  algRequestBody.name = 'algorithm test' + idn;

  let algResponse = await (await jpCreationContext.algCreate(algRequestBody)).json();
  algorithmId = algResponse.algorthimTemplate.id;
  console.log(algorithmId);
  
  //Create a JP
  const jpRequestBody = _.cloneDeep(jpBaseJSON);

  jpRequestBody.name.en = 'job test for Takafo' + idn + '(To be closed)';
  jpRequestBody.name.ar = 'وظيفة اختبار تكافو' + idn + '(To be closed)';
  jpRequestBody.jobTitle = 'job test for Takafo' + idn + '(To be closed)';
  jpRequestBody.jobTitleArabic = 'وظيفة اختبار تكافو' + idn + '(To be closed)';
  jpRequestBody.degree = 'Agriculture';
  jpRequestBody.minRequiredEduLevel = 'Doctoral';
  jpRequestBody.major = 'Agribusiness';
  jpRequestBody.matchingAlgorithmId = algorithmId;
  jpRequestBody.matchingAlgorithm = 'algorithm test' + idn;


  let jpResponse = await (await jpCreationContext.jpCreate(jpRequestBody, idn.toString())).json();
  jpId = jpResponse.data.id;
  jpCode = jpResponse.data.eoCode;
  console.log(jpCode);

  await jpCreationContext.jpActivate(jpId);

});


test('has title', async ({ page }) => {

  const loginPage = new BoLoginScreen(page);
  const homeScreen = new BoHomeScreen(page);
  const workspaceScreen = new WorkspaceScreen(page);
  const jobPostScreen = new JobPostScreen(page);

  await page.goto(process.env.url!);
  await loginPage.enterUsername("backoffice");
  await loginPage.enterPassword("test");
  await loginPage.clickLogin();

  await homeScreen.openWorkspace();
  await workspaceScreen.clickAddBtn();
  await jobPostScreen.jpSearch(jpId);
  await jobPostScreen.addJpRwrs();
  await workspaceScreen.startMatching(jpCode);
  await workspaceScreen.jsSearch(jsId);
  await workspaceScreen.jsShortlist();
  await workspaceScreen.openShortlistedTab();
  await workspaceScreen.clickScheduleInterview();
  await workspaceScreen.enterInterviewDate('26-10-2025');
  await workspaceScreen.enterInterviewTime('01', '00');
  await workspaceScreen.enterInterviewDuration('01:30');
  await workspaceScreen.enterInterviewPanel('fatma');
  await workspaceScreen.enterInterviewMode('F2F');
  await workspaceScreen.enterInterviewLocation('test');
  await workspaceScreen.saveInterviewOfferModal();
  await workspaceScreen.clickScheduleInterview();
  await workspaceScreen.clickAccept();
  await workspaceScreen.enterJoiningDate('26-10-2025');
  await workspaceScreen.enterSalary('432432')
  await workspaceScreen.enterComment('test');
  await workspaceScreen.saveInterviewOfferModal();
  await workspaceScreen.clickOffer();
  await workspaceScreen.clickAccept();


  await page.waitForTimeout(10000);
  //await loginPage.clickLogin();

  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle("Takafo");
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
