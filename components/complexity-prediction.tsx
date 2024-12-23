'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PredictionResult } from './prediction-result'
import type { Prediction } from '@/types/analysis'

interface ComplexityPredictionProps {
  onSubmit: (prediction: Prediction) => void
  actualComplexity: { time: string; space: string } | null
  setActiveTab: (tab: string) => void
}

export function ComplexityPrediction({ 
  onSubmit, 
  actualComplexity,
  setActiveTab
}: ComplexityPredictionProps) {
  const [prediction, setPrediction] = useState<Prediction>({
    timeComplexity: '',
    spaceComplexity: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    onSubmit(prediction)
    setSubmitted(true)
  }

  const handleReset = () => {
    setPrediction({ timeComplexity: '', spaceComplexity: '' })
    setSubmitted(false)
  }

  const handleViewAnalysis = () => {
    setActiveTab('analysis')
  }

  if (submitted && actualComplexity) {
    return (
      <PredictionResult
        isCorrect={
          prediction.timeComplexity.toLowerCase() === actualComplexity.time.toLowerCase() &&
          prediction.spaceComplexity.toLowerCase() === actualComplexity.space.toLowerCase()
        }
        prediction={{
          time: prediction.timeComplexity,
          space: prediction.spaceComplexity
        }}
        actual={actualComplexity}
        onViewAnalysis={handleViewAnalysis}
        onTryAgain={handleReset}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="timeComplexity">Time Complexity</Label>
          <Input
            id="timeComplexity"
            placeholder="e.g., O(n)"
            value={prediction.timeComplexity}
            onChange={(e) => setPrediction(prev => ({ ...prev, timeComplexity: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="spaceComplexity">Space Complexity</Label>
          <Input
            id="spaceComplexity"
            placeholder="e.g., O(1)"
            value={prediction.spaceComplexity}
            onChange={(e) => setPrediction(prev => ({ ...prev, spaceComplexity: e.target.value }))}
          />
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={!prediction.timeComplexity || !prediction.spaceComplexity}
      >
        Submit Prediction
      </Button>
    </div>
  )
}

