import React, { useState, useEffect } from "react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { NavActions } from "@/components/dashboard/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { AuthService } from "@/services/AuthService"

const DashboardLayout = () => {
    const [chatName, setChatName] = useState(""); 
    const location = useLocation();
     
    // Check if user is logged in
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        
        // Set default chat name based on URL path
        const path = location.pathname;
        if (path === "/chat") {
            setChatName("Voice Exchange");
        } else if (path.includes("text-to-speech")) {
            setChatName("Text-to-speech");
        } else if (path.includes("speech-to-text")) {
            setChatName("Speech-to-text");
        } else if (path.includes("document-translate")) {
            setChatName("Document Translation");
        } else if (path.includes("native-mode")) {
            setChatName("Native Mode");
        }
        
        // If this is a specific chat session and user is logged in, fetch chat details
        if (user && path.match(/\/chat\/[a-zA-Z0-9]+$/) && path !== "/chat/text-to-speech" 
            && path !== "/chat/speech-to-text" && path !== "/chat/document-translate" 
            && path !== "/chat/native-mode") {
            const chatId = path.split("/").pop();
            // Here you could fetch the chat details by ID
            // For now, we'll just set a placeholder
            setChatName(`Translation Session #${chatId}`);
        }
    }, [location.pathname]);

    // Callback to update chat name from AppSidebar
    const handleChatNameUpdate = (name) => {
        setChatName(name);
    };

    return (
        <SidebarProvider>
            <AppSidebar onChatNameUpdate={handleChatNameUpdate} />
            <SidebarInset>
                <header className="flex items-center gap-2 h-14 shrink-0">
                    <div className="flex items-center flex-1 gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="h-4 mr-2" />
                        <div className="text-sm font-medium text-foreground line-clamp-1">
                            {chatName}
                        </div>
                    </div>
                    <div className="px-3 ml-auto">
                        <NavActions />
                    </div>
                </header>
                <div className="flex flex-col flex-1 gap-4 px-4">
                    <div className="w-full max-w-3xl mx-auto rounded-xl" >
                        <Outlet />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout;