import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../BasePage'

export class DatasetPage extends BasePage{
    constructor(
        readonly page: Page,
        readonly uploadDatasetButton: Locator = page.locator("//span[@class='hidden xs:block' and text()='Upload a dataset']"),
        readonly readTheDocs: Locator = page.locator("//button[normalize-space(text())='Read the docs']")
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
       await expect.soft(this.uploadDatasetButton).toBeVisible()
       await expect.soft(this.readTheDocs).toBeVisible()
    }

    async uploadDatasetPopup(){
        

    }
}