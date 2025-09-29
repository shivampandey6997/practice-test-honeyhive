import {Locator, Page, expect} from '@playwright/test'
import * as dotenv from "dotenv"
import { BasePage } from '../BasePage'
dotenv.config()

// Storing configurations for /settings/organization/members

export class ProjectPage extends BasePage { 
    constructor(
        readonly page: Page,
        readonly baseUrl=process.env.BASE_URL,
        // Project test data
        readonly projectName: string = "AutomationTest",
        readonly projectDescription: string = "AutomationDescription",
        readonly editedDescription: string = "EditedDescriptionOfaProject",
        readonly specialCharProjectName: string = "!@!@!#$#@!#$%^",
        // Locators
        readonly newProjectButtonLocator: Locator = page.locator("//button[@data-slot='button']"),
        readonly projectNameLocator: Locator = page.locator("//div//input[@placeholder='Enter project name']"),
        readonly projectDescriptionLocator: Locator = page.locator('//div//textarea[@placeholder="Enter project description (optional)"]'),
        readonly projectCancelButtonLocator: Locator = page.locator("//div//button[@label='Cancel']"),
        readonly projectCreateButtonLocator: Locator = page.locator("//div//button[@label='Create']"),
        readonly projectSearchButtonLocator: Locator = page.locator("//input[@placeholder='Search projects']"),
        readonly projectEditIconLocator: Locator = page.locator("//div[@data-sentry-element='EditMenu']"),
        readonly projectCreatedLocator: Locator = page.locator(".font-medium.text-sm.text-black"),
        readonly projectDeleteLocator: Locator = page.locator("//button[text()='Delete']"),
        readonly projectDeleteConfirmButtonLocator: Locator = page.locator("//button[text()='Delete Project']"),
        readonly projectEditButtonLocator: Locator = page.locator("//button[text()='Edit Details']"),
        readonly projectIdCopyLocator: Locator = page.locator("//button[text()='Copy Project ID']"),
        readonly projectDescriptionEditLocator: Locator = page.locator("//div//textarea[@data-slot='textarea']"),
        readonly projectDescriptionSaveButton: Locator = page.locator("//button[text()='Save']"),
        readonly projectDescriptionCloseButton: Locator = page.locator("//button[text()='Close']"),
        // readonly projectActionCancelBtn: Locator = page.locator("//button[text()='Cancel']")
    )
    {
    super(page)
    }

    /**
     * Creating a new Project
     */
    async newprojectCreation(){
        await this.newProjectButtonLocator.click()
        await this.projectNameLocator.fill(this.projectName)
        await this.projectDescriptionLocator.fill(this.projectDescription)
        await this.projectCreateButtonLocator.click()
        await this.page.waitForLoadState('load')
        await this.allProjectsLocator.click()
        await this.projectSearchButtonLocator.fill(this.projectName)
        await expect.soft(this.projectCreatedLocator).toHaveText(this.projectName)
    }

    /**
     * Deleting any project
     */
    async deleteProject(){
        await this.projectEditIconLocator.click()
        await this.projectDeleteLocator.click()
        await this.projectDeleteConfirmButtonLocator.click()
        await this.projectSearchButtonLocator.fill(this.projectName)
        await expect.soft(this.projectCreatedLocator).not.toBeVisible()
    }

    /**
     * Editing any project description
     */
    async editProject(){
        await this.newprojectCreation()
        await this.projectEditIconLocator.click()
        await this.projectEditButtonLocator.click()
        await this.projectDescriptionEditLocator.fill(this.editedDescription)
        await this.projectDescriptionSaveButton.click()
        await this.page.waitForTimeout(2000)
        await this.projectSearchButtonLocator.fill(this.projectName)
        await this.projectEditIconLocator.click()
        await this.projectEditButtonLocator.click()
        await this.page.pause()
        await expect.soft(this.projectDescriptionEditLocator).toHaveValue(this.editedDescription)
        await this.projectDescriptionCloseButton.click()
        await this.deleteProject()
    }

    /**
     * Copying project ID of any project
     */
    async copyProjectIdOfProject(){
        await this.newprojectCreation()
        await this.projectEditIconLocator.click()
        await this.projectIdCopyLocator.click()
        this.page.on('dialog', async dialog => {
        console.log('Dialog message:', dialog.message()); 
        expect.soft(dialog.message()).toContain("Project ID copied to clipboard!");
        await dialog.accept();
        })
        await this.deleteProject()
    }

    /**
     * Creating a new project without Project name
     */
    async createProjectWithoutProjectName(){
        await this.newProjectButtonLocator.click()
        await this.projectDescriptionLocator.fill(this.projectDescription)
        await this.projectCreateButtonLocator.click()
        this.page.on('dialog', async dialog => {
        expect.soft(dialog.message()).toContain('Please provide a project name.!');
        await dialog.accept();
        })
    }

    /**
     * Creaating a new Project with speical char in name
     */
    async createProjectWithSpecialChars(){
        await this.newProjectButtonLocator.click()
        await this.projectNameLocator.fill(this.specialCharProjectName)
        await this.projectDescriptionLocator.fill(this.projectDescription)
        const responseBody = await Promise.all([
            this.page.waitForResponse(res => res.url().includes('/projects') && res.request().method() === 'POST'),
            await this.projectCreateButtonLocator.click(),
            await expect(this.page.getByText('Error creating project. Error: name contains special characters! Please retry.')).toBeVisible()
        ]).then(([res]) => res);
        const body = await responseBody.json();
        expect.soft(responseBody.status()).toBe(400);
        expect.soft(body).toMatchObject({
        statusCode: 400,
        message: 'Error: name contains special characters!',
        success: false,
        });
    }

    /**
     * Creating a Duplicate projeect
     */
    async createDuplicateProject(){
        await this.newprojectCreation()
        await this.newProjectButtonLocator.click()
        await this.projectNameLocator.fill(this.projectName)
        await this.projectDescriptionLocator.fill(this.projectDescription)
        const responseBody = await Promise.all([
            this.page.waitForResponse(res => res.url().includes('/projects') && res.request().method() === 'POST'),
            await this.projectCreateButtonLocator.click(), 
            await expect(this.page.getByText('Error creating project. Project name already exists in this organization Please retry.')).toBeVisible()
        ]).then(([res]) => res);
        const body = await responseBody.json();
        expect.soft(responseBody.status()).toBe(400);
        expect.soft(body).toMatchObject({
            statusCode: 400,
            message: 'Project name already exists in this organization',
            success: false,
        });
        await this.page.getByRole('button', { name: 'Cancel' }).click()
        await this.projectSearchButtonLocator.fill(this.projectName)
        await expect.soft(this.projectCreatedLocator).toHaveText(this.projectName)
        await this.deleteProject()
    }

    /**
     * Clicking on any project to navigate to Dashboard
     */
    async openingProject(){
        await this.page.waitForLoadState('load')
        await this.page.locator('.font-medium.text-sm.text-black').click()
        await this.page.waitForLoadState('load')
    }
}