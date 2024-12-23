'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeEditor } from '@/components/code-editor'
import { ComplexityAnalysis } from '@/components/complexity-analysis'
import { ComplexityPrediction } from '@/components/complexity-prediction'
import { PredictionPromptModal } from '@/components/prediction-prompt-modal'
import { MoonIcon, SunIcon } from 'lucide-react'
import type { Analysis, Prediction } from '@/types/analysis'
import Link from 'next/link'

export default function AnalyzerPage() {
  const [code, setCode] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState('code')
  const [showPredictionPrompt, setShowPredictionPrompt] = useState(false)

  const performAnalysis = () => {
    // Mock analysis - in a real implementation, this would be more sophisticated
    setAnalysis({
      steps: [
        {
          code: 'for (let i = 0; i < n; i++)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          explanation: 'Simple loop iterating through array once'
        },
        {
          code: '  for (let j = i + 1; j < n; j++)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          explanation: 'Nested loop creating quadratic time complexity'
        }
      ],
      finalTimeComplexity: 'O(n²)',
      finalSpaceComplexity: 'O(1)',
      finalExplanation: 'The nested loops result in quadratic time complexity, while only constant extra space is used.'
    })
    setActiveTab('analysis')
  }

  const analyzeCode = () => {
    if (!analysis) {
      setShowPredictionPrompt(true)
    } else {
      performAnalysis()
    }
  }

  const handlePrediction = (prediction: Prediction) => {
    // Handle the user's prediction
    console.log('User prediction:', prediction)
  }

  const handlePredictClick = () => {
    setShowPredictionPrompt(false)
    setActiveTab('predict')
  }

  const handleSkipPrediction = () => {
    setShowPredictionPrompt(false)
    performAnalysis()
  }

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors ${isDark ? 'dark' : ''}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Advanced Complexity Analyzer</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="predict">Predict</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <div className="space-y-4">
              <CodeEditor value={code} onChange={setCode} />
              <Button 
                onClick={analyzeCode}
                disabled={!code.trim()}
                className="w-full md:w-auto"
              >
                Analyze Code
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="predict">
            <ComplexityPrediction
              onSubmit={handlePrediction}
              actualComplexity={analysis ? {
                time: analysis.finalTimeComplexity,
                space: analysis.finalSpaceComplexity
              } : null}
            />
          </TabsContent>

          <TabsContent value="analysis">
            {analysis ? (
              <ComplexityAnalysis analysis={analysis} />
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Analyze your code to see the detailed complexity breakdown
              </div>
            )}
          </TabsContent>
        </Tabs>

        <PredictionPromptModal
          isOpen={showPredictionPrompt}
          onClose={() => setShowPredictionPrompt(false)}
          onPredict={handlePredictClick}
          onSkip={handleSkipPrediction}
        />
      </div>
    </div>
  )
}

