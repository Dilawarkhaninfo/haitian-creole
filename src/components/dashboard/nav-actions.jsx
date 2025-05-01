"use client"

import * as React from "react"
import {
    ArrowDown,
    ArrowUp,
    Bell,
    Copy,
    CornerUpLeft,
    CornerUpRight,
    DollarSign,
    FileText,
    GalleryVerticalEnd,
    LineChart,
    LogOut,
    MoreHorizontal,
    Settings2,
    Star,
    Trash,
    Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Link } from "react-router-dom"



export function NavActions() {

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isPricingOpen, setIsPricingOpen] = React.useState(false);

    // Function to handle opening the pricing modal and updating URL
    const handleUpgradePlanClick = () => {
        setIsPricingOpen(true);
        setIsPopoverOpen(false); // Close the popover
        window.history.pushState(null, "", "localhost:3000/chat#pricing"); // Update URL
    };


    return (
        <div className="flex items-center gap-2 text-sm">
            {/* <div className="hidden font-medium text-muted-foreground md:inline-block">
                Edit Oct 08
            </div> */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Avatar className="size-9">
                        <AvatarImage alt="@shadcn" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent
                    className="w-56 overflow-hidden rounded-lg p-0"
                    align="end"
                >
                    <Sidebar collapsible="none" className="bg-transparent">
                        <SidebarContent>
                            <SidebarGroup className="border-b last:border-none">
                                <SidebarGroupContent className="gap-0">
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={handleUpgradePlanClick}>
                                                <DollarSign /> <span>Upgrade Plan</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                            <SidebarGroup className="border-b last:border-none">
                                <SidebarGroupContent className="gap-0">
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <Link  to="/">
                                                <SidebarMenuButton>
                                                    <LogOut /> <span>Logout</span>
                                                </SidebarMenuButton>
                                            </Link>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>

                        </SidebarContent>
                    </Sidebar>
                </PopoverContent>
            </Popover>

            <Dialog open={isPricingOpen} onOpenChange={setIsPricingOpen} >
                <DialogContent className="max-w-full h-[90vh] p-0 m-0 flex flex-col ">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>Pricing Plans</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 p-6 overflow-auto">
                        {/* Placeholder content for pricing */}
                        <h2 className="text-2xl font-bold mb-4">Choose Your Plan</h2>
                        <p className="text-muted-foreground mb-6">
                            Unlock premium features with our subscription plans.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold">Free</h3>
                                <p>$0/month</p>
                                <Button className="mt-4">Select</Button>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold">Basic</h3>
                                <p>$9/month</p>
                                <Button className="mt-4">Select</Button>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold">Pro</h3>
                                <p>$19/month</p>
                                <Button className="mt-4">Select</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
