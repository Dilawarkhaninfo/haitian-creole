import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

export function NavMain({ items, onChatNameUpdate }) {
    const navigate = useNavigate();
    const { isMobile, setOpen: setSidebarOpen, open: sidebarOpen } = useSidebar();

    const handleLinkClick = (e, item) => {
        e.preventDefault(); // Prevent default navigation
        const name = prompt("Please enter the name of the chat:");
        if (name) {
            onChatNameUpdate(name); // Send the chat name to DashboardLayout
            console.log(`Navigating to ${item.url} with chat name: ${name}`);
            navigate(item.url); // Navigate to the route

            // Debug the sidebar state
            console.log("isMobile:", isMobile, "sidebarOpen:", sidebarOpen);

            // Close sidebar if on mobile, regardless of current open state
            if (isMobile) {
                setSidebarOpen(false);
                console.log("Sidebar should now close");
            }
        }
    };

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url} onClick={(e) => handleLinkClick(e, item)}>
                            <item.icon />
                            <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}