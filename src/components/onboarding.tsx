import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Sparkles, 
  Video, 
  Target, 
  Users, 
  Rocket, 
  ChevronRight, 
  CheckCircle,
  Play,
  BookOpen,
  Lightbulb,
  ArrowRight
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ReactNode
}

interface UserPreferences {
  name: string
  role: string
  experience: string
  platforms: string[]
  contentTypes: string[]
  goals: string[]
  writingStyle: string
  audience: string
}

export function OnboardingFlow({ isOpen, onComplete }: { isOpen: boolean, onComplete: (preferences: UserPreferences) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: "",
    role: "",
    experience: "",
    platforms: [],
    contentTypes: [],
    goals: [],
    writingStyle: "",
    audience: ""
  })

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Chào mừng đến với AutoScriptor Pro!",
      description: "Hãy cùng thiết lập AI để tạo content hoàn hảo cho bạn",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">AutoScriptor Pro</h2>
            <p className="text-text-secondary">AI-powered script generation với tính năng collaboration và analytics</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface rounded-lg">
              <Video className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">Multi-platform</h3>
              <p className="text-xs text-text-secondary">YouTube, TikTok, Instagram</p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">Team Collaboration</h3>
              <p className="text-xs text-text-secondary">Real-time editing</p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">AI Insights</h3>
              <p className="text-xs text-text-secondary">Performance optimization</p>
            </div>
            <div className="p-4 bg-surface rounded-lg">
              <Rocket className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">Export Formats</h3>
              <p className="text-xs text-text-secondary">PDF, DOCX, SRT</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "profile",
      title: "Thông tin cá nhân",
      description: "Giúp AI hiểu về bạn để đưa ra gợi ý phù hợp",
      icon: <Users className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên của bạn</Label>
              <Input
                id="name"
                value={preferences.name}
                onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nhập tên của bạn"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Vai trò của bạn</Label>
              <Select value={preferences.role} onValueChange={(value) => setPreferences(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content-creator">Content Creator</SelectItem>
                  <SelectItem value="marketer">Marketer</SelectItem>
                  <SelectItem value="educator">Educator</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Kinh nghiệm tạo content</Label>
              <Select value={preferences.experience} onValueChange={(value) => setPreferences(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mức độ kinh nghiệm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Mới bắt đầu (< 1 năm)</SelectItem>
                  <SelectItem value="intermediate">Trung cấp (1-3 năm)</SelectItem>
                  <SelectItem value="advanced">Nâng cao (3-5 năm)</SelectItem>
                  <SelectItem value="expert">Chuyên gia (> 5 năm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "platforms",
      title: "Platforms & Content Types",
      description: "Chọn nền tảng và loại content bạn thường tạo",
      icon: <Video className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Platforms bạn sử dụng</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {["YouTube", "TikTok", "Instagram", "Facebook", "Twitter", "LinkedIn"].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={preferences.platforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences(prev => ({ ...prev, platforms: [...prev.platforms, platform] }))
                        } else {
                          setPreferences(prev => ({ ...prev, platforms: prev.platforms.filter(p => p !== platform) }))
                        }
                      }}
                    />
                    <Label htmlFor={platform} className="text-sm font-normal">{platform}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="text-base font-medium">Loại content bạn tạo</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {["Tutorial", "Review", "Vlog", "Educational", "Entertainment", "Business"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={preferences.contentTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences(prev => ({ ...prev, contentTypes: [...prev.contentTypes, type] }))
                        } else {
                          setPreferences(prev => ({ ...prev, contentTypes: prev.contentTypes.filter(t => t !== type) }))
                        }
                      }}
                    />
                    <Label htmlFor={type} className="text-sm font-normal">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "goals",
      title: "Mục tiêu & Style",
      description: "Xác định mục tiêu và phong cách viết của bạn",
      icon: <Target className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Mục tiêu chính</Label>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {[
                  "Tăng subscriber/follower",
                  "Cải thiện engagement",
                  "Tạo content nhanh hơn", 
                  "Học cách viết script tốt hơn",
                  "Phát triển thương hiệu cá nhân",
                  "Tăng doanh thu"
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={preferences.goals.includes(goal)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences(prev => ({ ...prev, goals: [...prev.goals, goal] }))
                        } else {
                          setPreferences(prev => ({ ...prev, goals: prev.goals.filter(g => g !== goal) }))
                        }
                      }}
                    />
                    <Label htmlFor={goal} className="text-sm font-normal">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Phong cách viết</Label>
              <Select value={preferences.writingStyle} onValueChange={(value) => setPreferences(prev => ({ ...prev, writingStyle: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phong cách" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="humorous">Humorous & Fun</SelectItem>
                  <SelectItem value="educational">Educational & Informative</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Đối tượng mục tiêu</Label>
              <Select value={preferences.audience} onValueChange={(value) => setPreferences(prev => ({ ...prev, audience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đối tượng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teens">Teenagers (13-17)</SelectItem>
                  <SelectItem value="young-adults">Young Adults (18-30)</SelectItem>
                  <SelectItem value="adults">Adults (30-50)</SelectItem>
                  <SelectItem value="professionals">Professionals</SelectItem>
                  <SelectItem value="general">General Audience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "complete",
      title: "Hoàn thành thiết lập!",
      description: "AI đã sẵn sàng tạo content phù hợp với bạn",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      component: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Tuyệt vời!</h2>
            <p className="text-text-secondary">AutoScriptor Pro đã được cá nhân hóa cho bạn</p>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-lg text-left">
              <h3 className="font-medium text-text-primary mb-2">Những gì bạn sẽ nhận được:</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Scripts được tối ưu cho {preferences.platforms.join(", ")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Phong cách {preferences.writingStyle} phù hợp với audience
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI insights dựa trên mục tiêu của bạn
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Gợi ý cải thiện performance real-time
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Play className="w-4 h-4" />
                Quick Start
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Tutorials
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Lightbulb className="w-4 h-4" />
                Tips
              </Button>
            </div>
          </div>
        </div>
      )
    }
  ]

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true
      case 1: return preferences.name && preferences.role && preferences.experience
      case 2: return preferences.platforms.length > 0 && preferences.contentTypes.length > 0
      case 3: return preferences.goals.length > 0 && preferences.writingStyle && preferences.audience
      case 4: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(preferences)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {steps[currentStep].icon}
              <div>
                <DialogTitle className="text-left">{steps[currentStep].title}</DialogTitle>
                <p className="text-sm text-text-secondary">{steps[currentStep].description}</p>
              </div>
            </div>
            <Badge variant="outline">
              {currentStep + 1} / {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </DialogHeader>

        <div className="py-6">
          {steps[currentStep].component}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Quay lại
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="gap-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Bắt đầu
                <Rocket className="w-4 h-4" />
              </>
            ) : (
              <>
                Tiếp tục
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function QuickTour({ isOpen, onComplete }: { isOpen: boolean, onComplete: () => void }) {
  const [currentTip, setCurrentTip] = useState(0)
  
  const tips = [
    {
      title: "AI Chat Assistant",
      description: "Mô tả ý tưởng content của bạn, AI sẽ tạo script tự động",
      target: "chat-input"
    },
    {
      title: "Smart Suggestions",
      description: "Nhận gợi ý cải thiện dựa trên performance data",
      target: "suggestions-tab"
    },
    {
      title: "Collaborative Editing",
      description: "Invite team members để cùng chỉnh sửa script real-time",
      target: "share-button"
    },
    {
      title: "Export Options",
      description: "Export script sang nhiều format: PDF, DOCX, SRT",
      target: "export-button"
    },
    {
      title: "Version History",
      description: "Track changes và revert về version trước đó",
      target: "history-button"
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Tour</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">{tips[currentTip].title}</h3>
            <p className="text-text-secondary text-sm mt-2">{tips[currentTip].description}</p>
          </div>
          
          <div className="flex justify-center space-x-2">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentTip ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onComplete}>
            Bỏ qua
          </Button>
          <div className="space-x-2">
            {currentTip > 0 && (
              <Button variant="outline" onClick={() => setCurrentTip(currentTip - 1)}>
                Trước
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentTip < tips.length - 1) {
                  setCurrentTip(currentTip + 1)
                } else {
                  onComplete()
                }
              }}
            >
              {currentTip === tips.length - 1 ? 'Hoàn thành' : 'Tiếp'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}