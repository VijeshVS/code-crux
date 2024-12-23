import { Badge } from '@/components/ui/badge'
import { Binary, TreePine, Network, Boxes, GitGraph, Table2, Hash } from 'lucide-react'

const topicIcons = {
  'binary-search': Binary,
  'tree': TreePine,
  'graph': Network,
  'dynamic-programming': Boxes,
  'recursion': GitGraph,
  'array': Table2,
  'hash-table': Hash,
} as const

interface TopicBadgeProps {
  topic: string
  category: string
}

export function TopicBadge({ topic, category }: TopicBadgeProps) {
  const Icon = topicIcons[topic as keyof typeof topicIcons] || Binary

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {topic}
      </Badge>
      <Badge variant="outline">
        {category}
      </Badge>
    </div>
  )
}

