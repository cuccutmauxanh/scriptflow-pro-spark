import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  BookOpen,
  ExternalLink,
  Plus,
  Tag,
  Calendar,
  FileType,
  Link,
  Star,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferenceDocument {
  id: string;
  name: string;
  type: "pdf" | "doc" | "txt" | "link";
  size?: string;
  url?: string;
  uploadDate: Date;
  tags: string[];
  category: string;
  description: string;
  isStarred: boolean;
  content?: string;
  thumbnail?: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

const mockDocuments: ReferenceDocument[] = [
  {
    id: "1",
    name: "The Complete Guide to Scriptwriting",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: new Date(Date.now() - 86400000),
    tags: ["scriptwriting", "guide", "fundamentals"],
    category: "Books",
    description:
      "Comprehensive guide covering all aspects of scriptwriting from character development to dialogue.",
    isStarred: true,
    thumbnail: "/api/placeholder/200/150",
  },
  {
    id: "2",
    name: "YouTube Algorithm Research 2024",
    type: "pdf",
    size: "1.8 MB",
    uploadDate: new Date(Date.now() - 172800000),
    tags: ["youtube", "algorithm", "research", "optimization"],
    category: "Research",
    description:
      "Latest research on YouTube algorithm changes and optimization strategies.",
    isStarred: false,
  },
  {
    id: "3",
    name: "Viral Content Patterns Analysis",
    type: "doc",
    size: "850 KB",
    uploadDate: new Date(Date.now() - 259200000),
    tags: ["viral", "content", "analysis", "patterns"],
    category: "Research",
    description:
      "Analysis of viral content patterns across different social media platforms.",
    isStarred: true,
  },
  {
    id: "4",
    name: "TikTok Best Practices",
    type: "link",
    url: "https://example.com/tiktok-guide",
    uploadDate: new Date(Date.now() - 345600000),
    tags: ["tiktok", "best-practices", "short-form"],
    category: "Guides",
    description:
      "Comprehensive guide to TikTok content creation and optimization.",
    isStarred: false,
  },
  {
    id: "5",
    name: "AI Writing Prompts Collection",
    type: "txt",
    size: "125 KB",
    uploadDate: new Date(Date.now() - 432000000),
    tags: ["ai", "prompts", "writing", "collection"],
    category: "AI Resources",
    description: "Collection of effective AI prompts for content generation.",
    isStarred: true,
  },
];

const categories: DocumentCategory[] = [
  {
    id: "all",
    name: "All Documents",
    count: mockDocuments.length,
    color: "bg-blue-500",
  },
  { id: "books", name: "Books", count: 1, color: "bg-green-500" },
  { id: "research", name: "Research", count: 2, color: "bg-purple-500" },
  { id: "guides", name: "Guides", count: 1, color: "bg-orange-500" },
  { id: "ai-resources", name: "AI Resources", count: 1, color: "bg-pink-500" },
];

export function ReferenceLibrary() {
  const [documents, setDocuments] =
    useState<ReferenceDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDocument, setSelectedDocument] =
    useState<ReferenceDocument | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Form states for new documents
  const [newLink, setNewLink] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkDescription, setNewLinkDescription] = useState("");
  const [newLinkTags, setNewLinkTags] = useState("");
  const [newLinkCategory, setNewLinkCategory] = useState("");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" ||
      doc.category.toLowerCase() === selectedCategory.replace("-", " ");
    return matchesSearch && matchesCategory;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
        return b.uploadDate.getTime() - a.uploadDate.getTime();
      case "starred":
        return b.isStarred ? 1 : -1;
      default:
        return 0;
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc: ReferenceDocument = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.name.endsWith(".pdf")
            ? "pdf"
            : file.name.endsWith(".doc") || file.name.endsWith(".docx")
              ? "doc"
              : "txt",
          size: (file.size / 1024).toFixed(1) + " KB",
          uploadDate: new Date(),
          tags: [],
          category: "Uncategorized",
          description: "",
          isStarred: false,
        };
        setDocuments((prev) => [newDoc, ...prev]);
      });

      toast({
        title: "Files uploaded successfully",
        description: `${files.length} file(s) added to your reference library.`,
      });
    }
  };

  const handleAddLink = () => {
    if (!newLink || !newLinkTitle) {
      toast({
        title: "Missing information",
        description: "Please provide both URL and title.",
        variant: "destructive",
      });
      return;
    }

    const newDoc: ReferenceDocument = {
      id: Date.now().toString(),
      name: newLinkTitle,
      type: "link",
      url: newLink,
      uploadDate: new Date(),
      tags: newLinkTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      category: newLinkCategory || "Uncategorized",
      description: newLinkDescription,
      isStarred: false,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setNewLink("");
    setNewLinkTitle("");
    setNewLinkDescription("");
    setNewLinkTags("");
    setNewLinkCategory("");
    setIsAddLinkOpen(false);

    toast({
      title: "Link added successfully",
      description: "Link has been added to your reference library.",
    });
  };

  const toggleStar = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, isStarred: !doc.isStarred } : doc,
      ),
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "Document has been removed from your library.",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "doc":
        return <FileType className="w-5 h-5 text-blue-500" />;
      case "txt":
        return <FileText className="w-5 h-5 text-gray-500" />;
      case "link":
        return <Link className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(
      (c) => c.name.toLowerCase() === category.toLowerCase(),
    );
    return cat?.color || "bg-gray-500";
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Reference Library: RAG
            </h3>
            <p className="text-sm text-text-secondary">
              Manage your learning materials and knowledge base
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:scale-105 transition-transform duration-200"
                >
                  <Link className="w-4 h-4" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent className="animate-in zoom-in duration-300">
                <DialogHeader>
                  <DialogTitle>Add Reference Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      placeholder="https://example.com/resource"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      placeholder="Resource title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newLinkDescription}
                      onChange={(e) => setNewLinkDescription(e.target.value)}
                      placeholder="Brief description of the resource"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newLinkTags}
                      onChange={(e) => setNewLinkTags(e.target.value)}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newLinkCategory}
                      onValueChange={setNewLinkCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Guides">Guides</SelectItem>
                        <SelectItem value="AI Resources">
                          AI Resources
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddLink} className="flex-1">
                      Add Link
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddLinkOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              className="gap-2 hover:scale-105 transition-transform duration-200"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
            <Input
              placeholder="Search documents, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-300 focus:scale-[1.02]"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="starred">Sort by Starred</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2 whitespace-nowrap hover:scale-105 transition-transform duration-200"
            >
              <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
              {category.name}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {sortedDocuments.length === 0 ? (
          <div className="text-center py-12 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No documents found
            </h3>
            <p className="text-text-secondary mb-4">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Start building your reference library by uploading documents or adding links."}
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="hover:scale-105 transition-transform duration-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your First Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sortedDocuments.map((doc, index) => (
              <Card
                key={doc.id}
                className={`bg-surface border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-in fade-in duration-300 delay-${index * 50}`}
                onClick={() => setSelectedDocument(doc)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-text-primary truncate">
                          {doc.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getCategoryColor(doc.category)} text-white border-none`}
                          >
                            {doc.category}
                          </Badge>
                          {doc.size && (
                            <span className="text-xs text-text-muted">
                              {doc.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(doc.id);
                        }}
                        className="h-8 w-8 p-0 hover:scale-110 transition-transform duration-200"
                      >
                        <Star
                          className={`w-4 h-4 ${doc.isStarred ? "fill-yellow-500 text-yellow-500" : "text-text-muted"}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDocument(doc.id);
                        }}
                        className="h-8 w-8 p-0 text-text-muted hover:text-red-500 hover:scale-110 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {doc.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {doc.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{doc.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {doc.uploadDate.toLocaleDateString()}
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Document Preview Dialog */}
      {selectedDocument && (
        <Dialog
          open={!!selectedDocument}
          onOpenChange={() => setSelectedDocument(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto animate-in zoom-in duration-300">
            <DialogHeader>
              <div className="flex items-center gap-3">
                {getFileIcon(selectedDocument.type)}
                <DialogTitle>{selectedDocument.name}</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStar(selectedDocument.id)}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <Star
                    className={`w-4 h-4 ${selectedDocument.isStarred ? "fill-yellow-500 text-yellow-500" : "text-text-muted"}`}
                  />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge
                  className={`${getCategoryColor(selectedDocument.category)} text-white border-none`}
                >
                  {selectedDocument.category}
                </Badge>
                {selectedDocument.size && (
                  <span className="text-sm text-text-muted">
                    {selectedDocument.size}
                  </span>
                )}
                <span className="text-sm text-text-muted">
                  Added {selectedDocument.uploadDate.toLocaleDateString()}
                </span>
              </div>

              <p className="text-text-secondary">
                {selectedDocument.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedDocument.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {selectedDocument.type === "link" && selectedDocument.url && (
                <div className="p-4 bg-accent/20 rounded-lg">
                  <h4 className="font-medium mb-2">External Link</h4>
                  <a
                    href={selectedDocument.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {selectedDocument.url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                {selectedDocument.type === "link" && selectedDocument.url ? (
                  <Button
                    asChild
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <a
                      href={selectedDocument.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Link
                    </a>
                  </Button>
                ) : (
                  <Button className="hover:scale-105 transition-transform duration-200">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedDocument(null)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
