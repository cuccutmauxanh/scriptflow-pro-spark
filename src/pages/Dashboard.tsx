import { useState } from "react"
import { Plus, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScriptCard } from "@/components/script-card"
import { DashboardFilters } from "@/components/dashboard-filters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockScripts = [
  {
    id: "1",
    title: "Complete Guide to React Hooks",
    platform: "YouTube",
    style: "Tutorial",
    status: "final" as const,
    lastEdited: "2 hours ago",
    wordCount: 1250
  },
  {
    id: "2", 
    title: "10 AI Tools That Will Change Your Life",
    platform: "TikTok",
    style: "Review",
    status: "draft" as const,
    lastEdited: "1 day ago",
    wordCount: 850
  },
  {
    id: "3",
    title: "My Morning Routine as a Developer",
    platform: "Instagram",
    style: "Vlog",
    status: "exported" as const,
    lastEdited: "3 days ago",
    wordCount: 920
  },
  {
    id: "4",
    title: "Why TypeScript is Better Than JavaScript",
    platform: "YouTube",
    style: "Educational",
    status: "final" as const,
    lastEdited: "1 week ago",
    wordCount: 1680
  },
  {
    id: "5",
    title: "Quick CSS Tips for Beginners",
    platform: "TikTok",
    style: "Tutorial",
    status: "draft" as const,
    lastEdited: "2 weeks ago",
    wordCount: 650
  },
  {
    id: "6",
    title: "Building My Dream Setup",
    platform: "YouTube",
    style: "Story",
    status: "exported" as const,
    lastEdited: "1 month ago",
    wordCount: 1350
  }
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState("All Platforms")
  const [styleFilter, setStyleFilter] = useState("All Styles")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const { toast } = useToast()

  const filteredScripts = mockScripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = platformFilter === "All Platforms" || script.platform === platformFilter
    const matchesStyle = styleFilter === "All Styles" || script.style === styleFilter
    const matchesStatus = statusFilter === "All Status" || 
      script.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesPlatform && matchesStyle && matchesStatus
  })

  const handleScriptAction = (action: string, id: string) => {
    toast({
      title: `Script ${action}`,
      description: `Script with ID ${id} has been ${action.toLowerCase()}.`,
    })
  }

  const stats = {
    totalScripts: mockScripts.length,
    mostUsedPlatform: "YouTube",
    lastGenerated: "Complete Guide to React Hooks"
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Script Dashboard</h1>
          <p className="text-text-secondary">Manage your AI-generated scripts and start new projects</p>
        </div>
        
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft h-11 px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Script
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-surface border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-text-secondary text-sm font-medium">Total Scripts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.totalScripts}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-text-secondary text-sm font-medium">Most Used Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.mostUsedPlatform}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-text-secondary text-sm font-medium">Last Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium text-text-primary truncate">{stats.lastGenerated}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <DashboardFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        platformFilter={platformFilter}
        onPlatformChange={setPlatformFilter}
        styleFilter={styleFilter}
        onStyleChange={setStyleFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Scripts Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            Your Scripts ({filteredScripts.length})
          </h2>
        </div>

        {filteredScripts.length === 0 ? (
          <Card className="bg-surface border-border">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">No scripts found</h3>
              <p className="text-text-secondary mb-6">
                {searchQuery || platformFilter !== "All Platforms" || styleFilter !== "All Styles" || statusFilter !== "All Status"
                  ? "Try adjusting your filters to see more results."
                  : "Get started by creating your first AI-generated script."
                }
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create First Script
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredScripts.map((script) => (
              <ScriptCard
                key={script.id}
                script={script}
                onOpen={(id) => handleScriptAction("opened", id)}
                onRename={(id) => handleScriptAction("renamed", id)}
                onDuplicate={(id) => handleScriptAction("duplicated", id)}
                onDelete={(id) => handleScriptAction("deleted", id)}
                onExport={(id) => handleScriptAction("exported", id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}