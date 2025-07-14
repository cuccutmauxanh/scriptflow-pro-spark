import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  Send,
  Lightbulb,
  TrendingUp,
  Search,
  BookOpen,
  Target,
  Zap,
  Brain,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  insights?: {
    type: "style" | "performance" | "engagement" | "seo";
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
  }[];
}

interface UserProfile {
  writingStyle: {
    tone: string;
    complexity: string;
    preferredFormats: string[];
    avgWordCount: number;
  };
  preferences: {
    platforms: string[];
    topics: string[];
    publishingTimes: string[];
  };
  performance: {
    bestPerformingType: string;
    avgEngagement: number;
    improvementAreas: string[];
  };
}

const mockUserProfile: UserProfile = {
  writingStyle: {
    tone: "conversational",
    complexity: "intermediate",
    preferredFormats: ["tutorial", "review", "story"],
    avgWordCount: 1200,
  },
  preferences: {
    platforms: ["YouTube", "TikTok"],
    topics: ["tech", "productivity", "ai"],
    publishingTimes: ["14:00-18:00", "19:00-21:00"],
  },
  performance: {
    bestPerformingType: "tutorial",
    avgEngagement: 9.2,
    improvementAreas: ["hook quality", "call-to-action", "storytelling"],
  },
};

const aiInsights = [
  {
    type: "style" as const,
    title: "Nâng cao hook opening",
    description:
      "Scripts với câu mở đầu hấp dẫn có tỷ lệ retention cao hơn 34%. Hãy thử bắt đầu bằng câu hỏi hoặc thống kê gây shock.",
    impact: "high" as const,
  },
  {
    type: "performance" as const,
    title: "Tối ưu độ dài nội dung",
    description:
      "Scripts 8-12 phút có performance tốt nhất cho audience của bạn. Hiện tại scripts của bạn trung bình 15 phút.",
    impact: "medium" as const,
  },
  {
    type: "engagement" as const,
    title: "Thêm call-to-action",
    description:
      "Scripts có CTA rõ ràng có engagement cao hơn 28%. Đặt CTA ở phút thứ 3 và cuối video.",
    impact: "high" as const,
  },
  {
    type: "seo" as const,
    title: "Keyword optimization",
    description:
      "Sử dụng keywords 'AI tools 2024' và 'productivity hacks' để tăng searchability.",
    impact: "medium" as const,
  },
];

const suggestedTopics = [
  {
    topic: "AI Tools cho Content Creator 2024",
    trend: "+145%",
    difficulty: "medium",
  },
  {
    topic: "Productivity Hacks cho Developer",
    trend: "+89%",
    difficulty: "easy",
  },
  { topic: "No-Code Solutions Review", trend: "+67%", difficulty: "hard" },
  { topic: "Remote Work Setup Guide", trend: "+234%", difficulty: "easy" },
];

const recentAnalytics = [
  {
    script: "Complete Guide to React Hooks",
    score: 92,
    improvement: "Thêm practical examples",
  },
  {
    script: "10 AI Tools for Developers",
    score: 87,
    improvement: "Cải thiện call-to-action",
  },
  {
    script: "My Morning Routine",
    score: 95,
    improvement: "Perfect! Maintain this style",
  },
];

export function RAGAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Chào bạn! Tôi đã phân tích style và preferences của bạn. Tôi có thể giúp bạn tạo content phù hợp hơn với audience. Bạn muốn tôi gợi ý gì?",
      timestamp: new Date(),
      suggestions: [
        "Gợi ý topic trending",
        "Phân tích script hiện tại",
        "Tối ưu engagement",
        "Cải thiện SEO",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        topic: {
          content:
            "Dựa trên performance history và trending data, tôi recommend topic 'AI Tools cho Content Creator 2024'. Topic này đang trending +145% và phù hợp với audience tech-savvy của bạn.",
          insights: [aiInsights[0], aiInsights[2]],
        },
        script: {
          content:
            "Tôi đã phân tích script gần nhất của bạn. Điểm mạnh: storytelling tốt, technical accuracy cao. Cần cải thiện: hook opening và call-to-action placement.",
          insights: [aiInsights[1], aiInsights[3]],
        },
        default: {
          content:
            "Tôi có thể giúp bạn với nhiều việc: phân tích performance, gợi ý content, tối ưu SEO, hoặc cải thiện writing style. Bạn cần tôi hỗ trợ điều gì cụ thể?",
          insights: aiInsights.slice(0, 2),
        },
      };

      let responseKey = "default";
      if (
        input.toLowerCase().includes("topic") ||
        input.toLowerCase().includes("gợi ý")
      ) {
        responseKey = "topic";
      } else if (
        input.toLowerCase().includes("script") ||
        input.toLowerCase().includes("phân tích")
      ) {
        responseKey = "script";
      }

      const response = responses[responseKey as keyof typeof responses];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        insights: response.insights,
        suggestions: [
          "Tạo outline chi tiết",
          "Phân tích competitor",
          "Tối ưu keywords",
          "Cải thiện hook",
        ],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "style":
        return Lightbulb;
      case "performance":
        return TrendingUp;
      case "engagement":
        return Target;
      case "seo":
        return Search;
      default:
        return Brain;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="trends">Trending Topics</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-text-primary">
                <Bot className="w-5 h-5 text-primary" />
                AI Writing Assistant
                <Badge className="bg-green-500/20 text-green-400 ml-auto">
                  Đã học {mockUserProfile.writingStyle.preferredFormats.length}{" "}
                  styles
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto space-y-4 mb-4 p-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.type === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.type === "assistant" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-content-bg border border-border",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>

                      {message.insights && (
                        <div className="mt-3 space-y-2">
                          {message.insights.map((insight, index) => {
                            const Icon = getInsightIcon(insight.type);
                            return (
                              <div
                                key={index}
                                className="p-2 bg-surface rounded border border-border"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <Icon className="w-3 h-3" />
                                  <span className="text-xs font-medium">
                                    {insight.title}
                                  </span>
                                  <Badge
                                    className={cn(
                                      "text-xs",
                                      getImpactColor(insight.impact),
                                    )}
                                  >
                                    {insight.impact}
                                  </Badge>
                                </div>
                                <p className="text-xs text-text-secondary">
                                  {insight.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-6"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="text-xs text-text-muted mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>

                    {message.type === "user" && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          U
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-content-bg border border-border rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-text-muted rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-text-muted rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi tôi về content strategy, script optimization..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <Card key={index} className="bg-surface border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-text-primary font-medium">
                            {insight.title}
                          </h4>
                          <Badge
                            className={cn(
                              "text-xs",
                              getImpactColor(insight.impact),
                            )}
                          >
                            {insight.impact}
                          </Badge>
                        </div>
                        <p className="text-text-secondary text-sm">
                          {insight.description}
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Trending Topics for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-content-bg rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <h4 className="text-text-primary font-medium">
                        {topic.topic}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-500/20 text-green-400">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {topic.trend}
                        </Badge>
                        <Badge variant="outline">{topic.difficulty}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Create Script
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Recent Script Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalytics.map((script, index) => (
                  <div
                    key={index}
                    className="p-4 bg-content-bg rounded-lg border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-text-primary font-medium">
                        {script.script}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary font-bold">
                          {script.score}/100
                        </span>
                        {script.score >= 90 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : script.score >= 80 ? (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <Progress value={script.score} className="mb-2" />
                    <p className="text-text-secondary text-sm">
                      {script.improvement}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
