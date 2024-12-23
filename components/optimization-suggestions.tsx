import { OptimizationSuggestion } from '@/types/analysis'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

interface OptimizationSuggestionsProps {
  optimizations: OptimizationSuggestion[]
}

export function OptimizationSuggestions({ optimizations }: OptimizationSuggestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Optimization Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-8">
            {optimizations.map((optimization, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{optimization.title}</h3>
                  <p className="text-sm text-muted-foreground">{optimization.description}</p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Implementation:</p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">{optimization.currentCode}</code>
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Suggested Implementation:</p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code className="text-sm">{optimization.suggestedCode}</code>
                    </pre>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4" />
                  <span>Improvement: {optimization.improvement}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

