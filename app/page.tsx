import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Microscope } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Code Complexity Analyzer</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Analyze, compare, and understand the complexity of your code with detailed explanations.
        </p>
        <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
          <Button asChild className="group flex items-center justify-between gap-2" variant="outline" size="lg">
            <Link href="/analyze" className="w-full flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Microscope className="h-5 w-5" />
                <span>Code Complexity</span>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
          <Button asChild className="group flex items-center justify-between gap-2" variant="outline" size="lg">
            <Link href="/code-analyzer" className="w-full flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                <span>Code Analyzer</span>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
