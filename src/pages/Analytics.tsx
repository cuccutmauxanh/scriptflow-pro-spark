import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  PlayCircle,
  Calendar,
  Download,
  Target,
  Clock,
  Star,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Mock analytics data
const scriptPerformanceData = [
  { name: "Jan", scripts: 12, views: 25000, engagement: 8.5 },
  { name: "Feb", scripts: 18, views: 42000, engagement: 9.2 },
  { name: "Mar", scripts: 15, views: 38000, engagement: 7.8 },
  { name: "Apr", scripts: 22, views: 55000, engagement: 10.1 },
  { name: "May", scripts: 28, views: 68000, engagement: 9.8 },
  { name: "Jun", scripts: 25, views: 62000, engagement: 11.2 },
];

const platformDistribution = [
  { name: "YouTube", value: 45, color: "#FF0000" },
  { name: "TikTok", value: 30, color: "#000000" },
  { name: "Instagram", value: 20, color: "#E4405F" },
  { name: "Twitter", value: 5, color: "#1DA1F2" },
];

const topPerformingScripts = [
  {
    title: "Complete Guide to React Hooks",
    platform: "YouTube",
    views: "125K",
    engagement: "12.5%",
    rating: 4.8,
  },
  {
    title: "10 AI Tools That Will Change Your Life",
    platform: "TikTok",
    views: "89K",
    engagement: "15.2%",
    rating: 4.6,
  },
  {
    title: "My Morning Routine as a Developer",
    platform: "Instagram",
    views: "67K",
    engagement: "8.9%",
    rating: 4.4,
  },
  {
    title: "Why TypeScript is Better Than JavaScript",
    platform: "YouTube",
    views: "98K",
    engagement: "11.8%",
    rating: 4.7,
  },
  {
    title: "Quick CSS Tips for Beginners",
    platform: "TikTok",
    views: "45K",
    engagement: "13.1%",
    rating: 4.5,
  },
];

const timeAnalytics = [
  { period: "Morning (6-12)", scripts: 8, avgPerformance: 85 },
  { period: "Afternoon (12-18)", scripts: 15, avgPerformance: 92 },
  { period: "Evening (18-24)", scripts: 12, avgPerformance: 78 },
  { period: "Night (24-6)", scripts: 3, avgPerformance: 65 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const totalStats = useMemo(
    () => ({
      totalScripts: 157,
      totalViews: "2.4M",
      avgEngagement: "9.8%",
      totalRevenue: "$12,450",
      scriptGrowth: "+23%",
      viewGrowth: "+45%",
      engagementGrowth: "+12%",
      revenueGrowth: "+67%",
    }),
    [],
  );

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Analytics Dashboard
            </h1>
            <p className="text-text-secondary mt-2">
              Track your script performance and audience insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Total Scripts
                  </p>
                  <p className="text-text-primary text-2xl font-bold">
                    {totalStats.totalScripts}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">
                      {totalStats.scriptGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Total Views
                  </p>
                  <p className="text-text-primary text-2xl font-bold">
                    {totalStats.totalViews}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">
                      {totalStats.viewGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Avg Engagement
                  </p>
                  <p className="text-text-primary text-2xl font-bold">
                    {totalStats.avgEngagement}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">
                      {totalStats.engagementGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-medium">
                    Revenue
                  </p>
                  <p className="text-text-primary text-2xl font-bold">
                    {totalStats.totalRevenue}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm font-medium">
                      {totalStats.revenueGrowth}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Script Performance Over Time */}
          <Card className="bg-surface border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Script Performance Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scriptPerformanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="name" stroke="hsl(var(--text-secondary))" />
                    <YAxis stroke="hsl(var(--text-secondary))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--surface))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="scripts"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Platform Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {platformDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Time-based Analytics */}
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-text-primary">
                Best Publishing Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeAnalytics}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="period"
                      stroke="hsl(var(--text-secondary))"
                    />
                    <YAxis stroke="hsl(var(--text-secondary))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--surface))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="avgPerformance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Scripts */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-primary">
              Top Performing Scripts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingScripts.map((script, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-content-bg rounded-lg border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-text-primary font-medium">
                        {script.title}
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {script.platform}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-text-primary font-medium">
                        {script.views}
                      </p>
                      <p className="text-text-secondary text-xs">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-text-primary font-medium">
                        {script.engagement}
                      </p>
                      <p className="text-text-secondary text-xs">Engagement</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-text-primary font-medium">
                        {script.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-primary flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h4 className="text-blue-400 font-medium mb-2">
                  Optimal Posting Time
                </h4>
                <p className="text-text-secondary text-sm">
                  Your audience is most active between 2-6 PM. Consider
                  scheduling your next script publication during this window.
                </p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="text-green-400 font-medium mb-2">
                  Content Recommendation
                </h4>
                <p className="text-text-secondary text-sm">
                  Tutorial-style content performs 34% better than other formats
                  for your audience. Focus on educational content.
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="text-purple-400 font-medium mb-2">
                  Platform Strategy
                </h4>
                <p className="text-text-secondary text-sm">
                  Your YouTube scripts have the highest engagement. Consider
                  adapting your top TikTok content for YouTube.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
