import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
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
  const htmlNewsSummaries = await Promise.all(
    newsSummaries.map(async ({ summary }) =>
      String(
        await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkCompleteLinks)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process(summary)
      )
    )
  );

  return (
    <div className="mx-auto mb-10 max-h-96 max-w-3xl space-y-4 overflow-y-auto">
      {htmlNewsSummaries.map((summary, index) => (
        <Card key={index}>
          <CardContent>
            <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-md dark:prose-headings:text-white text-left">
              <div
                dangerouslySetInnerHTML={{
                  __html: summary
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function remarkCompleteLinks() {
  return (tree: any) => {
    visit(tree, "link", (node) => {
      try {
        if (!new URL(node.url).protocol) {
          node.url = `https://${node.url}`;
        }
      } catch {
        // not a valid absolute URL; attempt with https://
        node.url = `https://${node.url}`;
      }
    });
  };
}
