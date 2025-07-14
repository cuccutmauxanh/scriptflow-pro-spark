import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DashboardFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  platformFilter: string
  onPlatformChange: (platform: string) => void
  styleFilter: string
  onStyleChange: (style: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
}

const platforms = [
  "All Platforms",
  "YouTube",
  "TikTok",
  "Instagram",
  "Twitter",
  "Reels"
]

const styles = [
  "All Styles",
  "Tutorial",
  "Review",
  "Vlog",
  "Story",
  "Educational",
  "Entertainment",
  "Promotional"
]

const statuses = [
  "All Status",
  "Draft",
  "Final",
  "Exported"
]

export function DashboardFilters({
  searchQuery,
  onSearchChange,
  platformFilter,
  onPlatformChange,
  styleFilter,
  onStyleChange,
  statusFilter,
  onStatusChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
        <Input
          placeholder="Search scripts by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-surface border-border text-text-primary placeholder:text-text-muted focus:ring-primary h-11"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-3">
        <Select value={platformFilter} onValueChange={onPlatformChange}>
          <SelectTrigger className="w-auto min-w-[140px] bg-surface border-border text-text-primary h-10">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            {platforms.map((platform) => (
              <SelectItem 
                key={platform} 
                value={platform}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              >
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={styleFilter} onValueChange={onStyleChange}>
          <SelectTrigger className="w-auto min-w-[120px] bg-surface border-border text-text-primary h-10">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            {styles.map((style) => (
              <SelectItem 
                key={style} 
                value={style}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              >
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-auto min-w-[120px] bg-surface border-border text-text-primary h-10">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-surface border-border">
            {statuses.map((status) => (
              <SelectItem 
                key={status} 
                value={status}
                className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              >
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="ghost" 
          className="text-text-muted hover:text-text-primary hover:bg-surface-hover h-10"
        >
          <Filter className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  )
}