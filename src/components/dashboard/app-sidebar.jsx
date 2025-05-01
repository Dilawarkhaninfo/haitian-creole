import * as React from "react"
import {
    AudioWaveform,
    Command,
    FileText,
    Home,
    Languages,
    Sparkles,
    Speech,
    Type,
} from "lucide-react"

import { NavHistory } from "@/components/dashboard/nav-history"
import { NavMain } from "@/components/dashboard/nav-main"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { H4 } from "../ui/typography"
import { ScrollArea } from "../ui/scroll-area"

// This is sample data.
const data = {
    navMain: [
        // {
        //     title: "New Translation",
        //     url: "#",
        //     icon: Languages,
        // },
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
            url: "document-translate",
            icon: FileText,
        },
        {
            title: "Native Mode",
            url: "/chat/native-mode",
            icon: Sparkles,
        },
    ],
    history: [
        {
            name: "English to Spanish - Meeting Notes",
            id: "chat001",
            url: "localhost:3000/chat/chat001",
        },
        {
            name: "Creole to English - Family Call",
            id: "chat002",
            url: "localhost:3000/chat/chat002",
        },
        {
            name: "French to English - Travel Phrases",
            id: "chat003",
            url: "localhost:3000/chat/chat003",
        },
        {
            name: "Spanish to Creole - Recipe Translation",
            id: "chat004",
            url: "localhost:3000/chat/chat004",
        },
        {
            name: "English to French - Business Email",
            id: "chat005",
            url: "localhost:3000/chat/chat005",
        },
        {
            name: "Creole to Spanish - Language Practice",
            id: "chat006",
            url: "localhost:3000/chat/chat006",
        },
        {
            name: "German to English - Study Notes",
            id: "chat007",
            url: "localhost:3000/chat/chat007",
        },
        {
            name: "English to Creole - Voice Exchange",
            id: "chat008",
            url: "localhost:3000/chat/chat008",
        },
        {
            name: "Italian to English - Movie Subtitles",
            id: "chat009",
            url: "localhost:3000/chat/chat009",
        },
        {
            name: "Japanese to English - Daily Phrases",
            id: "chat010",
            url: "localhost:3000/chat/chat010",
        },
        {
            name: "English to Spanish - Meeting Notes",
            id: "chat001",
            url: "localhost:3000/chat/chat001",
        },
        {
            name: "Creole to English - Family Call",
            id: "chat002",
            url: "localhost:3000/chat/chat002",
        },
        {
            name: "French to English - Travel Phrases",
            id: "chat003",
            url: "localhost:3000/chat/chat003",
        },
        {
            name: "Spanish to Creole - Recipe Translation",
            id: "chat004",
            url: "localhost:3000/chat/chat004",
        },
        {
            name: "English to French - Business Email",
            id: "chat005",
            url: "localhost:3000/chat/chat005",
        },
        {
            name: "Creole to Spanish - Language Practice",
            id: "chat006",
            url: "localhost:3000/chat/chat006",
        },
        {
            name: "German to English - Study Notes",
            id: "chat007",
            url: "localhost:3000/chat/chat007",
        },
        {
            name: "English to Creole - Voice Exchange",
            id: "chat008",
            url: "localhost:3000/chat/chat008",
        },
        {
            name: "Italian to English - Movie Subtitles",
            id: "chat009",
            url: "localhost:3000/chat/chat009",
        },
        {
            name: "Japanese to English - Daily Phrases",
            id: "chat010",
            url: "localhost:3000/chat/chat010",
        },
        {
            name: "English to Spanish - Meeting Notes",
            id: "chat001",
            url: "localhost:3000/chat/chat001",
        },
        {
            name: "Creole to English - Family Call",
            id: "chat002",
            url: "localhost:3000/chat/chat002",
        },
        {
            name: "French to English - Travel Phrases",
            id: "chat003",
            url: "localhost:3000/chat/chat003",
        },
        {
            name: "Spanish to Creole - Recipe Translation",
            id: "chat004",
            url: "localhost:3000/chat/chat004",
        },
        {
            name: "English to French - Business Email",
            id: "chat005",
            url: "localhost:3000/chat/chat005",
        },
        {
            name: "Creole to Spanish - Language Practice",
            id: "chat006",
            url: "localhost:3000/chat/chat006",
        },
        {
            name: "German to English - Study Notes",
            id: "chat007",
            url: "localhost:3000/chat/chat007",
        },
        {
            name: "English to Creole - Voice Exchange",
            id: "chat008",
            url: "localhost:3000/chat/chat008",
        },
        {
            name: "Italian to English - Movie Subtitles",
            id: "chat009",
            url: "localhost:3000/chat/chat009",
        },
        {
            name: "Japanese to English - Daily Phrases",
            id: "chat010",
            url: "localhost:3000/chat/chat010",
        },
    ]

}



export function AppSidebar({ onChatNameUpdate, ...props }) {


    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                {/* <H4 className="capitalize">{import.meta.env.VITE_APP_NAME}</H4> */}
                <SidebarMenu>
                    <SidebarMenuSubItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                                    <AudioWaveform className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold capitalize">{import.meta.env.VITE_APP_NAME}</span>
                                    {/* <span className="truncate text-xs">Enterprise</span> */}
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuSubItem>
                </SidebarMenu>
                <NavMain items={data.navMain} onChatNameUpdate={onChatNameUpdate} />
            </SidebarHeader>
            <SidebarContent >
                <ScrollArea>

                    <NavHistory history={data.history} />

                </ScrollArea>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
