import { useState } from "react"
import { Send, Upload, FileText, Video, Mic, X, Edit3, RotateCcw, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface UploadedFile {
  id: string
  name: string
  type: 'pdf' | 'video' | 'audio' | 'document'
  size: string
}

interface ScriptSection {
  id: string
  title: string
  content: string
}

export default function ScriptCreation() {
  const [projectTitle, setProjectTitle] = useState("")
  const [platform, setPlatform] = useState("")
  const [format, setFormat] = useState("")
  const [tone, setTone] = useState("")
  const [duration, setDuration] = useState("")
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [scriptSections, setScriptSections] = useState<ScriptSection[]>([])
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'll help you create that script. Let me generate some content based on your requirements...",
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiMessage])

      // Generate sample script sections
      setScriptSections([
        {
          id: "hook",
          title: "Hook",
          content: "Did you know that 90% of people quit learning to code within the first month? But what if I told you there's a simple trick that changes everything?"
        },
        {
          id: "intro",
          title: "Introduction",
          content: "Hey everyone! I'm back with another coding tutorial, and today we're diving into something that completely transformed how I approach learning new technologies."
        },
        {
          id: "body",
          title: "Main Content",
          content: "The secret isn't about studying more hours or finding the perfect course. It's about building projects that you actually care about. Here's exactly how to do it..."
        },
        {
          id: "outro",
          title: "Conclusion & CTA",
          content: "If this helped you, smash that like button and subscribe for more coding tips. What project are you going to build first? Let me know in the comments below!"
        }
      ])
    }, 1500)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.includes('pdf') ? 'pdf' : 
                file.type.includes('video') ? 'video' : 
                file.type.includes('audio') ? 'audio' : 'document',
          size: (file.size / 1024).toFixed(1) + ' KB'
        }
        setUploadedFiles(prev => [...prev, uploadedFile])
      })
      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) added to your project`,
      })
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const regenerateSection = (sectionId: string) => {
    toast({
      title: "Regenerating section",
      description: "AI is creating new content for this section...",
    })
    
    setTimeout(() => {
      setScriptSections(prev => prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: section.content + " [Updated with AI refinements]" }
          : section
      ))
    }, 1000)
  }

  const exportScript = () => {
    const scriptText = scriptSections.map(section => 
      `${section.title.toUpperCase()}\n${section.content}\n\n`
    ).join('')
    
    const blob = new Blob([scriptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectTitle || 'script'}.txt`
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Script exported",
      description: "Your script has been downloaded as a text file",
    })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      case 'audio': return <Mic className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Chat & Settings */}
      <div className="w-1/2 border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Create New Script</h1>
          
          {/* Project Info */}
          <div className="space-y-4">
            <Input
              placeholder="Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="bg-surface border-border"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="vlog">Vlog</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue placeholder="Tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="funny">Funny</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-surface border-border">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60s">60 seconds</SelectItem>
                  <SelectItem value="3min">3 minutes</SelectItem>
                  <SelectItem value="5min">5 minutes</SelectItem>
                  <SelectItem value="10min">10+ minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-text-secondary mb-3">Uploaded Files</h3>
            <div className="space-y-2">
              {uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between bg-surface rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium text-text-primary">{file.name}</p>
                      <p className="text-xs text-text-secondary">{file.size}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map(message => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-surface border border-border'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2 mb-3">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </label>
          </div>
          
          <div className="flex space-x-2">
            <Textarea
              placeholder="Describe your script idea or ask for changes..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              className="flex-1 min-h-[60px] bg-surface border-border resize-none"
            />
            <Button onClick={handleSendMessage} className="self-end">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Generated Script */}
      <div className="w-1/2 flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Generated Script</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={exportScript}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {scriptSections.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">No script generated yet</h3>
              <p className="text-text-secondary">
                Start by describing your script idea in the chat on the left.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {scriptSections.map((section, index) => (
                <Card key={section.id} className="bg-surface border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-text-primary flex items-center">
                        <Badge variant="outline" className="mr-3 w-8 h-8 rounded-full p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        {section.title}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => regenerateSection(section.id)}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(section.content)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingSection === section.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={section.content}
                          onChange={(e) => setScriptSections(prev => prev.map(s => 
                            s.id === section.id ? { ...s, content: e.target.value } : s
                          ))}
                          className="min-h-[100px] bg-background border-border"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSection(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => setEditingSection(null)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="text-text-primary leading-relaxed cursor-pointer hover:bg-accent/50 rounded p-2 -m-2 transition-colors"
                        onClick={() => setEditingSection(section.id)}
                      >
                        {section.content}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}