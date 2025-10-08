import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../BasePage'

export class DatasetPage extends BasePage{
    constructor(
        readonly page: Page,
        //Test Data
        readonly datasetUploadPopupContent = 'Upload a new dataset Upload a new dataset with up to 10000 datapoints or read the docs to upload via API or SDK',
        readonly unsupportedFile = 'Unsupported file format. Please upload a valid JSON, JSONL, or CSV file',
        readonly dummyName = 'TestDataset',
        //Locators
        readonly uploadFileButton: Locator = page.locator("//span[@class='hidden xs:block' and text()='Upload a dataset']"),
        readonly readTheDocs: Locator = page.locator("//button[normalize-space(text())='Read the docs']"),
        readonly datasetName: Locator = page.locator("//div//input[@placeholder='Name']"),
        readonly inputFieldId: Locator = page.locator("#id_input"),
        readonly outputFieldText: Locator = page.locator("#text_output"),
        readonly uploadDatasetButton: Locator = page.locator("//button[@data-slot='button' and text()='Upload Dataset']"),
        readonly verifyDatasetName: Locator = page.locator("//div//div//h2[@class='text-lg leading-snug justify-center font-semibold text-slate-600']"),
        readonly deletDatasetIcon: Locator = page.locator("//img[@alt='Trash']"),
        readonly confirmDatasetDelete: Locator = page.locator("//button[text()='Confirm']"),
        readonly cancelDatasetDelete: Locator = page.locator("//button[text()='Cancel']"),
        readonly unsupportedFileMessage: Locator = page.getByText(unsupportedFile)
    )
    {
        super(page)
    }

    async accessingDatasetSection(){
        await this.datasetsSectionLocator.click()
    }
    async datasetSection(){
        await this.accessingDatasetSection()
        await this.page.waitForTimeout(2000)
        await expect.soft(this.page).toHaveURL(/.*datasets.*/)
    }

    async firstVisitToDatasetSection(){
       await this.accessingDatasetSection()
       await expect.soft(this.uploadFileButton).toBeVisible()
       await expect.soft(this.readTheDocs).toBeVisible()
    }

    async uploadDatasetPopup(){
        await this.uploadFileButton.click()
        await expect.soft(this.uploadFileButton).toBeVisible()
    }

    async uploadingCSVDataset(){
        await this.uploadFileButton.click()  // upload button
        // Attaching file from fixtures folder
        await this.page.setInputFiles('input[type="file"][accept=".json,.jsonl,.csv,application/json,application/jsonl,text/csv"]','fixtures/dataset_40.csv'
        )
        await expect.soft(this.datasetName).toHaveValue('dataset_40')
        await this.inputFieldId.check()
        await this.outputFieldText.check()
        await Promise.all([this.successfulDatasetUploadAPI(), this.uploadDatasetButton.click()])
        await expect.soft(this.verifyDatasetName).toHaveText('dataset_40')
        await this.deleteDataset()
    }

    async uploadingJSONDataset(){
        await this.uploadFileButton.click()  // upload button
        // Attaching file from fixtures folder
        await this.page.setInputFiles('input[type="file"][accept=".json,.jsonl,.csv,application/json,application/jsonl,text/csv"]','fixtures/output.json'
        )
        await expect.soft(this.datasetName).toHaveValue('output')
        await this.inputFieldId.check()
        await this.outputFieldText.check()
        await Promise.all([this.successfulDatasetUploadAPI(), this.uploadDatasetButton.click()])
        await expect.soft(this.verifyDatasetName).toHaveText('output')
        await this.deleteDataset()
    }

    async uploadingJSONLDataset(){
        await this.uploadFileButton.click()  // upload button
        // Attaching file from fixtures folder
        await this.page.setInputFiles('input[type="file"][accept=".json,.jsonl,.csv,application/json,application/jsonl,text/csv"]','fixtures/dataset.jsonl'
        )
        await expect.soft(this.datasetName).toHaveValue('dataset')
        await this.inputFieldId.check()
        await this.outputFieldText.check()
        await Promise.all([this.successfulDatasetUploadAPI(), this.uploadDatasetButton.click()])
        await expect.soft(this.verifyDatasetName).toHaveText('dataset')
        await this.deleteDataset()
    }

    async uploadUnsupportedFile(){
        await this.uploadFileButton.click()  // upload button
        // Attaching file from fixtures folder
        await this.page.setInputFiles('input[type="file"][accept=".json,.jsonl,.csv,application/json,application/jsonl,text/csv"]','fixtures/image.png'
        )
        await expect.soft(this.unsupportedFileMessage).toBeVisible()
    }

    async successfulDatasetUploadAPI(){
        const response = await this.page.waitForResponse(resp => resp.url().includes('/api/protected/datapoints') && resp.request().method() === 'POST')
        await expect(response.ok()).toBeTruthy()
    }

    async successfulDatasetDeleteAPI(){
        const response = await this.page.waitForResponse(resp => resp.url().includes('/api/protected/datasets?') && resp.request().method() === 'DELETE')
        await expect(response.ok()).toBeTruthy()
    }
    
    async deleteDataset(){
        await this.deletDatasetIcon.click()
        await Promise.all([this.successfulDatasetDeleteAPI(),this.confirmDatasetDelete.click()])
    }

    async emptyDataset(){
        await this.uploadFileButton.click()
        await this.datasetName.fill(this.dummyName)
        await this.uploadDatasetButton.click()
        await expect.soft(this.verifyDatasetName).toHaveText(this.dummyName)
        await this.deleteDataset()
    }
}