import {
  ArrowUpRight,
  Link as LinkIcon,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AuthService } from "@/services/AuthService";

export function NavHistory({ history = [], loading = false, onDelete, onRefresh }) {
  const { isMobile } = useSidebar();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const baseUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const currentUser = AuthService.getCurrentUser();

  const getDynamicUrl = (id) => `${baseUrl}/chat/${id}`;

  const handleCopyLink = (id) => {
    const url = getDynamicUrl(id);
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  // Function to open URL in new tab
  const handleOpenInNewTab = (id) => {
    const url = getDynamicUrl(id);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Function to handle delete confirmation
  const handleDelete = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    if (selectedItem && onDelete) {
      onDelete(selectedItem); // Call the onDelete prop to remove the item
    }
    setOpenDialog(false);
    setSelectedItem(null);
  };

  // Function to handle refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      toast.success("Refreshed translation history");
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden md:w-[15.7rem] relative">
      <div className="flex items-center justify-between pr-2">
        <SidebarGroupLabel>History</SidebarGroupLabel>
        
        {currentUser && (
          <SidebarGroupAction onClick={handleRefresh} title="Refresh history">
            <RefreshCcw className="w-4 h-4" />
          </SidebarGroupAction>
        )}
      </div>

      <SidebarMenu>
        {loading ? (
          // Show skeletons while loading
          Array.from({ length: 3 }).map((_, index) => (
            <SidebarMenuSkeleton key={index} showIcon={false} />
          ))
        ) : !currentUser ? (
          // Show login prompt if user is not logged in
          <div className="px-2 py-3 text-sm text-muted-foreground">
            Please <a href="/login" className="text-primary hover:underline">login</a> to view your translation history
          </div>
        ) : history.length === 0 ? (
          // Show empty state
          <div className="px-2 py-3 text-sm text-muted-foreground">
            No translation history yet
          </div>
        ) : (
          // Show actual history items
          history.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <a href={getDynamicUrl(item.id)} title={item.name}>
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem onClick={() => handleCopyLink(item.id)}>
                    <LinkIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenInNewTab(item.id)}>
                    <ArrowUpRight className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <div
                      onClick={() => handleDelete(item)}
                      className="flex items-center text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      <span>Delete</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the history item "{selectedItem?.name}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>

            <Button
              onClick={confirmDelete}
              variant="destructive"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarGroup>
  );
}