import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export default function Knowledge() {
  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-surface border-border">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl text-text-primary">Knowledge Base</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-text-secondary text-lg">
              Knowledge management features coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}