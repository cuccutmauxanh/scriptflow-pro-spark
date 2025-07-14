import { Layout } from "@/components/layout";
import { RAGAssistant } from "@/components/rag-assistant";

export default function Assistant() {
  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            AI Writing Assistant
          </h1>
          <p className="text-text-secondary mt-2">
            Get personalized suggestions and insights for your content
          </p>
        </div>
        <RAGAssistant />
      </div>
    </Layout>
  );
}
