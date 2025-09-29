import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../BasePage'

export class EvaluatorPage extends BasePage{
    creatingCustomEvaluator: any
    constructor(
        readonly page: Page,
        // Evaluator Test Data
        readonly existingPythonEvalName ='Custom Python Metric',
        readonly existingPythonEvalDescription = 'Create a custom Python metric with your own evaluation logic',
        readonly existingLLMEvalName = 'Custom LLM Evaluator',
        readonly existingLLMEvalDescription= 'Create a custom LLM-based evaluator with your own prompts',
        readonly existingHumanEvalName = 'New Evaluator',
        readonly existingHumanEvalEvaluationCriteria = 'Please rate the quality of the response out of 5.',
        readonly existingCompositeEvalName = 'New Evaluator',
        readonly dummyEvalName = 'AutomationEval',
        readonly dummyEvalDescription = 'AutomationDescriptionOfEval',
        readonly evalCreatedSuccess = 'Metric created successfully!',
        readonly evalDeleted = `${dummyEvalName} was deleted `,
        readonly noEvalName = 'Metric name cannot be empty',
        readonly disabledEval = 'Disabled in production',
        readonly enabledEval = 'Enabled in production',
        readonly duplicateEval = `Duplicate metric: A metric with the same name ${dummyEvalName}, event_name (All Completions), and event_type (model) combination already exists in this project.`,
        readonly commmitMessage = 'Automation Test',
        readonly metricUpdateMessage = 'Metric updated successfully!',
        readonly categoryValue1 = 'Nice',
        readonly categoryValue2 = 'Very Nice',
        readonly categoryValue3 = 'Ok Ok',
        //Locators
        readonly preDefinedHumanEvaluator: Locator = page.locator('.text-left.font-medium.text-slate-800'),
        readonly pythonEvaluatorTab: Locator = page.locator("#tab-PYTHON"),
        readonly llmEvaluatorTab: Locator = page.locator("#tab-LLM"),
        readonly humanEvaluatorTab: Locator = page.locator("#tab-HUMAN"),
        readonly compositeEvaluatorTab: Locator = page.locator("#tab-COMPOSITE"),
        readonly noMetricFound: Locator = page.locator(".flex.justify-center.items-center.h-44"),
        readonly createNewEvalButton: Locator = page.locator("//span[text()='New Evaluator']"),
        readonly customPythonMetric: Locator = page.locator("//div//h4[text()='Custom Python Metric']"),
        readonly customLLMMetric: Locator = page.locator("//div//h4[text()='Custom LLM Evaluator']"),
        readonly customHumanEvaluator: Locator = page.locator("//div//h4[text()='Custom Criteria Field']"),
        readonly customCompositeEvaluator: Locator = page.locator("//div//h4[text()='Composite Metric']"),
        readonly createMetricButton: Locator = page.locator("//span[text()='Create']"),
        readonly metricName: Locator = page.locator("#new-metric-name"),
        readonly metricDescription = page.locator("#new-metric-description"),
        readonly metricEvalCriteria = page.locator("#criteria"),
        readonly setupWindowOfEval = page.locator("#tab-configuration"),
        readonly consoleWindowOfEval = page.locator("#tab-editor"),
        readonly evaluatorTemplateDropdown = page.locator("//button[@name='metric-template']"),
        readonly responseLengthPythonTemplate = page.locator("//li[@data-name='metric-template-item-Response Length']"),
        readonly summaryFaithfulnessLLMTemplate = page.locator('//li[@data-name="metric-template-item-Summary Faithfulness"]'),
        readonly answerFaithfulnessLLMTemplate = page.locator('//li[@data-name="metric-template-item-Answer Faithfulness"]'),  
        readonly backButton = page.locator('//button//img[@alt="Back"]'),
        readonly deleteMetric = page.locator("//img[@alt='Trash']"),
        readonly conifrmMetricDelete = page.locator("//button[text()='Confirm']"),
        readonly getAutomationEvalRow = page.locator("//tr[.//div[text()='AutomationEval']]"),
        readonly compositeMinimumAggregateFunction = page.locator("//input[@id='minimum' and @type='radio']"),
        readonly pythonEvalsInComposite = page.locator("//img[@alt='Python Evaluators']"),
        readonly llmEvalsInComposite = page.locator("//img[@alt='LLM Evaluators']"),
        readonly checkboxInCompositeEval = page.locator("#checkbox"),
        readonly disabledStatusOfEvaluator = page.locator("//div[@class='text-left']//span[@class='text-xs font-medium bg-red-100 text-red-700 rounded-full px-2.5 py-1']"),
        readonly enabledStatusOfEvaluator = page.locator("//div[@class='text-left']//span[@class='text-xs font-medium bg-green-100 text-emerald-600 rounded-full px-2.5 py-1']"), 
        readonly enableInProdButton = page.locator("//label[@for='enable-in-prod']"),
        readonly commitButton = page.locator("//span[@class='hidden xs:block' and text()='Commit']"),
        readonly commitMessageTextArea: Locator = page.locator("//div//textarea[@placeholder='Enter commit message']"),
        readonly deployThisVersionCheckbox: Locator = page.locator("#deployThisVersion"),
        readonly commitAndDeployButton: Locator = page.locator("//button//span[text()='Commit and Deploy']"),
        readonly commitButtonAtDeployTime = page.locator("svg.mr-1"),
        readonly returnTypeDropdown: Locator = page.locator("//div[@class='inline-block' and @type='button']"),
        readonly categoricalReturnType: Locator = page.locator("//div[@data-value='categorical']"), 
        readonly categoryPredDefValue1: Locator = page.locator('//input[@aria-label="Category 1 Name"]'),
        readonly categoryPreDefValue2: Locator = page.locator('//input[@aria-label="Category 2 Name"]'),
        readonly categoryPreDefValue3: Locator = page.locator('//input[@aria-label="Category 3 Name"]'),
        readonly metricCreatedIcon: Locator = page.getByRole('button', { name: 'Version Icon Create Metric' })
    )
    {
        super(page)
    }
    /**
     * Checks Evaluator section visibility
     */
    async evaluatorSection(){
        await this.evaluatorSectionLocator.click()
        await this.page.waitForTimeout(2000)
        await expect.soft(this.page).toHaveURL(/.*metrics.*/)
    }

    /**
     * Checks for human evaluator visibility
     */
    async humanEvaluatorVisible(){
        await expect.soft(this.preDefinedHumanEvaluator).toHaveText(['Comments', 'Rating'])
    }

    /**
     * Checking visibility of different evaluator types
     */
    async differentEvaluatorsVisibility(){
        await expect.soft(this.pythonEvaluatorTab).toBeVisible()
        await expect.soft(this.llmEvaluatorTab).toBeVisible()
        await expect.soft(this.humanEvaluatorTab).toBeVisible()
        await expect.soft(this.compositeEvaluatorTab).toBeVisible()
    }

    /**
     * Checks no metric created on first login to platform
     */
    async noMetricOnFirstLogin(){
        await this.pythonEvaluatorTab.click()
        await expect.soft(this.noMetricFound).toHaveText('No metrics found')
        await this.llmEvaluatorTab.click()
        await expect.soft(this.noMetricFound).toHaveText('No metrics found')
        await this.compositeEvaluatorTab.click()
        await expect.soft(this.noMetricFound).toHaveText('No metrics found')
    }

    /**
     * Creating a python evaluator
     */
    async creatingPythonEvaluator(){
        await this.createNewEvalButton.click()
        await this.customPythonMetric.click()
        await expect.soft(this.metricName).toHaveValue(this.existingPythonEvalName)
        await expect.soft(this.metricDescription).toHaveText(this.existingPythonEvalDescription)
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.responseLengthPythonTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await Promise.all([this.checkEvalSuccessResponse(), this.createMetricButton.click()])
        await expect.soft(this.page.getByText(this.evalCreatedSuccess)).toBeVisible()
        await expect.soft(this.metricCreatedIcon).toBeVisible()
        await this.backButton.click()
    }
    
    /**
     * Creating a LLM evaluator
     */
    async creatingLLMEvaluator(){
        await this.createNewEvalButton.click()
        await this.customLLMMetric.click()
        await expect.soft(this.metricName).toHaveValue(this.existingLLMEvalName)
        await expect.soft(this.metricDescription).toHaveText(this.existingLLMEvalDescription)
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.summaryFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await Promise.all([this.checkEvalSuccessResponse(), this.createMetricButton.click()])
        await expect.soft(this.page.getByText(this.evalCreatedSuccess)).toBeVisible()
        await expect.soft(this.metricCreatedIcon).toBeVisible()
        await this.backButton.click()
    }

    /**
     * Creating a human evaluator
     */
    async creatingHumanEvaluator(){
        await this.createNewEvalButton.click()
        await this.customHumanEvaluator.click()
        await expect.soft(this.metricName).toHaveValue(this.existingHumanEvalName)
        await this.metricName.fill(this.dummyEvalName)
        await this.consoleWindowOfEval.click()
        await expect.soft(this.metricEvalCriteria).toHaveValue(this.existingHumanEvalEvaluationCriteria)
        await this.metricEvalCriteria.fill(this.dummyEvalDescription)
        await Promise.all([this.checkEvalSuccessResponse(), this.createMetricButton.click()])
        await expect.soft(this.page.getByText(this.evalCreatedSuccess)).toBeVisible()
        await expect.soft(this.metricCreatedIcon).toBeVisible()
        await this.backButton.click()
        await this.getAutomationEvalRow.locator(this.deleteMetric).click()
        await this.conifrmMetricDelete.first().click()
        await expect.soft(this.page.getByText(this.evalDeleted)).toBeVisible()
    }

    /**
     * Delete a metric/evaluator created
     */
    async deletingMetric(){
        await this.getAutomationEvalRow.locator(this.deleteMetric).click()
        await Promise.all([this.checkEvalDeleteResponse(), this.conifrmMetricDelete.first().click() ])
        await expect.soft(this.page.getByText(this.evalDeleted)).toBeVisible()
    }

    /**
     * Creating a composite evaluator
     */
    async creatingCompositeEvaluator(){
        await this.creatingPythonEvaluator()
        await this.creatingLLMEvaluator()
        await this.page.waitForTimeout(2000)
        await this.createNewEvalButton.click()
        await this.customCompositeEvaluator.click()
        await expect.soft(this.metricName).toHaveValue(this.existingCompositeEvalName)
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await this.consoleWindowOfEval.click()
        await expect.soft(this.compositeMinimumAggregateFunction).toBeChecked()
        await expect.soft(this.pythonEvalsInComposite).toBeVisible()
        await this.checkboxInCompositeEval.click()
        await this.llmEvalsInComposite.click()
        await this.checkboxInCompositeEval.click()
        await Promise.all([this.checkEvalSuccessResponse(), this.createMetricButton.click()])
        await expect.soft(this.page.getByText(this.evalCreatedSuccess)).toBeVisible()
        await expect.soft(this.metricCreatedIcon).toBeVisible()
        await this.backButton.click()
        await this.deletingMetric()
        await this.pythonEvaluatorTab.click()
        await this.deletingMetric()
        await this.page.reload()
        await this.llmEvaluatorTab.click()
        await this.deletingMetric()
        await this.page.reload()
    }

    /**
     * Creating evalautor without name
     */
    async evalWithoutName(){
        await this.createNewEvalButton.click()
        await this.customLLMMetric.click()
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.summaryFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.clear()
        await this.createMetricButton.click()
        await expect.soft(this.page.getByText(this.noEvalName)).toBeVisible()
    }

    /**
     * Checking for evaluator status in disabled state
     */
    async eval_Disable(){
        await this.creatingLLMEvaluator()
        await expect.soft(this.getAutomationEvalRow.locator(this.disabledStatusOfEvaluator)).toHaveText(this.disabledEval)
        await this.deletingMetric()
    }

    /**
     * Checking for evaluator status in enabled state
     */
    async eval_Enable(){
        await this.createNewEvalButton.click()
        await this.customLLMMetric.click()
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.summaryFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.enableInProdButton.click()
        await this.page.waitForLoadState('networkidle')
        await Promise.all([this.checkEvalSuccessResponse(), this.createMetricButton.click()])
        await expect.soft(this.page.getByText(this.evalCreatedSuccess)).toBeVisible()
        await this.page.waitForTimeout(2000)
        await expect.soft(this.metricCreatedIcon).toBeVisible()
        await this.backButton.click()
        await expect.soft(this.getAutomationEvalRow.locator(this.enabledStatusOfEvaluator)).toHaveText(this.enabledEval)
        await this.deletingMetric()
    }

    /**
     * Check for creation of a duplicate metric
     */
    async creatingDuplicateMetric(){
        await this.creatingLLMEvaluator()
        await this.page.waitForLoadState('networkidle')
        await expect.soft(this.getAutomationEvalRow).toBeVisible()
        await this.page.reload()
        await this.createNewEvalButton.click()
        await this.customLLMMetric.click()
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.summaryFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await this.createMetricButton.click()
        await expect.soft(this.page.getByText(this.duplicateEval)).toBeVisible()
        await this.backButton.click()
        await this.deletingMetric()
    }

    /**
     * Check for API success response for a eval created
     */
    async checkEvalSuccessResponse(){
        const response = await this.page.waitForResponse(resp => resp.url().includes('/api/protected/metrics') && resp.request().method() === 'POST')
        expect.soft(response.ok()).toBeTruthy()
    }

    /**
     * Check for API success response for a eval deleted
     */
    async checkEvalDeleteResponse(){
        const response = await this.page.waitForResponse(resp => resp.url().includes('api/protected') && resp.request().method() === 'DELETE')
        expect.soft(response.ok()).toBeTruthy()
    }

    /**
     * Editing a created evaluator to check for Enable in production
     */
    async editingCreatedEval(){
        await this.creatingLLMEvaluator()
        await this.getAutomationEvalRow.click()
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.answerFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.enableInProdButton.click()
        await this.commitButton.click()
        await this.deployingEval()
        await this.backButton.click()
        await expect.soft(this.getAutomationEvalRow.locator(this.enabledStatusOfEvaluator)).toHaveText(this.enabledEval)
        await this.deletingMetric()
    }

    /**
     * Deploying a evaluator
     */
    async deployingEval(){
        await expect.soft(this.commitMessageTextArea).toBeVisible()
        await this.commitMessageTextArea.fill(this.commmitMessage)
        await expect.soft(this.deployThisVersionCheckbox).toBeChecked()
        await expect.soft(this.commitAndDeployButton).toBeVisible()
        await this.commitAndDeployButton.click()
        await expect.soft(this.page.getByText(this.metricUpdateMessage)).toBeVisible()
    }

    /**
     * Checking for commit button visibility
     */
    async checkingForCommitButton() {
        await this.creatingLLMEvaluator()
        await this.getAutomationEvalRow.click()
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.answerFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.commitButton.click()
        await this.commitMessageTextArea.fill(this.commmitMessage)
        await this.deployThisVersionCheckbox.uncheck()
        await expect.soft(this.commitButtonAtDeployTime).toBeVisible()
        await this.commitButtonAtDeployTime.click()
        await this.backButton.click()
        await this.deletingMetric()
    }

    /**
     * Creating a categorical human evaluator
     */
    async creatingCategoricalHumanEvaluator(){
        await this.createNewEvalButton.click()
        await this.customHumanEvaluator.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.returnTypeDropdown.click()
        await this.categoricalReturnType.click()
        await this.categoryPredDefValue1.fill(this.categoryValue1)
        await this.categoryPreDefValue2.fill(this.categoryValue2)
        await this.categoryPreDefValue3.fill(this.categoryValue3)
        await Promise.all([this.checkEvalSuccessResponse(), this.createMetricButton.click()])
        await expect.soft(this.page.getByText(this.evalCreatedSuccess)).toBeVisible()
        await expect.soft(this.metricCreatedIcon).toBeVisible()
        await this.backButton.click()
    }
}