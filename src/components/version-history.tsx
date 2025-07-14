import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Clock,
  GitBranch,
  Eye,
  RotateCcw,
  Tag,
  User,
  Edit3,
  Plus,
  ArrowRight,
  FileText,
  Save,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptVersion {
  id: string;
  version: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  changes: string[];
  wordCount: number;
  status: "draft" | "review" | "final" | "archived";
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: Date;
  }[];
  tags: string[];
  isStarred?: boolean;
}

const mockVersions: ScriptVersion[] = [
  {
    id: "v7",
    version: "v2.3",
    title: "Complete Guide to React Hooks - Final Version",
    content:
      "In this comprehensive guide, we'll explore the powerful world of React Hooks...",
    author: "Phuong Nam Tran",
    createdAt: new Date(Date.now() - 3600000),
    changes: [
      "Added advanced useEffect examples",
      "Improved code examples formatting",
      "Fixed typos in conclusion section",
    ],
    wordCount: 1250,
    status: "final",
    comments: [],
    tags: ["react", "hooks", "tutorial"],
    isStarred: true,
  },
  {
    id: "v6",
    version: "v2.2",
    title: "Complete Guide to React Hooks - Review Draft",
    content: "In this comprehensive guide, we'll explore React Hooks...",
    author: "Sarah Johnson",
    createdAt: new Date(Date.now() - 7200000),
    changes: [
      "Restructured content flow",
      "Added practical examples",
      "Enhanced introduction",
    ],
    wordCount: 1180,
    status: "review",
    comments: [
      {
        id: "c1",
        author: "Mike Chen",
        content:
          "Great improvements to the structure! The examples are much clearer now.",
        timestamp: new Date(Date.now() - 5400000),
      },
    ],
    tags: ["react", "hooks", "draft"],
  },
  {
    id: "v5",
    version: "v2.1",
    title: "Complete Guide to React Hooks - Initial Draft",
    content: "Let's talk about React Hooks...",
    author: "Phuong Nam Tran",
    createdAt: new Date(Date.now() - 86400000),
    changes: [
      "Initial content creation",
      "Basic structure setup",
      "Added core concepts",
    ],
    wordCount: 950,
    status: "draft",
    comments: [
      {
        id: "c2",
        author: "Emma Davis",
        content: "Good start! Consider adding more practical examples.",
        timestamp: new Date(Date.now() - 82800000),
      },
      {
        id: "c3",
        author: "Sarah Johnson",
        content: "The introduction could be more engaging.",
        timestamp: new Date(Date.now() - 81000000),
      },
    ],
    tags: ["react", "hooks", "initial"],
  },
  {
    id: "v4",
    version: "v2.0",
    title: "Complete Guide to React Hooks - Major Rewrite",
    content: "React Hooks revolutionized how we write React components...",
    author: "Phuong Nam Tran",
    createdAt: new Date(Date.now() - 172800000),
    changes: [
      "Complete content rewrite",
      "New structure and flow",
      "Updated for React 18",
    ],
    wordCount: 1450,
    status: "archived",
    comments: [],
    tags: ["react", "hooks", "rewrite", "react18"],
  },
];

const statusColors = {
  draft: "bg-gray-500/20 text-gray-400",
  review: "bg-yellow-500/20 text-yellow-400",
  final: "bg-green-500/20 text-green-400",
  archived: "bg-red-500/20 text-red-400",
};

export function VersionHistory({ scriptId }: { scriptId: string }) {
  const [versions, setVersions] = useState<ScriptVersion[]>(mockVersions);
  const [selectedVersion, setSelectedVersion] = useState<ScriptVersion | null>(
    null,
  );
  const [isCreateVersionOpen, setIsCreateVersionOpen] = useState(false);
  const [newVersionTitle, setNewVersionTitle] = useState("");
  const [newVersionNotes, setNewVersionNotes] = useState("");
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentingVersion, setCommentingVersion] = useState<string | null>(
    null,
  );
  const { toast } = useToast();

  const handleCreateVersion = () => {
    if (!newVersionTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for the new version.",
        variant: "destructive",
      });
      return;
    }

    const newVersion: ScriptVersion = {
      id: `v${Date.now()}`,
      version: `v${Math.floor(versions.length / 10) + 1}.${versions.length % 10}`,
      title: newVersionTitle,
      content: "Content will be generated based on current script...",
      author: "Phuong Nam Tran",
      createdAt: new Date(),
      changes: newVersionNotes.split("\n").filter((line) => line.trim()),
      wordCount: 1200 + Math.floor(Math.random() * 500),
      status: "draft",
      comments: [],
      tags: ["new", "draft"],
    };

    setVersions((prev) => [newVersion, ...prev]);
    setNewVersionTitle("");
    setNewVersionNotes("");
    setIsCreateVersionOpen(false);

    toast({
      title: "Version created",
      description: `Version ${newVersion.version} has been created successfully.`,
    });
  };

  const handleRevertToVersion = (version: ScriptVersion) => {
    toast({
      title: "Version restored",
      description: `Reverted to ${version.version}: ${version.title}`,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !commentingVersion) return;

    const comment = {
      id: `c${Date.now()}`,
      author: "Phuong Nam Tran",
      content: newComment,
      timestamp: new Date(),
    };

    setVersions((prev) =>
      prev.map((version) =>
        version.id === commentingVersion
          ? { ...version, comments: [...version.comments, comment] }
          : version,
      ),
    );

    setNewComment("");
    setIsCommentDialogOpen(false);
    setCommentingVersion(null);

    toast({
      title: "Comment added",
      description: "Your comment has been added to the version.",
    });
  };

  const openCommentDialog = (versionId: string) => {
    setCommentingVersion(versionId);
    setIsCommentDialogOpen(true);
  };

  const getStatusIcon = (status: ScriptVersion["status"]) => {
    switch (status) {
      case "final":
        return <Tag className="w-4 h-4" />;
      case "review":
        return <Eye className="w-4 h-4" />;
      case "draft":
        return <Edit3 className="w-4 h-4" />;
      case "archived":
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Version History
          </h2>
          <p className="text-text-secondary">
            Track changes and collaborate on your script
          </p>
        </div>

        <Dialog
          open={isCreateVersionOpen}
          onOpenChange={setIsCreateVersionOpen}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Version
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Version</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Version Title</Label>
                <Input
                  id="title"
                  value={newVersionTitle}
                  onChange={(e) => setNewVersionTitle(e.target.value)}
                  placeholder="Enter version title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Change Notes</Label>
                <Textarea
                  id="notes"
                  value={newVersionNotes}
                  onChange={(e) => setNewVersionNotes(e.target.value)}
                  placeholder="Describe what changed in this version..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateVersion} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Create Version
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateVersionOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Version Timeline */}
      <div className="space-y-4">
        {versions.map((version, index) => (
          <Card key={version.id} className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Version Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <GitBranch className="w-4 h-4 text-primary" />
                    </div>
                    {index < versions.length - 1 && (
                      <div className="w-px h-16 bg-border mt-2"></div>
                    )}
                  </div>

                  {/* Version Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-text-primary font-semibold">
                        {version.title}
                      </h3>
                      <Badge className={statusColors[version.status]}>
                        {getStatusIcon(version.status)}
                        <span className="ml-1">{version.status}</span>
                      </Badge>
                      {version.isStarred && (
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-text-secondary text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {version.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {version.createdAt.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {version.wordCount} words
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {version.version}
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      {version.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Changes */}
                    {version.changes.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-text-primary font-medium text-sm mb-2">
                          Changes:
                        </h4>
                        <ul className="space-y-1">
                          {version.changes.map((change, changeIndex) => (
                            <li
                              key={changeIndex}
                              className="flex items-center gap-2 text-text-secondary text-sm"
                            >
                              <ArrowRight className="w-3 h-3 text-green-500" />
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Comments */}
                    {version.comments.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-text-primary font-medium text-sm mb-2">
                          Comments ({version.comments.length}):
                        </h4>
                        <div className="space-y-2">
                          {version.comments.slice(0, 2).map((comment) => (
                            <div
                              key={comment.id}
                              className="flex items-start gap-2 p-2 bg-content-bg rounded border border-border"
                            >
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-text-primary font-medium text-sm">
                                    {comment.author}
                                  </span>
                                  <span className="text-text-muted text-xs">
                                    {comment.timestamp.toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-text-secondary text-sm">
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          ))}
                          {version.comments.length > 2 && (
                            <p className="text-text-muted text-xs">
                              +{version.comments.length - 2} more comments
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedVersion(version)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevertToVersion(version)}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Revert
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCommentDialog(version.id)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comment Dialog */}
      <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddComment} className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCommentDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Version Preview Dialog */}
      {selectedVersion && (
        <Dialog
          open={!!selectedVersion}
          onOpenChange={() => setSelectedVersion(null)}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedVersion.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <Badge className={statusColors[selectedVersion.status]}>
                  {selectedVersion.status}
                </Badge>
                <span>{selectedVersion.version}</span>
                <span>{selectedVersion.author}</span>
                <span>{selectedVersion.createdAt.toLocaleString()}</span>
              </div>
              <div className="p-4 bg-content-bg rounded border border-border">
                <p className="text-text-primary whitespace-pre-wrap">
                  {selectedVersion.content}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
