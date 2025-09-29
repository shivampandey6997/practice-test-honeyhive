import { test } from "../fixtures/PageFixture";

test.describe('Dataset Scripts',()=>{

    test('Verify that user is able to navigate to Dataset section', async({atLoginPage, atProjectPage, atDatasetPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.datasetSection()
    })

    test('User sees dataset upload & docs icons on first visit to Datasets section',async({atLoginPage, atProjectPage, atDatasetPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.firstVisitToDatasetSection()
    })

    test('Verify clicking on Upload a dataset button pops up a UI to upload dataset',async({atLoginPage, atProjectPage, atDatasetPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.accessingDatasetSection()
        
    })
})