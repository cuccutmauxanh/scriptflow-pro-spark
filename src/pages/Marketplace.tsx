import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Store,
  Puzzle,
  Download,
  Star,
  Search,
  Filter,
  Zap,
  Settings,
  Globe,
  Code,
  Webhook,
  Key,
  Users,
  Crown,
  Shield,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: "template" | "integration" | "ai-model" | "workflow" | "theme";
  author: string;
  rating: number;
  downloads: number;
  price: number;
  isPremium: boolean;
  tags: string[];
  thumbnail: string;
  screenshots: string[];
  features: string[];
  lastUpdated: Date;
}

interface APIIntegration {
  id: string;
  name: string;
  description: string;
  provider: string;
  category: "analytics" | "social" | "ai" | "storage" | "automation";
  isConnected: boolean;
  features: string[];
  pricing: string;
  docs: string;
  icon: React.ReactNode;
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    name: "YouTube Optimization Template",
    description:
      "Template tối ưu cho YouTube với hook, SEO keywords và call-to-action hiệu quả",
    category: "template",
    author: "AutoScriptor Team",
    rating: 4.8,
    downloads: 1250,
    price: 0,
    isPremium: false,
    tags: ["YouTube", "SEO", "Engagement"],
    thumbnail: "/api/placeholder/300/200",
    screenshots: [],
    features: [
      "Hook tối ưu",
      "SEO-friendly",
      "CTA placement",
      "Engagement tracking",
    ],
    lastUpdated: new Date(Date.now() - 86400000),
  },
  {
    id: "2",
    name: "TikTok Viral Script Formula",
    description:
      "Công thức script viral cho TikTok với pattern đã được verify từ 1M+ views",
    category: "template",
    author: "ViralContent Pro",
    rating: 4.9,
    downloads: 2100,
    price: 29,
    isPremium: true,
    tags: ["TikTok", "Viral", "Short-form"],
    thumbnail: "/api/placeholder/300/200",
    screenshots: [],
    features: [
      "Viral patterns",
      "Trending hooks",
      "Music sync",
      "Hashtag suggestions",
    ],
    lastUpdated: new Date(Date.now() - 172800000),
  },
  {
    id: "3",
    name: "Brand Voice AI Model",
    description: "AI model được train để tạo script với brand voice riêng biệt",
    category: "ai-model",
    author: "AI Labs",
    rating: 4.7,
    downloads: 450,
    price: 99,
    isPremium: true,
    tags: ["AI", "Brand Voice", "Customization"],
    thumbnail: "/api/placeholder/300/200",
    screenshots: [],
    features: [
      "Custom voice training",
      "Consistency check",
      "Brand guidelines",
      "Tone analysis",
    ],
    lastUpdated: new Date(Date.now() - 259200000),
  },
  {
    id: "4",
    name: "Analytics Dashboard Integration",
    description:
      "Tích hợp với Google Analytics, YouTube Analytics và Facebook Insights",
    category: "integration",
    author: "DataFlow",
    rating: 4.6,
    downloads: 890,
    price: 49,
    isPremium: true,
    tags: ["Analytics", "Data", "Integration"],
    thumbnail: "/api/placeholder/300/200",
    screenshots: [],
    features: [
      "Multi-platform analytics",
      "Performance tracking",
      "ROI calculation",
      "Custom reports",
    ],
    lastUpdated: new Date(Date.now() - 345600000),
  },
  {
    id: "5",
    name: "Dark Mode Theme Pack",
    description:
      "Bộ theme dark mode với nhiều color schemes cho giao diện AutoScriptor",
    category: "theme",
    author: "UI Specialists",
    rating: 4.5,
    downloads: 1680,
    price: 19,
    isPremium: false,
    tags: ["Theme", "Dark Mode", "UI"],
    thumbnail: "/api/placeholder/300/200",
    screenshots: [],
    features: [
      "Multiple dark themes",
      "Eye-friendly colors",
      "Custom accents",
      "High contrast mode",
    ],
    lastUpdated: new Date(Date.now() - 432000000),
  },
];

const apiIntegrations: APIIntegration[] = [
  {
    id: "youtube",
    name: "YouTube API",
    description:
      "Tích hợp với YouTube để upload video, lấy analytics và manage channel",
    provider: "Google",
    category: "social",
    isConnected: false,
    features: [
      "Video upload",
      "Analytics",
      "Channel management",
      "Comment moderation",
    ],
    pricing: "Free với limits",
    docs: "https://developers.google.com/youtube",
    icon: <Globe className="w-5 h-5 text-red-500" />,
  },
  {
    id: "openai",
    name: "OpenAI GPT-4",
    description: "Sử dụng GPT-4 cho content generation và script optimization",
    provider: "OpenAI",
    category: "ai",
    isConnected: true,
    features: [
      "Advanced content generation",
      "Script analysis",
      "Style adaptation",
      "Multi-language",
    ],
    pricing: "$20/month",
    docs: "https://platform.openai.com/docs",
    icon: <Zap className="w-5 h-5 text-green-500" />,
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Track website traffic và user behavior từ scripts được share",
    provider: "Google",
    category: "analytics",
    isConnected: false,
    features: [
      "Traffic tracking",
      "User behavior",
      "Conversion tracking",
      "Custom events",
    ],
    pricing: "Free",
    docs: "https://developers.google.com/analytics",
    icon: <Settings className="w-5 h-5 text-blue-500" />,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Tự động hóa workflow với 5000+ apps khác",
    provider: "Zapier",
    category: "automation",
    isConnected: false,
    features: [
      "Workflow automation",
      "5000+ integrations",
      "Trigger actions",
      "Data sync",
    ],
    pricing: "Free - $20/month",
    docs: "https://zapier.com/developer",
    icon: <Webhook className="w-5 h-5 text-orange-500" />,
  },
  {
    id: "drive",
    name: "Google Drive",
    description: "Lưu trữ và sync scripts trên Google Drive",
    provider: "Google",
    category: "storage",
    isConnected: true,
    features: ["Cloud storage", "Auto sync", "Version control", "Sharing"],
    pricing: "Free - $10/month",
    docs: "https://developers.google.com/drive",
    icon: <Code className="w-5 h-5 text-yellow-500" />,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Nhận notifications và collaborate qua Slack",
    provider: "Slack",
    category: "automation",
    isConnected: false,
    features: [
      "Team notifications",
      "Script sharing",
      "Collaboration",
      "Bot integration",
    ],
    pricing: "Free - $8/month",
    docs: "https://api.slack.com",
    icon: <Users className="w-5 h-5 text-purple-500" />,
  },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("marketplace");
  const [integrations, setIntegrations] = useState(apiIntegrations);
  const { toast } = useToast();

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = (item: MarketplaceItem) => {
    toast({
      title: "Installing...",
      description: `Installing ${item.name}. This may take a few moments.`,
    });

    setTimeout(() => {
      toast({
        title: "Installed successfully",
        description: `${item.name} has been installed and is ready to use.`,
      });
    }, 2000);
  };

  const handleConnectAPI = (integration: APIIntegration) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === integration.id
          ? { ...int, isConnected: !int.isConnected }
          : int,
      ),
    );

    toast({
      title: integration.isConnected ? "Disconnected" : "Connected",
      description: `${integration.name} has been ${integration.isConnected ? "disconnected" : "connected"} successfully.`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "template":
        return <Store className="w-4 h-4" />;
      case "integration":
        return <Puzzle className="w-4 h-4" />;
      case "ai-model":
        return <Zap className="w-4 h-4" />;
      case "workflow":
        return <Settings className="w-4 h-4" />;
      case "theme":
        return <Crown className="w-4 h-4" />;
      default:
        return <Store className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Marketplace & Integrations
            </h1>
            <p className="text-text-secondary mt-2">
              Mở rộng AutoScriptor với templates, AI models và integrations
            </p>
          </div>
          <Button className="gap-2">
            <Crown className="w-4 h-4" />
            Upgrade to Pro
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marketplace" className="gap-2">
              <Store className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Puzzle className="w-4 h-4" />
              API Integrations
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="gap-2">
              <Shield className="w-4 h-4" />
              Enterprise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                <Input
                  placeholder="Search templates, AI models, integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="ai-model">AI Models</SelectItem>
                  <SelectItem value="integration">Integrations</SelectItem>
                  <SelectItem value="workflow">Workflows</SelectItem>
                  <SelectItem value="theme">Themes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Marketplace Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-surface border-border hover:border-primary/50 transition-colors"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        {item.isPremium && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        {item.rating}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="text-text-secondary text-sm">
                      {item.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-text-muted">
                        <span>by {item.author}</span>
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {item.downloads.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-text-primary">
                          {item.price === 0 ? "Free" : `$${item.price}`}
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                          >
                            View Details
                          </Button>
                          <Button size="sm" onClick={() => handleInstall(item)}>
                            {item.price === 0 ? "Install" : "Buy"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id} className="bg-surface border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {integration.icon}
                        <div>
                          <CardTitle className="text-lg">
                            {integration.name}
                          </CardTitle>
                          <p className="text-text-secondary text-sm">
                            by {integration.provider}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          integration.isConnected
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {integration.isConnected
                          ? "Connected"
                          : "Not Connected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary mb-4">
                      {integration.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">
                          Features:
                        </h4>
                        <ul className="space-y-1">
                          {integration.features.map((feature, index) => (
                            <li
                              key={index}
                              className="text-sm text-text-secondary flex items-center gap-2"
                            >
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {integration.pricing}
                          </p>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Docs
                          </Button>
                        </div>
                        <Button
                          variant={
                            integration.isConnected ? "outline" : "default"
                          }
                          onClick={() => handleConnectAPI(integration)}
                        >
                          {integration.isConnected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enterprise" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    White-label Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">
                    Customize AutoScriptor với brand riêng của bạn và deploy cho
                    customers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      Custom branding & domain
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      API access & webhooks
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      Multi-tenant architecture
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      Revenue sharing model
                    </li>
                  </ul>
                  <Button className="w-full">Contact Sales</Button>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-purple-500" />
                    API & Developer Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">
                    Build custom integrations với AutoScriptor API và developer
                    tools.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      RESTful API access
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      Webhooks & real-time events
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      SDK cho popular platforms
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      Developer documentation
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    View API Docs
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Đối tác Enterprise Program
                </h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  Join partner program của chúng tôi để nhận commission,
                  technical support và co-marketing opportunities.
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg">Become a Partner</Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Item Detail Dialog */}
        {selectedItem && (
          <Dialog
            open={!!selectedItem}
            onOpenChange={() => setSelectedItem(null)}
          >
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getCategoryIcon(selectedItem.category)}
                  {selectedItem.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{selectedItem.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      {selectedItem.rating} ({selectedItem.downloads} downloads)
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-text-primary">
                    {selectedItem.price === 0
                      ? "Free"
                      : `$${selectedItem.price}`}
                  </div>
                </div>

                <p className="text-text-secondary">
                  {selectedItem.description}
                </p>

                <div>
                  <h4 className="font-medium text-text-primary mb-2">
                    Features:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedItem.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </Button>
                  <Button onClick={() => handleInstall(selectedItem)}>
                    {selectedItem.price === 0 ? "Install" : "Buy Now"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
}
