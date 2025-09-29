import { test } from "../fixtures/PageFixture";

test.describe('Evaluator scripts',()=>{

    test('Verify user is able to navigate to Evaluator page', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
    })

    test('Verify user lands on Human evaluator page', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.humanEvaluatorVisible()
    })

    test('Verify Python, LLM, Human & Composite Evaluator tab are visible on Evaluator page', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.differentEvaluatorsVisibility()
    })

    test('Verify that when landing for first time there are no pre created Python, LLM & Composite Evaluator', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.noMetricOnFirstLogin()
    })

    test('Verify that user is able to create a python evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingPythonEvaluator()
        await atEvaluatorPage.deletingMetric()
    })

    test('Verify user is able to create a LLM Evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{   
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingLLMEvaluator()
        await atEvaluatorPage.deletingMetric()
    })

    test('Verify that user is able to create a Human Evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingHumanEvaluator()
    })

    test('Verify user is able to create a Custom Evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingCompositeEvaluator()
    })

    test('Verify that Evaluator can be created without a name', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.evalWithoutName()
    })

    test('Verify that eval created has a status of disabled in production', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.eval_Disable()
    })

    test('Verify that eval created has a status of enabled in production at time of creation only', async({atEvaluatorPage,atLoginPage,atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.eval_Enable()
    })

    test('Verify that two evaluators of same type can not be created', async({atEvaluatorPage, atProjectPage, atLoginPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingDuplicateMetric()
    })

    test('Verify that user is able to edit a evaluator and deploy it to Prodcution', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.editingCreatedEval()
    })

    test('Verifying visibility of Commit button in Deploy Window', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.checkingForCommitButton()
    })

    test('Verify that user is able to create a Categorcial return type human evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingCategoricalHumanEvaluator()
        await atEvaluatorPage.deletingMetric()
    })
})