import { MoreHorizontal, Play, Calendar, Youtube, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Script {
  id: string
  title: string
  platform: string
  style: string
  status: 'draft' | 'final' | 'exported'
  lastEdited: string
  wordCount?: number
}

interface ScriptCardProps {
  script: Script
  onOpen: (id: string) => void
  onRename: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onExport: (id: string) => void
}

const platformIcons = {
  YouTube: Youtube,
  TikTok: Instagram,
  Instagram: Instagram,
  Twitter: Twitter,
  Reels: Instagram,
}

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  final: "bg-primary/20 text-primary",
  exported: "bg-green-500/20 text-green-400"
}

export function ScriptCard({ 
  script, 
  onOpen, 
  onRename, 
  onDuplicate, 
  onDelete, 
  onExport 
}: ScriptCardProps) {
  const PlatformIcon = platformIcons[script.platform as keyof typeof platformIcons] || Youtube

  return (
    <Card className="bg-surface border-border hover:bg-surface-hover transition-smooth group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-text-primary font-medium text-lg truncate group-hover:text-text-primary">
              {script.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 text-text-muted text-sm">
                <PlatformIcon className="w-4 h-4" />
                <span>{script.platform}</span>
              </div>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted text-sm">{script.style}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-text-primary"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-surface border-border">
              <DropdownMenuItem 
                onClick={() => onRename(script.id)}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDuplicate(script.id)}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onExport(script.id)}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              >
                Export
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(script.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={cn("text-xs", statusColors[script.status])}>
              {script.status.charAt(0).toUpperCase() + script.status.slice(1)}
            </Badge>
            {script.wordCount && (
              <span className="text-text-muted text-xs">
                {script.wordCount} words
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-text-muted text-xs">
              <Calendar className="w-3 h-3" />
              <span>{script.lastEdited}</span>
            </div>
            
            <Button 
              onClick={() => onOpen(script.id)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-sm"
            >
              <Play className="w-3 h-3 mr-1" />
              Open
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}