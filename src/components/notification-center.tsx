import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  X,
  Settings,
  Zap,
  Star,
  GitBranch,
  Download,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type:
    | "success"
    | "warning"
    | "info"
    | "error"
    | "collaboration"
    | "performance"
    | "system";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  avatar?: string;
  priority: "low" | "medium" | "high";
  category: "script" | "team" | "analytics" | "system" | "ai";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "collaboration",
    title: "Sarah đã comment trên script",
    message:
      '"Phần hook này có thể cải thiện thêm. Hãy thử bắt đầu bằng thống kê gây shock."',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    isRead: false,
    priority: "medium",
    category: "team",
    action: {
      label: "Xem comment",
      onClick: () => console.log("View comment"),
    },
  },
  {
    id: "2",
    type: "success",
    title: "Script được export thành công",
    message: '"Complete Guide to React Hooks" đã được export sang PDF format.',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    isRead: false,
    priority: "low",
    category: "script",
    action: {
      label: "Download",
      onClick: () => console.log("Download file"),
    },
  },
  {
    id: "3",
    type: "performance",
    title: "AI Insight: Cải thiện engagement",
    message:
      "Script của bạn có thể tăng 25% engagement nếu thêm call-to-action ở phút thứ 3.",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    isRead: false,
    priority: "high",
    category: "ai",
    action: {
      label: "Áp dụng gợi ý",
      onClick: () => console.log("Apply suggestion"),
    },
  },
  {
    id: "4",
    type: "info",
    title: "Mike Chen đã join team",
    message: "Mike Chen đã được thêm vào team với role Editor.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: true,
    priority: "medium",
    category: "team",
  },
  {
    id: "5",
    type: "warning",
    title: "Version conflict detected",
    message:
      "Có conflict giữa version hiện tại và version của Emma. Cần merge thủ công.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    isRead: false,
    priority: "high",
    category: "script",
    action: {
      label: "Resolve conflict",
      onClick: () => console.log("Resolve conflict"),
    },
  },
  {
    id: "6",
    type: "performance",
    title: "Weekly Analytics Report",
    message:
      "Scripts của bạn tuần này có performance tăng 34% so với tuần trước.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    isRead: true,
    priority: "medium",
    category: "analytics",
    action: {
      label: "Xem chi tiết",
      onClick: () => console.log("View analytics"),
    },
  },
  {
    id: "7",
    type: "system",
    title: "Feature Update: Multi-format Export",
    message: "Bây giờ bạn có thể export script sang WebVTT và HTML format.",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    isRead: true,
    priority: "low",
    category: "system",
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.category === activeTab;
  });

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "collaboration":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "performance":
        return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case "system":
        return <Settings className="w-4 h-4 text-gray-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getCategoryIcon = (category: Notification["category"]) => {
    switch (category) {
      case "script":
        return <GitBranch className="w-3 h-3" />;
      case "team":
        return <Users className="w-3 h-3" />;
      case "analytics":
        return <TrendingUp className="w-3 h-3" />;
      case "ai":
        return <Zap className="w-3 h-3" />;
      case "system":
        return <Settings className="w-3 h-3" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return timestamp.toLocaleDateString();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="px-4 pb-3">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all" className="text-xs">
                    All
                    {notifications.length > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {notifications.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="team" className="text-xs">
                    Team
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="text-xs">
                    AI
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-0">
                <ScrollArea className="h-96">
                  <div className="space-y-1">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-8 text-text-muted">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "border-l-4 p-3 hover:bg-accent/50 transition-colors cursor-pointer",
                            getPriorityColor(notification.priority),
                            !notification.isRead && "bg-accent/20",
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4
                                  className={cn(
                                    "text-sm font-medium truncate",
                                    !notification.isRead && "font-semibold",
                                  )}
                                >
                                  {notification.title}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-text-muted">
                                  {getCategoryIcon(notification.category)}
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    {formatTime(notification.timestamp)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                {notification.action && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      notification.action?.onClick();
                                    }}
                                  >
                                    {notification.action.label}
                                  </Button>
                                )}
                                <div className="flex items-center gap-2 ml-auto">
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeNotification(notification.id);
                                    }}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

// Toast-style notifications for immediate feedback
export function useEnhancedToast() {
  const showToast = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message?: string,
    action?: { label: string; onClick: () => void },
  ) => {
    // This would integrate with your existing toast system
    // For now, just console.log
    console.log(`Toast: ${type} - ${title}`, message, action);
  };

  return { showToast };
}

// Smart notification component that can appear as overlay
export function SmartNotification({
  notification,
  onDismiss,
}: {
  notification: Notification;
  onDismiss: () => void;
}) {
  return (
    <Card className="fixed bottom-4 right-4 w-80 border shadow-lg bg-background z-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{getIcon(notification.type)}</div>
          <div className="flex-1">
            <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
            <p className="text-sm text-text-secondary mb-3">
              {notification.message}
            </p>
            <div className="flex items-center justify-between">
              {notification.action && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={notification.action.onClick}
                >
                  {notification.action.label}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
