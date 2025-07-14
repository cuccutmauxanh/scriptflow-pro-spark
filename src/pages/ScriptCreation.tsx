import { useState } from "react"
import { Send, Upload, FileText, Video, Mic, X, Edit3, RotateCcw, Copy, Download, Check, FolderOpen, Link } from "lucide-react"
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
  tag: string
  color: string
  hoverColor: string
  isDone: boolean
  startTime?: string
  endTime?: string
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
  const [showReferenceLibrary, setShowReferenceLibrary] = useState(false)
  const [focusedSection, setFocusedSection] = useState<string | null>(null)
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

      // Generate sample script sections with tags and colors
      setScriptSections([
        {
          id: "hook",
          title: "Hook",
          content: "Did you know that 90% of people quit learning to code within the first month? But what if I told you there's a simple trick that changes everything?",
          tag: "#Hook",
          color: "bg-purple-500",
          hoverColor: "hover:bg-purple-200",
          isDone: false,
          startTime: "0:00",
          endTime: "0:15"
        },
        {
          id: "intro",
          title: "Introduction",
          content: "Hey everyone! I'm back with another coding tutorial, and today we're diving into something that completely transformed how I approach learning new technologies.",
          tag: "#Intro",
          color: "bg-blue-500",
          hoverColor: "hover:bg-blue-200",
          isDone: false,
          startTime: "0:15",
          endTime: "0:30"
        },
        {
          id: "body",
          title: "Main Content",
          content: "The secret isn't about studying more hours or finding the perfect course. It's about building projects that you actually care about. Here's exactly how to do it...",
          tag: "#Body",
          color: "bg-green-500",
          hoverColor: "hover:bg-green-200",
          isDone: false,
          startTime: "0:30",
          endTime: "2:45"
        },
        {
          id: "outro",
          title: "Conclusion",
          content: "So there you have it - the key to mastering any coding skill is building something you're passionate about. It keeps you motivated through the tough parts.",
          tag: "#Outro",
          color: "bg-red-500",
          hoverColor: "hover:bg-red-200",
          isDone: false,
          startTime: "2:45",
          endTime: "3:10"
        },
        {
          id: "cta",
          title: "Call to Action",
          content: "If this helped you, smash that like button and subscribe for more coding tips. What project are you going to build first? Let me know in the comments below!",
          tag: "#CTA",
          color: "bg-yellow-500",
          hoverColor: "hover:bg-yellow-200",
          isDone: false,
          startTime: "3:10",
          endTime: "3:30"
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

  const toggleSectionDone = (sectionId: string) => {
    setScriptSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isDone: !section.isDone }
        : section
    ))
  }

  const focusOnSection = (sectionId: string) => {
    setFocusedSection(sectionId)
    const section = scriptSections.find(s => s.id === sectionId)
    if (section) {
      setChatInput(`Editing: ${section.tag} - `)
    }
  }

  const exportScript = () => {
    const scriptText = scriptSections.map(section => 
      `${section.tag}\n${section.content}\n\n`
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

  const saveToMyScripts = () => {
    toast({
      title: "Script saved",
      description: "Your script has been saved to My Scripts",
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-text-primary">Create New Script</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReferenceLibrary(!showReferenceLibrary)}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Reference Library
            </Button>
          </div>

          {/* Reference Library Modal */}
          {showReferenceLibrary && (
            <Card className="mb-4 bg-surface border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Reference Files & Links
                  <Button variant="ghost" size="sm" onClick={() => setShowReferenceLibrary(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {uploadedFiles.length === 0 ? (
                  <p className="text-text-secondary text-sm">No files uploaded yet</p>
                ) : (
                  uploadedFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between bg-background rounded p-2">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-text-secondary">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                )}
                <div className="border-t pt-2 mt-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Files/Links
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          )}
          
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

        {/* Current Context Display */}
        {focusedSection && (
          <div className="p-4 border-b border-border bg-accent/20">
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${scriptSections.find(s => s.id === focusedSection)?.color}`}></div>
              <span className={`text-xs font-mono px-2 py-1 rounded ${scriptSections.find(s => s.id === focusedSection)?.color} text-white`}>
                {scriptSections.find(s => s.id === focusedSection)?.tag}
              </span>
              <span className="text-sm font-medium">Đang chỉnh sửa chi tiết</span>
              <Button variant="ghost" size="sm" onClick={() => setFocusedSection(null)}>
                <X className="w-3 h-3" />
              </Button>
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
            <Button variant="outline" size="sm" onClick={saveToMyScripts}>
              Save Script
            </Button>
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
                <Card 
                  key={section.id} 
                  className={`bg-surface border-border transition-all cursor-pointer ${
                    section.isDone ? 'opacity-60' : ''
                  } ${focusedSection === section.id ? `border-2 ${section.color.replace('bg-', 'border-')}` : ''} ${section.hoverColor}`}
                  onClick={() => focusOnSection(section.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-text-primary flex items-center">
                        <div className={`w-6 h-6 rounded-full ${section.color} flex items-center justify-center mr-3 text-white text-xs font-bold`}>
                          {section.isDone ? <Check className="w-3 h-3" /> : index + 1}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`text-xs font-mono px-2 py-1 rounded ${section.color} text-white`}>
                            {section.tag}
                          </span>
                          <span>{section.title}</span>
                          {section.startTime && section.endTime && (
                            <Badge variant="secondary" className="text-xs">
                              {section.startTime} - {section.endTime}
                            </Badge>
                          )}
                        </div>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => focusOnSection(section.id)}
                          className={focusedSection === section.id ? 'bg-primary text-primary-foreground' : ''}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
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
                        <Button
                          variant={section.isDone ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSectionDone(section.id)}
                        >
                          <Check className="w-4 h-4" />
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
                        className={`text-text-primary leading-relaxed cursor-pointer hover:bg-accent/50 rounded p-2 -m-2 transition-colors ${
                          section.isDone ? 'line-through opacity-70' : ''
                        }`}
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