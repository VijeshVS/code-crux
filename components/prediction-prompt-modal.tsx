import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PredictionPromptModalProps {
  isOpen: boolean
  onClose: () => void
  onPredict: () => void
  onSkip: () => void
}

export function PredictionPromptModal({
  isOpen,
  onClose,
  onPredict,
  onSkip,
}: PredictionPromptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Would you like to make a prediction?</DialogTitle>
          <DialogDescription>
            Before seeing the analysis, you can try to predict the time and space complexity of your code. This can help you better understand algorithmic complexity.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:justify-start">
          <Button variant="default" onClick={onPredict}>
            Make Prediction
          </Button>
          <Button variant="secondary" onClick={onSkip}>
            Skip to Analysis
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

