import { test } from '../fixtures/PageFixture'

test.describe('Project Page Scripts',()=>{
    
    test('TC_01 Create a New Project and Delete Project', async({atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.newprojectCreation()
        await atProjectPage.deleteProject()
    })

    test('TC_02 Editing a Project', async({atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.editProject()
    })

    test('TC_03 Copy Project ID of a project', async({atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.copyProjectIdOfProject()
    })

    test('TC_04 Creating a Project without name', async({atLoginPage, atProjectPage}) =>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage. createProjectWithoutProjectName()
    })

    test('TC_05 Creating a Project with special characters in name', async({atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.createProjectWithSpecialChars()
    })

    test('TC_06 Creating a Duplicate Project', async({atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.createDuplicateProject()
    })

})