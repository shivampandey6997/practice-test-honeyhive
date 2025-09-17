import {Locator, Page, expect} from '@playwright/test'
import { ProjectPage } from '../Projectpage/ProjectPage'
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
        readonly evalCreatedSuccess = 'Metric Created Successfully!',
        readonly evalDeleted = 'AutomationEval was deleted ',
        readonly noEvalName = 'Metric name cannot be empty',
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
        readonly backButton = page.locator('//button//img[@alt="Back"]'),
        readonly deleteMetric = page.locator("//img[@alt='Trash']"),
        readonly conifrmMetricDelete = page.locator("//button[text()='Confirm']"),
        readonly getAutomationEvalRow = page.locator("//tr[.//div[text()='AutomationEval']]"),
        readonly compositeMinimumAggregateFunction = page.locator("//input[@id='minimum' and @type='radio']"),
        readonly pythonEvalsInComposite = page.locator("//img[@alt='Python Evaluators']"),
        readonly llmEvalsInComposite = page.locator("//img[@alt='LLM Evaluators']"),
        readonly checkboxInCompositeEval = page.locator("#checkbox")
    )
    {
        super(page)
    }

    async evaluatorSection(){
        await this.evaluatorSectionLocator.click()
        await this.page.waitForLoadState('networkidle')
        expect.soft(this.page).toHaveURL(/.*metrics.*/)
    }

    async humanEvaluatorVisible(){
        expect(this.preDefinedHumanEvaluator).toHaveText(['Comments', 'Rating'])
    }

    async differentEvaluatorsVisibility(){
        expect.soft(this.pythonEvaluatorTab).toBeVisible()
        expect.soft(this.llmEvaluatorTab).toBeVisible()
        expect.soft(this.humanEvaluatorTab).toBeVisible()
        expect.soft(this.compositeEvaluatorTab).toBeVisible()
    }

    async noMetricOnFirstLogin(){
        await this.pythonEvaluatorTab.click()
        expect.soft(this.noMetricFound).toHaveText('No metrics found')
        await this.llmEvaluatorTab.click()
        expect.soft(this.noMetricFound).toHaveText('No metrics found')
        await this.compositeEvaluatorTab.click()
        expect.soft(this.noMetricFound).toHaveText('No metrics found')
    }

    async creatingPythonEvaluator(){
        await this.createNewEvalButton.click()
        await this.customPythonMetric.click()
        expect.soft(this.metricName).toHaveValue(this.existingPythonEvalName)
        expect.soft(this.metricDescription).toHaveText(this.existingPythonEvalDescription)
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.responseLengthPythonTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await this.createMetricButton.click()
        expect.soft(this.page.getByText(this.evalCreatedSuccess))
        await this.page.waitForTimeout(2000)
        await this.backButton.click()
    }
    
    async creatingLLMEvaluator(){
        await this.createNewEvalButton.click()
        await this.customLLMMetric.click()
        expect.soft(this.metricName).toHaveValue(this.existingLLMEvalName)
        expect.soft(this.metricDescription).toHaveText(this.existingLLMEvalDescription)
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.summaryFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await this.createMetricButton.click()
        expect.soft(this.page.getByText(this.evalCreatedSuccess))
        await this.page.waitForTimeout(2000)
        await this.backButton.click()
    }

    async creatingHumanEvaluator(){
        await this.createNewEvalButton.click()
        await this.customHumanEvaluator.click()
        expect.soft(this.metricName).toHaveValue(this.existingHumanEvalName)
        await this.metricName.fill(this.dummyEvalName)
        await this.consoleWindowOfEval.click()
        expect.soft(this.metricEvalCriteria).toHaveValue(this.existingHumanEvalEvaluationCriteria)
        await this.metricEvalCriteria.fill(this.dummyEvalDescription)
        await this.createMetricButton.click()
        expect.soft(this.page.getByText(this.evalCreatedSuccess))
        await this.page.waitForTimeout(2000)
        await this.backButton.click()
        const deleteButton = this.getAutomationEvalRow.locator("//img[@alt='Trash']")
        deleteButton.click()
        await this.conifrmMetricDelete.first().click()
        expect.soft(this.page.getByText(this.evalDeleted))
    }

    async deletingMetric(){
        await this.deleteMetric.click()
        await this.conifrmMetricDelete.click()
        expect.soft(this.page.getByText(this.evalDeleted))
    }

    async creatingCompositeEvaluator(){
        await this.creatingPythonEvaluator()
        await this.creatingLLMEvaluator()
        await this.page.waitForTimeout(2000)
        await this.createNewEvalButton.click()
        await this.customCompositeEvaluator.click()
        expect.soft(this.metricName).toHaveValue(this.existingCompositeEvalName)
        await this.metricName.fill(this.dummyEvalName)
        await this.metricDescription.fill(this.dummyEvalDescription)
        await this.consoleWindowOfEval.click()
        expect.soft(this.compositeMinimumAggregateFunction).toBeChecked()
        expect.soft(this.pythonEvalsInComposite).toBeVisible()
        await this.checkboxInCompositeEval.click()
        this.llmEvalsInComposite.click()
        await this.checkboxInCompositeEval.click()
        await this.createMetricButton.click()
        expect.soft(this.page.getByText(this.evalCreatedSuccess))
        await this.page.waitForTimeout(2000)
        await this.backButton.click()
        await this.deletingMetric()
        await this.pythonEvaluatorTab.click()
        await this.deletingMetric()
        await this.llmEvaluatorTab.click()
        await this.deletingMetric()
    }

    async evalWithoutName(){
        await this.createNewEvalButton.click()
        await this.customLLMMetric.click()
        await this.consoleWindowOfEval.click()
        await this.evaluatorTemplateDropdown.click()
        await this.summaryFaithfulnessLLMTemplate.click()
        await this.setupWindowOfEval.click()
        await this.metricName.clear()
        await this.createMetricButton.click()
        expect.soft(this.page.getByText(this.noEvalName))
    }

    async evalEnable_Disable(){
        await this.creatingLLMEvaluator()
        
    }
}