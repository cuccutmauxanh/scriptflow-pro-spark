import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  Users,
  Shield,
  Edit3,
  Trash2,
  Crown,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Settings,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Mock team data
const teamMembers = [
  {
    id: "1",
    name: "Phuong Nam Tran",
    email: "nam@example.com",
    role: "Owner",
    avatar: "",
    status: "active",
    lastActive: "2 minutes ago",
    scriptsCreated: 45,
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Editor",
    avatar: "",
    status: "active",
    lastActive: "1 hour ago",
    scriptsCreated: 23,
    permissions: ["edit", "create", "export"],
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "Contributor",
    avatar: "",
    status: "away",
    lastActive: "3 hours ago",
    scriptsCreated: 12,
    permissions: ["create", "edit_own"],
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Viewer",
    avatar: "",
    status: "active",
    lastActive: "5 minutes ago",
    scriptsCreated: 0,
    permissions: ["view"],
  },
];

const rolePermissions = {
  Owner: {
    color: "bg-yellow-500/20 text-yellow-400",
    icon: Crown,
    permissions: [
      "Toàn quyền truy cập",
      "Quản lý team",
      "Cài đặt doanh nghiệp",
      "Thanh toán",
    ],
  },
  Admin: {
    color: "bg-red-500/20 text-red-400",
    icon: Shield,
    permissions: [
      "Quản lý thành viên",
      "Tạo/chỉnh sửa script",
      "Export/Share",
      "Xem analytics",
    ],
  },
  Editor: {
    color: "bg-blue-500/20 text-blue-400",
    icon: Edit3,
    permissions: [
      "Tạo/chỉnh sửa script",
      "Export script",
      "Xem analytics",
      "Comment",
    ],
  },
  Contributor: {
    color: "bg-green-500/20 text-green-400",
    icon: Users,
    permissions: ["Tạo script", "Chỉnh sửa script của mình", "Comment"],
  },
  Viewer: {
    color: "bg-gray-500/20 text-gray-400",
    icon: Users,
    permissions: ["Chỉ xem script", "Comment"],
  },
};

const activityLog = [
  {
    id: "1",
    user: "Sarah Johnson",
    action: "edited script",
    target: "Complete Guide to React Hooks",
    timestamp: "2 minutes ago",
    type: "edit",
  },
  {
    id: "2",
    user: "Mike Chen",
    action: "created new script",
    target: "AI Tools for Content Creation",
    timestamp: "1 hour ago",
    type: "create",
  },
  {
    id: "3",
    user: "Emma Davis",
    action: "commented on",
    target: "My Morning Routine as a Developer",
    timestamp: "3 hours ago",
    type: "comment",
  },
  {
    id: "4",
    user: "Phuong Nam Tran",
    action: "invited",
    target: "emma@example.com",
    timestamp: "1 day ago",
    type: "invite",
  },
];

export default function Team() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Viewer");
  const { toast } = useToast();

  const handleInviteMember = () => {
    if (!newMemberEmail) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send invitation.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${newMemberEmail} as ${newMemberRole}.`,
    });

    setNewMemberEmail("");
    setNewMemberRole("Viewer");
    setIsInviteDialogOpen(false);
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    toast({
      title: "Role updated",
      description: `Member role has been updated to ${newRole}.`,
    });
  };

  const handleRemoveMember = (memberId: string) => {
    toast({
      title: "Member removed",
      description: "Team member has been removed from the workspace.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "away":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "offline":
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Team Management
            </h1>
            <p className="text-text-secondary mt-2">
              Manage your team members and their permissions
            </p>
          </div>

          <Dialog
            open={isInviteDialogOpen}
            onOpenChange={setIsInviteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite New Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newMemberRole}
                    onValueChange={setNewMemberRole}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                      <SelectItem value="Contributor">Contributor</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleInviteMember} className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsInviteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-surface border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">
                        Total Members
                      </p>
                      <p className="text-text-primary text-xl font-bold">
                        {teamMembers.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">Active Now</p>
                      <p className="text-text-primary text-xl font-bold">
                        {
                          teamMembers.filter((m) => m.status === "active")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Edit3 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">
                        Scripts Created
                      </p>
                      <p className="text-text-primary text-xl font-bold">
                        {teamMembers.reduce(
                          (sum, m) => sum + m.scriptsCreated,
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Crown className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm">Admins</p>
                      <p className="text-text-primary text-xl font-bold">
                        {
                          teamMembers.filter((m) =>
                            ["Owner", "Admin"].includes(m.role),
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Members List */}
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-text-primary">
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => {
                    const roleConfig =
                      rolePermissions[
                        member.role as keyof typeof rolePermissions
                      ];
                    const RoleIcon = roleConfig?.icon || Users;

                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-content-bg rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-text-primary font-medium">
                                {member.name}
                              </h4>
                              {getStatusIcon(member.status)}
                            </div>
                            <p className="text-text-secondary text-sm">
                              {member.email}
                            </p>
                            <p className="text-text-muted text-xs">
                              Last active: {member.lastActive}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-text-primary font-medium">
                              {member.scriptsCreated}
                            </p>
                            <p className="text-text-secondary text-xs">
                              Scripts
                            </p>
                          </div>

                          <Badge
                            className={
                              roleConfig?.color ||
                              "bg-gray-500/20 text-gray-400"
                            }
                          >
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {member.role}
                          </Badge>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Edit Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(member.id, "Admin")
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              {member.role !== "Owner" && (
                                <DropdownMenuItem
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Member
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(rolePermissions).map(([role, config]) => {
                const Icon = config.icon;
                return (
                  <Card key={role} className="bg-surface border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-text-primary">
                        <div
                          className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {role}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {config.permissions.map((permission, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-text-secondary text-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-text-primary">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 bg-content-bg rounded-lg border border-border"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-text-primary text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-text-muted text-xs">
                          {activity.timestamp}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
