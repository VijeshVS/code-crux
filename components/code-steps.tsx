import { CodeStep } from '@/types/analysis'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CodeStepsProps {
  steps: CodeStep[]
}

export function CodeSteps({ steps }: CodeStepsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step by Step Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Lines {step.lineNumbers[0]}-{step.lineNumbers[1]}
                  </span>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">{step.code}</code>
                </pre>
                <p className="text-sm text-muted-foreground">{step.explanation}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

