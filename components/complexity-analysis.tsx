'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Clock, Box, ArrowRight } from 'lucide-react'
import type { Analysis } from '@/types/analysis'

interface AnalysisProps {
  analysis: Analysis
}

export function ComplexityAnalysis({ analysis }: AnalysisProps) {
  return (
    <div className="space-y-8">
      {/* Time Complexity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Complexity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {analysis.finalTimeComplexity}
              </h3>
              <p className="text-sm text-muted-foreground">Final Time Complexity</p>
            </div>
            <Separator />
            <div className="p-6 space-y-4">
              <h4 className="font-semibold">Step-by-Step Breakdown</h4>
              <div className="space-y-4">
                {analysis.steps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-muted p-2 rounded-md flex-1">
                        {step.code}
                      </div>
                      <ArrowRight className="h-4 w-4" />
                      <div className="font-mono font-bold">{step.timeComplexity}</div>
                    </div>
                    <p className="text-sm text-muted-foreground pl-4 border-l-2">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Space Complexity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            Space Complexity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {analysis.finalSpaceComplexity}
              </h3>
              <p className="text-sm text-muted-foreground">Final Space Complexity</p>
            </div>
            <Separator />
            <div className="p-6 space-y-4">
              <h4 className="font-semibold">Step-by-Step Breakdown</h4>
              <div className="space-y-4">
                {analysis.steps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-muted p-2 rounded-md flex-1">
                        {step.code}
                      </div>
                      <ArrowRight className="h-4 w-4" />
                      <div className="font-mono font-bold">{step.spaceComplexity}</div>
                    </div>
                    <p className="text-sm text-muted-foreground pl-4 border-l-2">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

