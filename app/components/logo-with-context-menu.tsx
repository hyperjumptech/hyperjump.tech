"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/hooks/use-toast";

export default function LogoWithContextMenu({
  downloadables,
  children,
}: {
  downloadables: { text: string; url: string; fileName: string }[];
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const downloadImage = async (imgUrl: string, fileName: string) => {
    try {
      const response = await fetch(
        imgUrl.startsWith("http")
          ? imgUrl
          : `${window.location.origin}${imgUrl}`
      );
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);

      toast({
        title: "Logo downloaded",
        description: `${fileName} logo has been downloaded`,
      });
    } catch (error) {
      console.error("Failed to download logo:", error);
      toast({
        title: "Error",
        description: "Failed to download logo. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {downloadables.map((downloadable, i) => (
          <ContextMenuItem
            key={i}
            onSelect={() => {
              downloadImage(downloadable.url, downloadable.fileName);
            }}
          >
            {downloadable.text}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
