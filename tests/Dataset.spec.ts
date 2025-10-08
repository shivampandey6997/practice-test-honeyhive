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
        await atDatasetPage.uploadDatasetPopup()
    })

    test('Verify user can upload a CSV file', async({atLoginPage, atDatasetPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.accessingDatasetSection()
        await atDatasetPage.uploadingCSVDataset()
    })

    test('Verify user can upload a JSON file', async({atDatasetPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.accessingDatasetSection()
        await atDatasetPage.uploadingJSONDataset()
    })

    test('Verify user can upload a JSONL file', async({atDatasetPage, atProjectPage, atLoginPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.accessingDatasetSection()
        await atDatasetPage.uploadingJSONLDataset()
    })

    test('Verify user can not upload a invalid format file', async({atLoginPage, atProjectPage, atDatasetPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.accessingDatasetSection()
        await atDatasetPage.uploadUnsupportedFile()
    })

    test.only('Verify user can create a empty dataset', async({atLoginPage, atProjectPage, atDatasetPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atDatasetPage.accessingDatasetSection()
        await atDatasetPage.emptyDataset()
    })
})