import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, GitCompare, Microscope } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Code Complexity Analyzer</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Analyze, compare, and understand the complexity of your code with detailed explanations.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <Button asChild className="group" variant="outline" size="lg">
            <Link href="/analyze" className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Microscope className="h-5 w-5" />
                <span>Analyze Code</span>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
          <Button asChild className="group" variant="outline" size="lg">
            <Link href="/compare" className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="h-5 w-5" />
                <span>Compare Code</span>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>
          <Button asChild className="group" variant="outline" size="lg">
            <Link href="/code-analyzer" className="flex items-center justify-between">
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

