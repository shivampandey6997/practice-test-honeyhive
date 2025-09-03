import {Locator, Page, expect} from '@playwright/test'
import * as dotenv from "dotenv"
import { ProjectData } from '../utils/ProjectData'
import { BasePage } from './BasePage'
dotenv.config()

export class ProjectPage extends BasePage {
    readonly baseUrl:any
    readonly newProjectButtonLocator: Locator
    readonly projectNameLocator: Locator
    readonly projectDescriptionLocator: Locator
    readonly projectCancelButtonLocator: Locator
    readonly projectCreateButtonLocator: Locator
    readonly projectSearchButtonLocator: Locator
    readonly projectEditIconLocator: Locator
    readonly projectCreatedLocator: Locator
    readonly projectDeleteLocator: Locator
    readonly projectDeleteConfirmButtonLocator: Locator
    readonly projectDeleteCancelButtonLocator: Locator
    readonly projectEditButtonLocator: Locator
    readonly projectIdCopyLocator: Locator
    readonly projectDescriptionEditLocator: Locator
    readonly projectDescriptionSaveButton: Locator
    readonly projectDescriptionCloseButton: Locator
    constructor(page:Page){
        super(page)
        this.baseUrl=process.env.BASE_URL
        this.newProjectButtonLocator = page.locator("//button[@data-slot='button']")
        this.projectNameLocator = page.locator("//input[@placeholder='Project name']")
        this.projectDescriptionLocator = page.locator("//textarea[@placeholder='Description (optional)']")
        this.projectCancelButtonLocator = page.locator(".btn-sm.text-slate-600")
        this.projectCreateButtonLocator = page.locator("#create-project-confirm")
        this.projectSearchButtonLocator = page.locator("//input[@placeholder='Search projects']")
        this.projectEditIconLocator = page.locator("//div[@data-sentry-element='EditMenu']")
        this.projectCreatedLocator = page.locator(".font-medium.text-sm.text-black")
        this.projectDeleteLocator = page.locator("//button[text()='Delete']")
        this.projectDeleteConfirmButtonLocator = page.locator("//button[text()='Delete Project']")
        this.projectEditButtonLocator = page.locator("//button[text()='Edit Details']")
        this.projectIdCopyLocator = page.locator("//button[text()='Copy Project ID']")
        this.projectDescriptionEditLocator = page.locator("#project-description")
        this.projectDescriptionSaveButton = page.locator("//button[text()='Save']")
        this.projectDescriptionCloseButton = page.locator("//button[text()='Close']")
        // this.projectDeleteCancelButtonLocator = page.locator()
    }

    async newprojectCreation(){
        await this.newProjectButtonLocator.click()
        await this.projectNameLocator.fill(ProjectData.project.projectname)
        await this.projectDescriptionLocator.fill(ProjectData.project.projectdescription)
        await this.projectCreateButtonLocator.click()
        await this.page.waitForLoadState('load')
        await this.allProjectsLocator.click()
        await this.projectSearchButtonLocator.fill(ProjectData.project.projectname)
        await expect.soft(this.projectCreatedLocator).toHaveText(ProjectData.project.projectname)
    }

    async deleteProject(){
        await this.projectEditIconLocator.click()
        await this.projectDeleteLocator.click()
        await this.projectDeleteConfirmButtonLocator.click()
        await this.projectSearchButtonLocator.fill(ProjectData.project.projectname)
        await expect.soft(this.projectCreatedLocator).not.toBeVisible()
    }

    async editProject(){
        await this.newprojectCreation()
        await this.projectEditIconLocator.click()
        await this.projectEditButtonLocator.click()
        await this.projectDescriptionEditLocator.fill(ProjectData.project.editeddescription)
        await this.projectDescriptionSaveButton.click()
        await this.page.waitForTimeout(4000)
        await this.projectSearchButtonLocator.fill(ProjectData.project.projectname)
        await this.projectEditIconLocator.click()
        await this.projectEditButtonLocator.click()
        await expect.soft(this.projectDescriptionEditLocator).toHaveText(ProjectData.project.editeddescription)
        await this.projectDescriptionCloseButton.click()
        await this.deleteProject()
    }

    async copyProjectIdOfProject(){
        await this.newprojectCreation()
        await this.projectEditIconLocator.click()
        await this.projectIdCopyLocator.click()
        this.page.on('dialog', async dialog => {
        console.log('Dialog message:', dialog.message()); 
        expect.soft(dialog.message()).toContain('Project ID copied to clipboard!');
        await dialog.accept();
        })
        await this.deleteProject()
    }
}