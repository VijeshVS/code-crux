export interface CodeStep {
  lineNumbers: [number, number]
  code: string
  explanation: string
}

export interface OptimizationSuggestion {
  title: string
  description: string
  currentCode: string
  suggestedCode: string
  improvement: string
}

export interface CodeAnalysis {
  topic: string
  category: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  steps: CodeStep[]
  optimizations: OptimizationSuggestion[]
}

