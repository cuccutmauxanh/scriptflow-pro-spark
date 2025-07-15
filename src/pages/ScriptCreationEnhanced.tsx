import { useState } from "react";
import {
  Send,
  Upload,
  FileText,
  Video,
  Mic,
  X,
  Edit3,
  RotateCcw,
  Copy,
  Download,
  Check,
  FolderOpen,
  Link,
  History,
  Users2,
  Bot,
  BookOpen,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layout } from "@/components/layout";
import { ExportManager } from "@/components/export-manager";
import { VersionHistory } from "@/components/version-history";
import { RAGAssistant } from "@/components/rag-assistant";
import { ReferenceLibrary } from "@/components/reference-library";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "video" | "audio" | "document";
  size: string;
}

interface ScriptSection {
  id: string;
  title: string;
  content: string;
  tag: string;
  color: string;
  hoverColor: string;
  isDone: boolean;
  startTime?: string;
  endTime?: string;
  collaborators?: string[];
  lastEditedBy?: string;
  lastEditedAt?: Date;
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  currentSection?: string;
}

export default function ScriptCreationEnhanced() {
  const [projectTitle, setProjectTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [format, setFormat] = useState("");
  const [tone, setTone] = useState("");
  const [duration, setDuration] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [scriptSections, setScriptSections] = useState<ScriptSection[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showReferenceLibrary, setShowReferenceLibrary] = useState(false);
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [showMetadataEdit, setShowMetadataEdit] = useState(false);
  const [isProjectCreated, setIsProjectCreated] = useState(false);
  const [showOldProjects, setShowOldProjects] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showCollabDialog, setShowCollabDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [collaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "",
      isOnline: true,
      currentSection: "intro",
    },
    { id: "2", name: "Mike Chen", avatar: "", isOnline: true },
    { id: "3", name: "Emma Davis", avatar: "", isOnline: false },
  ]);

  const [oldProjects] = useState([
    {
      id: "project-1",
      title: "How to Learn JavaScript Fast",
      platform: "YouTube",
      format: "Tutorial",
      createdAt: "2024-01-15",
      sections: [
        {
          id: "hook",
          title: "Hook",
          content: "Did you know 90% of developers started with JavaScript?",
          tag: "#Hook",
          color: "bg-purple-500",
        },
        {
          id: "intro",
          title: "Introduction",
          content:
            "Today I'll show you the fastest way to master JavaScript...",
          tag: "#Intro",
          color: "bg-blue-500",
        },
      ],
    },
    {
      id: "project-2",
      title: "React vs Vue: Which to Choose?",
      platform: "TikTok",
      format: "Comparison",
      createdAt: "2024-01-10",
      sections: [
        {
          id: "hook",
          title: "Hook",
          content: "React or Vue? This debate ends today.",
          tag: "#Hook",
          color: "bg-purple-500",
        },
        {
          id: "body",
          title: "Main Content",
          content: "Let me break down the key differences...",
          tag: "#Body",
          color: "bg-green-500",
        },
      ],
    },
  ]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'll help you create that script. Let me generate some content based on your requirements...",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);

      // Mark project as created
      setIsProjectCreated(true);

      // Generate sample script sections with enhanced data
      setScriptSections([
        {
          id: "hook",
          title: "Hook",
          content:
            "Did you know that 90% of people quit learning to code within the first month? But what if I told you there's a simple trick that changes everything?",
          tag: "#Hook",
          color: "bg-purple-500",
          hoverColor: "hover:bg-purple-200",
          isDone: false,
          startTime: "0:00",
          endTime: "0:15",
          collaborators: ["1"],
          lastEditedBy: "Sarah Johnson",
          lastEditedAt: new Date(Date.now() - 3600000),
        },
        {
          id: "intro",
          title: "Introduction",
          content:
            "Hey everyone! I'm back with another coding tutorial, and today we're diving into something that completely transformed how I approach learning new technologies.",
          tag: "#Intro",
          color: "bg-blue-500",
          hoverColor: "hover:bg-blue-200",
          isDone: false,
          startTime: "0:15",
          endTime: "0:30",
          lastEditedBy: "You",
          lastEditedAt: new Date(Date.now() - 1800000),
        },
        {
          id: "body",
          title: "Main Content",
          content:
            "The secret isn't about studying more hours or finding the perfect course. It's about building projects that you actually care about. Here's exactly how to do it...",
          tag: "#Body",
          color: "bg-green-500",
          hoverColor: "hover:bg-green-200",
          isDone: false,
          startTime: "0:30",
          endTime: "2:45",
          collaborators: ["2"],
          lastEditedBy: "Mike Chen",
          lastEditedAt: new Date(Date.now() - 900000),
        },
        {
          id: "outro",
          title: "Conclusion",
          content:
            "So there you have it - the key to mastering any coding skill is building something you're passionate about. It keeps you motivated through the tough parts.",
          tag: "#Outro",
          color: "bg-red-500",
          hoverColor: "hover:bg-red-200",
          isDone: false,
          startTime: "2:45",
          endTime: "3:10",
        },
        {
          id: "cta",
          title: "Call to Action",
          content:
            "If this helped you, smash that like button and subscribe for more coding tips. What project are you going to build first? Let me know in the comments below!",
          tag: "#CTA",
          color: "bg-yellow-500",
          hoverColor: "hover:bg-yellow-200",
          isDone: false,
          startTime: "3:10",
          endTime: "3:30",
        },
      ]);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const uploadedFile: UploadedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type.includes("pdf")
            ? "pdf"
            : file.type.includes("video")
              ? "video"
              : file.type.includes("audio")
                ? "audio"
                : "document",
          size: (file.size / 1024).toFixed(1) + " KB",
        };
        setUploadedFiles((prev) => [...prev, uploadedFile]);
      });
      toast({
        title: "Files uploaded",
        description: `${files.length} file(s) added to your project`,
      });
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const regenerateSection = (sectionId: string) => {
    toast({
      title: "Regenerating section",
      description: "AI is creating new content for this section...",
    });

    setTimeout(() => {
      setScriptSections((prev) =>
        prev.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content + " [Updated with AI refinements]",
                lastEditedBy: "AI Assistant",
                lastEditedAt: new Date(),
              }
            : section,
        ),
      );
    }, 1000);
  };

  const toggleSectionDone = (sectionId: string) => {
    setScriptSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              isDone: !section.isDone,
              lastEditedBy: "You",
              lastEditedAt: new Date(),
            }
          : section,
      ),
    );
  };

  const focusOnSection = (sectionId: string) => {
    setFocusedSection(sectionId);
    const section = scriptSections.find((s) => s.id === sectionId);
    if (section) {
      setChatInput("");
      const tagElement = `${section.tag}`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "user",
          content: `Editing ${tagElement} section`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const loadOldProject = (projectId: string) => {
    const project = oldProjects.find((p) => p.id === projectId);
    if (project) {
      setProjectTitle(project.title);
      setPlatform(project.platform);
      setFormat(project.format);
      setScriptSections(project.sections as ScriptSection[]);
      setIsProjectCreated(true);
      setShowOldProjects(false);
      toast({
        title: "Project loaded",
        description: `Loaded "${project.title}" for editing`,
      });
    }
  };

  const exportScript = () => {
    setShowExportDialog(true);
  };

  const saveToMyScripts = () => {
    toast({
      title: "Script saved",
      description: "Your script has been saved to My Scripts",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Mic className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getBorderColorFromBg = (bgColor: string) => {
    return bgColor.replace("bg-", "border-");
  };

  const getOnlineCollaborators = () => {
    return collaborators.filter((c) => c.isOnline);
  };

  const getCurrentSectionCollaborator = (sectionId: string) => {
    return collaborators.find((c) => c.currentSection === sectionId);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] animate-in fade-in duration-500">
        {/* Metadata Display Bar - Only show after project is created */}
        {isProjectCreated && (
          <div className="bg-surface border-b border-border p-3 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-text-primary">
                  {projectTitle || "Untitled Project"}
                </span>
                <div className="flex items-center space-x-2">
                  {platform && (
                    <Badge
                      variant="secondary"
                      className="text-xs animate-in zoom-in duration-300"
                    >
                      {platform}
                    </Badge>
                  )}
                  {format && (
                    <Badge
                      variant="secondary"
                      className="text-xs animate-in zoom-in duration-300 delay-100"
                    >
                      {format}
                    </Badge>
                  )}
                  {tone && (
                    <Badge
                      variant="secondary"
                      className="text-xs animate-in zoom-in duration-300 delay-200"
                    >
                      {tone}
                    </Badge>
                  )}
                  {duration && (
                    <Badge
                      variant="secondary"
                      className="text-xs animate-in zoom-in duration-300 delay-300"
                    >
                      {duration}
                    </Badge>
                  )}
                </div>

                {/* Collaborators */}
                <div className="flex items-center space-x-2 animate-in slide-in-from-left duration-500 delay-200">
                  <Users2 className="w-4 h-4 text-text-secondary" />
                  <div className="flex -space-x-2">
                    {getOnlineCollaborators()
                      .slice(0, 3)
                      .map((collab) => (
                        <div
                          key={collab.id}
                          className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs border-2 border-background hover:scale-110 transition-transform duration-200"
                        >
                          {collab.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                    {getOnlineCollaborators().length > 3 && (
                      <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs border-2 border-background">
                        +{getOnlineCollaborators().length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVersionHistory(true)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCollabDialog(true)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Users2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMetadataEdit(true)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Resizable Layout */}
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Chat & Settings */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-text-primary">
                    Create New Script
                  </h1>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowOldProjects(!showOldProjects)}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Open Project
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setShowReferenceLibrary(!showReferenceLibrary)
                      }
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Reference Library
                    </Button>
                  </div>
                </div>

                {/* Old Projects Modal */}
                {showOldProjects && (
                  <Card className="mb-4 bg-surface border-border animate-in slide-in-from-top duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        Previous Projects
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowOldProjects(false)}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {oldProjects.map((project, index) => (
                        <div
                          key={project.id}
                          className={`border rounded-lg p-3 bg-background hover:bg-accent/50 transition-colors duration-200 animate-in fade-in duration-300 delay-${index * 100}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-sm">
                                {project.title}
                              </h3>
                              <p className="text-xs text-text-secondary">
                                {project.platform} • {project.format}
                              </p>
                              <p className="text-xs text-text-secondary">
                                Created: {project.createdAt}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => loadOldProject(project.id)}
                              className="hover:scale-105 transition-transform duration-200"
                            >
                              <Edit3 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <div className="mt-2 flex space-x-1">
                            {project.sections.map((section) => (
                              <Badge
                                key={section.id}
                                className={`text-xs ${section.color} text-white`}
                              >
                                {section.tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Reference Library Modal */}
                {showReferenceLibrary && (
                  <Card className="mb-4 bg-surface border-border animate-in slide-in-from-top duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        Reference Files & Links
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowReferenceLibrary(false)}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {uploadedFiles.length === 0 ? (
                        <p className="text-text-secondary text-sm">
                          No files uploaded yet
                        </p>
                      ) : (
                        uploadedFiles.map((file, index) => (
                          <div
                            key={file.id}
                            className={`flex items-center justify-between bg-background rounded p-2 hover:bg-accent/50 transition-colors duration-200 animate-in fade-in duration-300 delay-${index * 50}`}
                          >
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file.type)}
                              <div>
                                <p className="text-sm font-medium">
                                  {file.name}
                                </p>
                                <p className="text-xs text-text-secondary">
                                  {file.size}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="hover:scale-110 transition-transform duration-200"
                            >
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full hover:scale-105 transition-transform duration-200"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Add Files/Links
                          </Button>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Project Info */}
                {(!isProjectCreated || showMetadataEdit) && (
                  <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
                    <Input
                      placeholder="Project Title"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="bg-surface border-border transition-all duration-300 focus:scale-[1.02]"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="bg-surface border-border transition-all duration-300 hover:border-primary/50">
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
                        <SelectTrigger className="bg-surface border-border transition-all duration-300 hover:border-primary/50">
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
                        <SelectTrigger className="bg-surface border-border transition-all duration-300 hover:border-primary/50">
                          <SelectValue placeholder="Tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                          <SelectItem value="funny">Funny</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger className="bg-surface border-border transition-all duration-300 hover:border-primary/50">
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

                    {showMetadataEdit && (
                      <div className="flex justify-end space-x-2 pt-2 animate-in fade-in duration-300">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowMetadataEdit(false)}
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setShowMetadataEdit(false)}
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* AI Assistant Tabs */}
              <div className="flex-1 flex flex-col">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="flex-1 flex flex-col"
                >
                  <TabsList className="grid w-full grid-cols-3 mx-6 mt-4">
                    <TabsTrigger
                      value="chat"
                      className="gap-2 transition-all duration-200 hover:scale-105"
                    >
                      <Bot className="w-4 h-4" />
                      AI Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="assistant"
                      className="gap-2 transition-all duration-200 hover:scale-105"
                    >
                      <Bot className="w-4 h-4" />
                      Smart Assistant
                    </TabsTrigger>
                    <TabsTrigger
                      value="library"
                      className="gap-2 transition-all duration-200 hover:scale-105"
                    >
                      <BookOpen className="w-4 h-4" />
                      Reference Library: RAG
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="chat"
                    className="flex-1 flex flex-col mt-0 animate-in fade-in duration-500"
                  >
                    {/* Current Context Display */}
                    {focusedSection && (
                      <div className="p-4 border-b border-border bg-accent/20 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded-full ${scriptSections.find((s) => s.id === focusedSection)?.color}`}
                          ></div>
                          <span
                            className={`text-xs font-mono px-2 py-1 rounded ${scriptSections.find((s) => s.id === focusedSection)?.color} text-white`}
                          >
                            {
                              scriptSections.find(
                                (s) => s.id === focusedSection,
                              )?.tag
                            }
                          </span>
                          <span className="text-sm font-medium">
                            Editing this section in detail
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFocusedSection(null)}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((message, index) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom duration-300 delay-${index * 50}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 transition-all duration-200 hover:scale-[1.01] ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface border border-border"
                            }`}
                          >
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 transition-transform duration-200"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        </label>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {focusedSection && (
                          <div className="flex items-center space-x-2 p-2 bg-accent/20 rounded animate-in slide-in-from-top duration-300">
                            <span
                              className={`text-xs font-mono px-2 py-1 rounded ${scriptSections.find((s) => s.id === focusedSection)?.color} text-white`}
                            >
                              {
                                scriptSections.find(
                                  (s) => s.id === focusedSection,
                                )?.tag
                              }
                            </span>
                            <span className="text-sm text-text-secondary">
                              Editing this section in detail
                            </span>
                          </div>
                        )}
                        <div className="flex space-x-2 relative">
                          <Textarea
                            placeholder={
                              focusedSection
                                ? "Enter editing request for this section..."
                                : "Describe your script idea or ask for changes..."
                            }
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              !e.shiftKey &&
                              (e.preventDefault(), handleSendMessage())
                            }
                            className="flex-1 min-h-[60px] bg-surface border-border resize-none transition-all duration-300 focus:scale-[1.01]"
                          />
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={handleSendMessage}
                              className="self-end hover:scale-105 transition-transform duration-200"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                            {/* Notification Bell */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-text-muted hover:text-primary hover:scale-110 transition-all duration-200"
                              title="New notifications"
                            >
                              <Bell className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Beta Feedback Line */}
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-text-muted text-center">
                          This feature is in beta.
                          <Button
                            variant="link"
                            className="text-xs p-0 h-auto ml-1 text-primary hover:underline hover:scale-105 transition-all duration-200"
                            onClick={() =>
                              toast({
                                title: "Feedback",
                                description:
                                  "Thank you for your interest! Feedback form will be available soon.",
                              })
                            }
                          >
                            Send feedback
                          </Button>
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="assistant"
                    className="flex-1 flex flex-col mt-0 p-4 animate-in fade-in duration-500"
                  >
                    <RAGAssistant />
                  </TabsContent>

                  <TabsContent
                    value="library"
                    className="flex-1 flex flex-col mt-0 animate-in fade-in duration-500"
                  >
                    <ReferenceLibrary />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ResizablePanel>

          {/* Resizable Handle */}
          <ResizableHandle withHandle />

          {/* Right Panel - Generated Script */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">
                  Generated Script
                </h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveToMyScripts}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Save Script
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportScript}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {scriptSections.length === 0 ? (
                  <div className="text-center py-12 animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Edit3 className="w-8 h-8 text-text-muted" />
                    </div>
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      No script generated yet
                    </h3>
                    <p className="text-text-secondary">
                      Start by describing your script idea in the chat on the
                      left.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {scriptSections.map((section, index) => {
                      const currentCollab = getCurrentSectionCollaborator(
                        section.id,
                      );

                      return (
                        <Card
                          key={section.id}
                          className={`bg-surface transition-all cursor-pointer border-2 hover:scale-[1.01] duration-300 animate-in slide-in-from-right delay-${index * 100} ${
                            section.isDone ? "opacity-60" : ""
                          } ${focusedSection === section.id ? getBorderColorFromBg(section.color) : "border-border"} hover:${getBorderColorFromBg(section.color)}/60`}
                          onClick={() => focusOnSection(section.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-text-primary flex items-center">
                                <div
                                  className={`w-6 h-6 rounded-full ${section.color} flex items-center justify-center mr-3 text-white text-xs font-bold transition-transform hover:scale-110 duration-200`}
                                >
                                  {section.isDone ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span
                                    className={`text-xs font-mono px-2 py-1 rounded ${section.color} text-white`}
                                  >
                                    {section.tag}
                                  </span>
                                  <span>{section.title}</span>
                                  {section.startTime && section.endTime && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {section.startTime} - {section.endTime}
                                    </Badge>
                                  )}
                                  {currentCollab && (
                                    <Badge className="bg-green-500/20 text-green-400 text-xs animate-pulse">
                                      {currentCollab.name} editing
                                    </Badge>
                                  )}
                                </div>
                              </CardTitle>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => focusOnSection(section.id)}
                                  className={`hover:scale-110 transition-transform duration-200 ${focusedSection === section.id ? "bg-primary text-primary-foreground" : ""}`}
                                >
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => regenerateSection(section.id)}
                                  className="hover:scale-110 transition-transform duration-200"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      section.content,
                                    )
                                  }
                                  className="hover:scale-110 transition-transform duration-200"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant={
                                    section.isDone ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => toggleSectionDone(section.id)}
                                  className="hover:scale-110 transition-transform duration-200"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            {/* Last edited info */}
                            {section.lastEditedBy && section.lastEditedAt && (
                              <div className="text-xs text-text-muted">
                                Last edited by {section.lastEditedBy} •{" "}
                                {section.lastEditedAt.toLocaleString()}
                              </div>
                            )}
                          </CardHeader>
                          <CardContent>
                            {editingSection === section.id ? (
                              <div className="space-y-3 animate-in fade-in duration-300">
                                <Textarea
                                  value={section.content}
                                  onChange={(e) =>
                                    setScriptSections((prev) =>
                                      prev.map((s) =>
                                        s.id === section.id
                                          ? { ...s, content: e.target.value }
                                          : s,
                                      ),
                                    )
                                  }
                                  className="min-h-[100px] bg-background border-border"
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingSection(null)}
                                    className="hover:scale-105 transition-transform duration-200"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => setEditingSection(null)}
                                    className="hover:scale-105 transition-transform duration-200"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`text-text-primary leading-relaxed cursor-pointer hover:bg-accent/50 rounded p-2 -m-2 transition-all duration-200 ${
                                  section.isDone
                                    ? "line-through opacity-70"
                                    : ""
                                }`}
                                onClick={() => setEditingSection(section.id)}
                              >
                                {section.content}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Export Dialog */}
        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto animate-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle>Export Script</DialogTitle>
            </DialogHeader>
            <ExportManager
              scriptId="current"
              scriptTitle={projectTitle || "Untitled Script"}
            />
          </DialogContent>
        </Dialog>

        {/* Version History Dialog */}
        <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto animate-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle>Version History</DialogTitle>
            </DialogHeader>
            <VersionHistory scriptId="current" />
          </DialogContent>
        </Dialog>

        {/* Collaboration Dialog */}
        <Dialog open={showCollabDialog} onOpenChange={setShowCollabDialog}>
          <DialogContent className="animate-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle>Share & Collaborate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Share Link</label>
                <div className="flex gap-2">
                  <Input
                    value="https://autoscriptor.pro/scripts/abc123"
                    readOnly
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Team Members</label>
                <div className="space-y-2">
                  {collaborators.map((collab) => (
                    <div
                      key={collab.id}
                      className="flex items-center justify-between p-2 border rounded hover:bg-accent/50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                          {collab.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm">{collab.name}</span>
                        {collab.isOnline && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Online
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline">Editor</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Enter email to invite..." />
                <Button className="hover:scale-105 transition-transform duration-200">
                  Invite
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
