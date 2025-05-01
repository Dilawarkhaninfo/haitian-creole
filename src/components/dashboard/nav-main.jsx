import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items, onChatNameUpdate }) {
  const location = useLocation();

  // Check if a path is active
  const isActive = (url) => {
    // Handle exact match for root chat path
    if (url === "/chat" && location.pathname === "/chat") {
      return true;
    }
    
    // Handle child routes
    if (url !== "/chat" && location.pathname.startsWith(url)) {
      return true;
    }
    
    return false;
  };

  // Set the chat name when a navigation item is clicked
  const handleNavClick = (item) => {
    if (onChatNameUpdate) {
      onChatNameUpdate(item.title);
    }
  };

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.url}>
          <SidebarMenuButton
            asChild
            isActive={isActive(item.url)}
          >
            <Link 
              to={item.url} 
              onClick={() => handleNavClick(item)}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}