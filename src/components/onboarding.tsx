import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  ArrowRight,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface UserPreferences {
  name: string;
  role: string;
  experience: string;
  platforms: string[];
  contentTypes: string[];
  goals: string[];
  writingStyle: string;
  audience: string;
}

export function OnboardingFlow({
  isOpen,
  onComplete,
}: {
  isOpen: boolean;
  onComplete: (preferences: UserPreferences) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: "",
    role: "",
    experience: "",
    platforms: [],
    contentTypes: [],
    goals: [],
    writingStyle: "",
    audience: "",
  });

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to AutoScriptor Pro!",
      description: "Let's set up your AI to create perfect content for you",
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6 text-center animate-in fade-in duration-500">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-700 delay-200">
            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <div className="animate-in slide-in-from-bottom duration-500 delay-300">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              AutoScriptor Pro
            </h2>
            <p className="text-text-secondary">
              AI-powered script generation with collaboration and analytics
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-500 delay-500">
            <div className="p-4 bg-surface rounded-lg hover:scale-105 transition-transform duration-300">
              <Video className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">Multi-platform</h3>
              <p className="text-xs text-text-secondary">
                YouTube, TikTok, Instagram
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg hover:scale-105 transition-transform duration-300">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">Team Collaboration</h3>
              <p className="text-xs text-text-secondary">Real-time editing</p>
            </div>
            <div className="p-4 bg-surface rounded-lg hover:scale-105 transition-transform duration-300">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">AI Insights</h3>
              <p className="text-xs text-text-secondary">
                Performance optimization
              </p>
            </div>
            <div className="p-4 bg-surface rounded-lg hover:scale-105 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm">Export Formats</h3>
              <p className="text-xs text-text-secondary">PDF, DOCX, SRT</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "profile",
      title: "Personal Information",
      description: "Help AI understand you to provide personalized suggestions",
      icon: <Users className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
          <div className="space-y-4">
            <div className="space-y-2 animate-in fade-in duration-500 delay-100">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={preferences.name}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your name"
                className="transition-all duration-300 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2 animate-in fade-in duration-500 delay-200">
              <Label>Your Role</Label>
              <Select
                value={preferences.role}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content-creator">
                    Content Creator
                  </SelectItem>
                  <SelectItem value="marketer">Marketer</SelectItem>
                  <SelectItem value="educator">Educator</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 animate-in fade-in duration-500 delay-300">
              <Label>Content Creation Experience</Label>
              <Select
                value={preferences.experience}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, experience: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">
                    Beginner (under 1 year)
                  </SelectItem>
                  <SelectItem value="intermediate">
                    Intermediate (1-3 years)
                  </SelectItem>
                  <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                  <SelectItem value="expert">Expert (over 5 years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "platforms",
      title: "Platforms & Content Types",
      description:
        "Choose the platforms and content types you typically create",
      icon: <Video className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
          <div className="space-y-4">
            <div className="animate-in fade-in duration-500 delay-100">
              <Label className="text-base font-medium">Platforms you use</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  "YouTube",
                  "TikTok",
                  "Instagram",
                  "Facebook",
                  "Twitter",
                  "LinkedIn",
                ].map((platform, index) => (
                  <div
                    key={platform}
                    className={`flex items-center space-x-2 animate-in fade-in duration-300 delay-${100 + index * 50}`}
                  >
                    <Checkbox
                      id={platform}
                      checked={preferences.platforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences((prev) => ({
                            ...prev,
                            platforms: [...prev.platforms, platform],
                          }));
                        } else {
                          setPreferences((prev) => ({
                            ...prev,
                            platforms: prev.platforms.filter(
                              (p) => p !== platform,
                            ),
                          }));
                        }
                      }}
                      className="transition-all duration-200 hover:scale-110"
                    />
                    <Label
                      htmlFor={platform}
                      className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                    >
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-in fade-in duration-500 delay-400">
              <Label className="text-base font-medium">
                Content types you create
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  "Tutorial",
                  "Review",
                  "Vlog",
                  "Educational",
                  "Entertainment",
                  "Business",
                ].map((type, index) => (
                  <div
                    key={type}
                    className={`flex items-center space-x-2 animate-in fade-in duration-300 delay-${400 + index * 50}`}
                  >
                    <Checkbox
                      id={type}
                      checked={preferences.contentTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences((prev) => ({
                            ...prev,
                            contentTypes: [...prev.contentTypes, type],
                          }));
                        } else {
                          setPreferences((prev) => ({
                            ...prev,
                            contentTypes: prev.contentTypes.filter(
                              (t) => t !== type,
                            ),
                          }));
                        }
                      }}
                      className="transition-all duration-200 hover:scale-110"
                    />
                    <Label
                      htmlFor={type}
                      className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "goals",
      title: "Goals & Style",
      description: "Define your goals and writing style preferences",
      icon: <Target className="w-8 h-8 text-primary" />,
      component: (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
          <div className="space-y-4">
            <div className="animate-in fade-in duration-500 delay-100">
              <Label className="text-base font-medium">Primary goals</Label>
              <div className="grid grid-cols-1 gap-3 mt-3">
                {[
                  "Increase subscribers/followers",
                  "Improve engagement",
                  "Create content faster",
                  "Learn better scriptwriting",
                  "Build personal brand",
                  "Increase revenue",
                ].map((goal, index) => (
                  <div
                    key={goal}
                    className={`flex items-center space-x-2 animate-in fade-in duration-300 delay-${100 + index * 50}`}
                  >
                    <Checkbox
                      id={goal}
                      checked={preferences.goals.includes(goal)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences((prev) => ({
                            ...prev,
                            goals: [...prev.goals, goal],
                          }));
                        } else {
                          setPreferences((prev) => ({
                            ...prev,
                            goals: prev.goals.filter((g) => g !== goal),
                          }));
                        }
                      }}
                      className="transition-all duration-200 hover:scale-110"
                    />
                    <Label
                      htmlFor={goal}
                      className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                    >
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 animate-in fade-in duration-500 delay-400">
              <Label>Writing style</Label>
              <Select
                value={preferences.writingStyle}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, writingStyle: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                  <SelectValue placeholder="Choose style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="humorous">Humorous & Fun</SelectItem>
                  <SelectItem value="educational">
                    Educational & Informative
                  </SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 animate-in fade-in duration-500 delay-500">
              <Label>Target audience</Label>
              <Select
                value={preferences.audience}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, audience: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300 hover:border-primary/50">
                  <SelectValue placeholder="Choose audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teens">Teenagers (13-17)</SelectItem>
                  <SelectItem value="young-adults">
                    Young Adults (18-30)
                  </SelectItem>
                  <SelectItem value="adults">Adults (30-50)</SelectItem>
                  <SelectItem value="professionals">Professionals</SelectItem>
                  <SelectItem value="general">General Audience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "complete",
      title: "Setup Complete!",
      description: "Your AI is ready to create personalized content",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      component: (
        <div className="space-y-6 text-center animate-in fade-in duration-500">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-700 delay-200">
            <CheckCircle className="w-12 h-12 text-green-500 animate-pulse" />
          </div>
          <div className="animate-in slide-in-from-bottom duration-500 delay-300">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Perfect!
            </h2>
            <p className="text-text-secondary">
              AutoScriptor Pro has been personalized for you
            </p>
          </div>

          <div className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-500">
            <div className="p-4 bg-surface rounded-lg text-left">
              <h3 className="font-medium text-text-primary mb-2">
                What you'll get:
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Scripts optimized for {preferences.platforms.join(", ")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {preferences.writingStyle} style matching your audience
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI insights based on your goals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Real-time performance improvement suggestions
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:scale-105 transition-transform duration-200"
              >
                <Play className="w-4 h-4" />
                Quick Start
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:scale-105 transition-transform duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Tutorials
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:scale-105 transition-transform duration-200"
              >
                <Lightbulb className="w-4 h-4" />
                Tips
              </Button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return preferences.name && preferences.role && preferences.experience;
      case 2:
        return (
          preferences.platforms.length > 0 &&
          preferences.contentTypes.length > 0
        );
      case 3:
        return (
          preferences.goals.length > 0 &&
          preferences.writingStyle &&
          preferences.audience
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="animate-pulse">{steps[currentStep].icon}</div>
              <div>
                <DialogTitle className="text-left">
                  {steps[currentStep].title}
                </DialogTitle>
                <p className="text-sm text-text-secondary">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="animate-in slide-in-from-right duration-300"
            >
              {currentStep + 1} / {steps.length}
            </Badge>
          </div>
          <Progress
            value={progress}
            className="w-full transition-all duration-500 ease-out"
          />
        </DialogHeader>

        <div className="py-6">{steps[currentStep].component}</div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="gap-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Get Started
                <Rocket className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function QuickTour({
  isOpen,
  onComplete,
}: {
  isOpen: boolean;
  onComplete: () => void;
}) {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "AI Chat Assistant",
      description:
        "Describe your content ideas and AI will automatically generate scripts",
      target: "chat-input",
    },
    {
      title: "Smart Suggestions",
      description: "Get improvement suggestions based on performance data",
      target: "suggestions-tab",
    },
    {
      title: "Collaborative Editing",
      description: "Invite team members to edit scripts in real-time",
      target: "share-button",
    },
    {
      title: "Export Options",
      description: "Export scripts to multiple formats: PDF, DOCX, SRT",
      target: "export-button",
    },
    {
      title: "Version History",
      description: "Track changes and revert to previous versions",
      target: "history-button",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md animate-in zoom-in duration-300">
        <DialogHeader>
          <DialogTitle>Quick Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">
              {tips[currentTip].title}
            </h3>
            <p className="text-text-secondary text-sm mt-2">
              {tips[currentTip].description}
            </p>
          </div>

          <div className="flex justify-center space-x-2">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTip ? "bg-primary scale-125" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onComplete}
            className="hover:scale-105 transition-transform duration-200"
          >
            Skip
          </Button>
          <div className="space-x-2">
            {currentTip > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentTip(currentTip - 1)}
                className="hover:scale-105 transition-transform duration-200"
              >
                Previous
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentTip < tips.length - 1) {
                  setCurrentTip(currentTip + 1);
                } else {
                  onComplete();
                }
              }}
              className="hover:scale-105 transition-transform duration-200"
            >
              {currentTip === tips.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
