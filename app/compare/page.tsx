'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeEditor } from '@/components/code-editor'
import { ComplexityAnalysis } from '@/components/complexity-analysis'
import { ArrowRight, MoonIcon, SunIcon } from 'lucide-react'
import type { Analysis } from '@/types/analysis'
import Link from 'next/link'

export default function ComparisonPage() {
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [analysis1, setAnalysis1] = useState<Analysis | null>(null)
  const [analysis2, setAnalysis2] = useState<Analysis | null>(null)
  const [isDark, setIsDark] = useState(false)

  const compareCode = () => {
    // Mock analysis - in a real implementation, this would analyze both code snippets
    setAnalysis1({
      steps: [
        {
          code: 'for (let i = 0; i < n; i++)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          explanation: 'Simple iteration'
        }
      ],
      finalTimeComplexity: 'O(n)',
      finalSpaceComplexity: 'O(1)',
      finalExplanation: 'Linear time complexity with constant space'
    })

    setAnalysis2({
      steps: [
        {
          code: 'for (let i = 0; i < n; i++)\n  for (let j = 0; j < n; j++)',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          explanation: 'Nested iteration'
        }
      ],
      finalTimeComplexity: 'O(n²)',
      finalSpaceComplexity: 'O(1)',
      finalExplanation: 'Quadratic time complexity with constant space'
    })
  }

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors ${isDark ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Code Comparison</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Solution 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Solution 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeEditor value={code1} onChange={setCode1} height="300px" />
            </CardContent>
          </Card>

          {/* Solution 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Solution 2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeEditor value={code2} onChange={setCode2} height="300px" />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={compareCode}
            disabled={!code1.trim() || !code2.trim()}
            size="lg"
          >
            Compare Solutions
          </Button>
        </div>

        {analysis1 && analysis2 && (
          <div className="grid gap-6 md:grid-cols-2">
            <ComplexityAnalysis analysis={analysis1} />
            <ComplexityAnalysis analysis={analysis2} />
          </div>
        )}

        {analysis1 && analysis2 && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 justify-center text-lg">
                <span className="font-mono">{analysis1.finalTimeComplexity}</span>
                <ArrowRight className="h-5 w-5" />
                <span className="font-mono">{analysis2.finalTimeComplexity}</span>
              </div>
              <p className="mt-4 text-center text-muted-foreground">
                {analysis1.finalTimeComplexity < analysis2.finalTimeComplexity
                  ? "Solution 1 is more efficient in terms of time complexity"
                  : analysis2.finalTimeComplexity < analysis1.finalTimeComplexity
                  ? "Solution 2 is more efficient in terms of time complexity"
                  : "Both solutions have the same time complexity"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

