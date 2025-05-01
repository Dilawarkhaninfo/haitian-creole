
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { NavActions } from "@/components/dashboard/nav-actions"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Outlet } from "react-router-dom"


const DashboardLayout = () => {

    const [chatName, setChatName] = useState(""); // State to store the chat name

    // Callback to update chat name from AppSidebar
    const handleChatNameUpdate = (name) => {
        setChatName(name);
    };
    return (
        <SidebarProvider>
            <AppSidebar onChatNameUpdate={handleChatNameUpdate} />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {/* Display chat name instead of Breadcrumb */}
                        <div className="text-sm font-medium text-foreground line-clamp-1">
                            {chatName}
                        </div>
                    </div>
                    <div className="ml-auto px-3">
                        <NavActions />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 px-4">
                    <div className="mx-auto w-full max-w-3xl rounded-xl" >
                        <Outlet />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout;