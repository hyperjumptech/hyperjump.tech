import { marked } from "marked";
import { Card, CardContent } from "@/components/ui/card";

type NewsSummary = {
  summary: string;
};

const API_URL = "https://chat.hyperjump.tech/media-pulse/v1/news-summaries";

export async function MediaPulse() {
  const response = await fetch(API_URL);
  if (!response.ok || response.status < 200 || response.status > 299) {
    return null;
  }

  const newsSummaries: NewsSummary[] = await response.json();

  return (
    <div className="mx-auto mb-10 max-h-96 max-w-3xl space-y-4 overflow-y-auto">
      {newsSummaries.map(({ summary }, index) => (
        <Card key={index}>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(summary) }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
