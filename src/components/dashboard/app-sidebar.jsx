import React, { useEffect, useState } from "react";
import {
  AudioWaveform,
  FileText,
  Home,
  Languages,
  Sparkles,
  Speech,
  Type,
} from "lucide-react";

import { NavHistory } from "@/components/dashboard/nav-history";
import { NavMain } from "@/components/dashboard/nav-main";
import { AuthService } from "@/services/AuthService";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ScrollArea } from "../ui/scroll-area";

// Nav main items data
const navMainItems = [
  {
    title: "Voice Exchange",
    url: "/chat",
    icon: Home,
  },
  {
    title: "Text-to-speech",
    url: "/chat/text-to-speech",
    icon: Type,
  },
  {
    title: "Speech-to-text",
    url: "/chat/speech-to-text",
    icon: Speech,
  },
  {
    title: "Document Translation",
    url: "/chat/document-translate",
    icon: FileText,
  },
  {
    title: "Native Mode",
    url: "/chat/native-mode",
    icon: Sparkles,
  },
];

export function AppSidebar({ onChatNameUpdate, ...props }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's translation history
  const fetchTranslationHistory = async () => {
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser();

      if (!currentUser) {
        setHistory([]);
        setLoading(false);
        return;
      }

      const response = await AuthService.getTranslationHistory();

      // Transform the API response to match our history object structure
      const formattedHistory = (response.chats || []).map((chat) => ({
        id: chat.id || chat._id,
        name: chat.name || `Chat ${chat.id || chat._id}`,
        // Add any other properties needed
      }));

      setHistory(formattedHistory);
    } catch (error) {
      console.error("Error fetching translation history:", error);
      toast.error("Failed to load translation history");
    } finally {
      setLoading(false);
    }
  };

  // Handle history item deletion
  const handleDeleteHistory = async (item) => {
    // Here you would implement the API call to delete the history item
    // For now, we'll just remove it from the local state
    setHistory((prev) =>
      prev.filter((historyItem) => historyItem.id !== item.id)
    );
    toast.success("History item deleted");
  };

  // Fetch history on component mount
  useEffect(() => {
    fetchTranslationHistory();

    // You could also add a periodic refresh if needed
    const intervalId = setInterval(fetchTranslationHistory, 60000); // Refresh every minute

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuSubItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-primary text-sidebar-primary-foreground">
                  <AudioWaveform className="size-4" />
                </div>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold capitalize truncate">
                    {import.meta.env.VITE_APP_NAME}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        </SidebarMenu>
        <NavMain items={navMainItems} onChatNameUpdate={onChatNameUpdate} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <NavHistory
            history={history}
            loading={loading}
            onDelete={handleDeleteHistory}
            onRefresh={fetchTranslationHistory}
          />
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
