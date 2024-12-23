import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Box, ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"

interface PredictionResultProps {
  isCorrect: boolean
  prediction: {
    time: string
    space: string
  }
  actual: {
    time: string
    space: string
  }
  onViewAnalysis: () => void
  onTryAgain: () => void
}

export function PredictionResult({
  isCorrect,
  prediction,
  actual,
  onViewAnalysis,
  onTryAgain
}: PredictionResultProps) {
  const timeCorrect = prediction.time.toLowerCase() === actual.time.toLowerCase()
  const spaceCorrect = prediction.space.toLowerCase() === actual.space.toLowerCase()

  return (
    <div className="space-y-6">
      <Card className={cn(
        "border-2",
        isCorrect ? "border-green-500" : "border-destructive"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-green-500">Excellent! Your prediction is correct!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-destructive">Not quite right. Let's understand why:</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Complexity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <h3 className="font-semibold">Time Complexity</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Your Prediction</p>
                <div className={cn(
                  "p-2 rounded-md font-mono text-sm",
                  timeCorrect ? "bg-green-500/10" : "bg-destructive/10"
                )}>
                  {prediction.time}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Actual</p>
                <div className="p-2 rounded-md font-mono text-sm bg-muted">
                  {actual.time}
                </div>
              </div>
            </div>
            {!timeCorrect && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  The time complexity is {actual.time} because the algorithm requires nested iterations,
                  resulting in a quadratic time complexity pattern.
                </p>
              </div>
            )}
          </div>

          {/* Space Complexity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4" />
              <h3 className="font-semibold">Space Complexity</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Your Prediction</p>
                <div className={cn(
                  "p-2 rounded-md font-mono text-sm",
                  spaceCorrect ? "bg-green-500/10" : "bg-destructive/10"
                )}>
                  {prediction.space}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm text-muted-foreground">Actual</p>
                <div className="p-2 rounded-md font-mono text-sm bg-muted">
                  {actual.space}
                </div>
              </div>
            </div>
            {!spaceCorrect && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  The space complexity is {actual.space} because the algorithm only uses a constant
                  amount of extra space regardless of input size.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          onClick={onTryAgain}
          className="flex-1"
        >
          Try Another Prediction
        </Button>
        <Button 
          onClick={onViewAnalysis}
          className="flex-1"
        >
          View Detailed Analysis
        </Button>
      </div>
    </div>
  )
}

