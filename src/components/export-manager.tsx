import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  FileType,
  Video,
  Subtitles,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Crown,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  premium?: boolean;
  size?: string;
  quality?: "basic" | "standard" | "premium";
}

interface ExportJob {
  id: string;
  scriptTitle: string;
  format: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  size?: string;
  downloadUrl?: string;
  createdAt: Date;
}

const exportFormats: ExportFormat[] = [
  {
    id: "pdf",
    name: "PDF Document",
    extension: "pdf",
    icon: <FileText className="w-5 h-5" />,
    description: "Professional document format with custom styling",
    features: [
      "Custom branding",
      "Table of contents",
      "Annotations",
      "Print-ready",
    ],
    size: "~500KB",
    quality: "premium",
  },
  {
    id: "docx",
    name: "Microsoft Word",
    extension: "docx",
    icon: <FileType className="w-5 h-5" />,
    description: "Editable Word document with formatting",
    features: ["Track changes", "Comments", "Styles", "Cross-platform"],
    size: "~200KB",
    quality: "standard",
  },
  {
    id: "srt",
    name: "Subtitle File",
    extension: "srt",
    icon: <Subtitles className="w-5 h-5" />,
    description: "Standard subtitle format for video platforms",
    features: [
      "Timestamp sync",
      "Multi-language",
      "Platform compatible",
      "Auto-timing",
    ],
    size: "~50KB",
    quality: "standard",
  },
  {
    id: "vtt",
    name: "WebVTT Subtitles",
    extension: "vtt",
    icon: <Video className="w-5 h-5" />,
    description: "Web-compatible subtitle format with styling",
    features: [
      "Rich formatting",
      "Cue styling",
      "Web optimized",
      "HTML5 compatible",
    ],
    size: "~75KB",
    quality: "premium",
    premium: true,
  },
  {
    id: "json",
    name: "Structured Data",
    extension: "json",
    icon: <Settings className="w-5 h-5" />,
    description: "Machine-readable format for integrations",
    features: [
      "API friendly",
      "Metadata included",
      "Timestamp data",
      "Platform agnostic",
    ],
    size: "~100KB",
    quality: "basic",
  },
  {
    id: "html",
    name: "Web Page",
    extension: "html",
    icon: <FileText className="w-5 h-5" />,
    description: "Interactive web page with multimedia support",
    features: [
      "Responsive design",
      "Interactive elements",
      "SEO optimized",
      "Social sharing",
    ],
    size: "~300KB",
    quality: "premium",
    premium: true,
  },
];

const mockExportJobs: ExportJob[] = [
  {
    id: "1",
    scriptTitle: "Complete Guide to React Hooks",
    format: "PDF",
    status: "completed",
    progress: 100,
    size: "485 KB",
    downloadUrl: "#",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    scriptTitle: "10 AI Tools That Will Change Your Life",
    format: "SRT",
    status: "processing",
    progress: 65,
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: "3",
    scriptTitle: "My Morning Routine as a Developer",
    format: "DOCX",
    status: "failed",
    progress: 0,
    createdAt: new Date(Date.now() - 7200000),
  },
];

export function ExportManager({
  scriptId,
  scriptTitle,
}: {
  scriptId: string;
  scriptTitle: string;
}) {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [exportJobs, setExportJobs] = useState<ExportJob[]>(mockExportJobs);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [customBranding, setCustomBranding] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = (formatId: string) => {
    const format = exportFormats.find((f) => f.id === formatId);
    if (!format) return;

    if (format.premium) {
      toast({
        title: "Premium Feature",
        description: "This export format requires a premium subscription.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    const newJob: ExportJob = {
      id: Date.now().toString(),
      scriptTitle,
      format: format.name,
      status: "pending",
      progress: 0,
      createdAt: new Date(),
    };

    setExportJobs((prev) => [newJob, ...prev]);

    // Simulate export process
    setTimeout(() => {
      setExportJobs((prev) =>
        prev.map((job) =>
          job.id === newJob.id
            ? { ...job, status: "processing", progress: 25 }
            : job,
        ),
      );
    }, 1000);

    setTimeout(() => {
      setExportJobs((prev) =>
        prev.map((job) =>
          job.id === newJob.id ? { ...job, progress: 75 } : job,
        ),
      );
    }, 3000);

    setTimeout(() => {
      setExportJobs((prev) =>
        prev.map((job) =>
          job.id === newJob.id
            ? {
                ...job,
                status: "completed",
                progress: 100,
                size: format.size,
                downloadUrl: "#",
              }
            : job,
        ),
      );
      setIsExporting(false);
      toast({
        title: "Export completed",
        description: `${scriptTitle} has been exported as ${format.name}.`,
      });
    }, 5000);
  };

  const getStatusIcon = (status: ExportJob["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "processing":
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getQualityBadge = (quality: ExportFormat["quality"]) => {
    switch (quality) {
      case "premium":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        );
      case "standard":
        return (
          <Badge className="bg-blue-500/20 text-blue-400">
            <Star className="w-3 h-3 mr-1" />
            Standard
          </Badge>
        );
      case "basic":
        return <Badge variant="outline">Basic</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="export">Export Formats</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
          <TabsTrigger value="settings">Export Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Export "{scriptTitle}"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exportFormats.map((format) => (
                  <Card
                    key={format.id}
                    className={`bg-content-bg border-border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedFormat === format.id
                        ? "border-primary ring-1 ring-primary/20"
                        : ""
                    }`}
                    onClick={() => setSelectedFormat(format.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {format.icon}
                          <div>
                            <h4 className="text-text-primary font-medium">
                              {format.name}
                            </h4>
                            <p className="text-text-muted text-xs">
                              .{format.extension}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          {getQualityBadge(format.quality)}
                          {format.premium && (
                            <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-text-secondary text-sm mb-3">
                        {format.description}
                      </p>

                      <div className="space-y-1 mb-3">
                        {format.features.slice(0, 3).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-text-muted text-xs"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-text-muted text-xs">
                          {format.size}
                        </span>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExport(format.id);
                          }}
                          disabled={isExporting}
                          className="h-7"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Export History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 bg-content-bg rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <h4 className="text-text-primary font-medium">
                          {job.scriptTitle}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {job.format}
                          </Badge>
                          <span className="text-text-muted text-xs">
                            {job.createdAt.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {job.status === "processing" && (
                        <div className="w-32">
                          <Progress value={job.progress} className="h-2" />
                          <p className="text-text-muted text-xs mt-1">
                            {job.progress}%
                          </p>
                        </div>
                      )}

                      {job.size && (
                        <span className="text-text-muted text-sm">
                          {job.size}
                        </span>
                      )}

                      {job.status === "completed" && job.downloadUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      )}

                      {job.status === "failed" && (
                        <Button size="sm" variant="outline">
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Export Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary font-medium">
                    Include Metadata
                  </Label>
                  <p className="text-text-secondary text-sm">
                    Add creation date, author, and platform info
                  </p>
                </div>
                <Switch
                  checked={includeMetadata}
                  onCheckedChange={setIncludeMetadata}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary font-medium">
                    Include Timestamps
                  </Label>
                  <p className="text-text-secondary text-sm">
                    Add timing information for video sync
                  </p>
                </div>
                <Switch
                  checked={includeTimestamps}
                  onCheckedChange={setIncludeTimestamps}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-text-primary font-medium">
                    Custom Branding
                  </Label>
                  <p className="text-text-secondary text-sm">
                    Include your logo and brand colors
                  </p>
                </div>
                <Switch
                  checked={customBranding}
                  onCheckedChange={setCustomBranding}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-text-primary font-medium">
                  Default Quality
                </Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      Basic - Faster exports
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard - Balanced
                    </SelectItem>
                    <SelectItem value="premium">
                      Premium - Best quality
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-text-primary font-medium">
                  Auto-Export Formats
                </Label>
                <p className="text-text-secondary text-sm">
                  Automatically export when script is finalized
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["PDF", "SRT", "DOCX"].map((format) => (
                    <Badge
                      key={format}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/20"
                    >
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
