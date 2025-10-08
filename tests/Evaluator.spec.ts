import { test } from "../fixtures/PageFixture";

test.describe('Evaluator scripts',()=>{

    test('TC_01 Verify user is able to navigate to Evaluator page', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
    })

    test('TC_02 Verify user lands on Human evaluator page', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.humanEvaluatorVisible()
    })

    test('TC_03 Verify Python, LLM, Human & Composite Evaluator tab are visible on Evaluator page', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.differentEvaluatorsVisibility()
    })

    test('TC_04 Verify that when landing for first time there are no pre created Python, LLM & Composite Evaluator', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.noMetricOnFirstLogin()
    })

    test.only('TC_05 Verify that user is able to create a python evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingPythonEvaluator()
        await atEvaluatorPage.deletingMetric()
    })

    test('TC_06 Verify user is able to create a LLM Evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{   
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingLLMEvaluator()
        await atEvaluatorPage.deletingMetric()
    })

    test('TC_07 Verify that user is able to create a Human Evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingHumanEvaluator()
    })

    test('TC_08 Verify user is able to create a Custom Evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingCompositeEvaluator()
    })

    test('TC_09 Verify that Evaluator can be created without a name', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.evalWithoutName()
    })

    test('TC_10 Verify that eval created has a status of disabled in production', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.eval_Disable()
    })

    test('TC_11 Verify that eval created has a status of enabled in production at time of creation only', async({atEvaluatorPage,atLoginPage,atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.eval_Enable()
    })

    test('TC_12 Verify that two evaluators of same type can not be created', async({atEvaluatorPage, atProjectPage, atLoginPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingDuplicateMetric()
    })

    test('TC_13 Verify that user is able to edit a evaluator and deploy it to Prodcution', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.editingCreatedEval()
    })

    test('TC_14 Verifying visibility of Commit button in Deploy Window', async({atLoginPage, atProjectPage, atEvaluatorPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.checkingForCommitButton()
    })

    test('TC_15 Verify that user is able to create a Categorcial return type human evaluator', async({atEvaluatorPage, atLoginPage, atProjectPage})=>{
        await atLoginPage.loginWithValidCreds()
        await atProjectPage.openingProject()
        await atEvaluatorPage.evaluatorSection()
        await atEvaluatorPage.creatingCategoricalHumanEvaluator()
        await atEvaluatorPage.deletingMetric()
    })
})