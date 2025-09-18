'use client'

import { Doc } from "@/convex/_generated/dataModel";
import { useCreateNewChat } from "@/hooks/useCreateNewChat";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import UserSearch from "./UserSearch";
import Image from "next/image";

export function NewChatDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<Doc<"users">[]>([]);
    const [groupName, setGroupName] = useState("");
    const createNewChat = useCreateNewChat();
    const { user } = useUser();
    const { setActiveChannel } = useChatContext();

    const handleSelectUser = (user: Doc<"users">) => {
        if (selectedUsers.find((u) => u._id === user._id)) {
            setSelectedUsers((prev) => [...prev, user]);
        }

    };

    const removeUser = (userId: string) => {
        setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            setSelectedUsers([]);
            setGroupName("");
        }
    };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogTrigger asChild>
      {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Start a New Chat</DialogTitle>
        <DialogDescription>
          Search users to start a new chat with.
        </DialogDescription>
      </DialogHeader>
      {/* Content for selecting users and creating chat goes here */}
      <div className="space-y-4">
        <UserSearch onSelectUser={handleSelectUser} className="w-full"/>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              Selected Users ({selectedUsers.length})
              </h4>

              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {selectedUsers.map((user) => (
                  <div 
                  key={user._id} 
                  className="flex items-center justify-between p-2 border border-border rounded-lg bg-muted/50">
                    <div>
                      <Image
                       src={user.imageUrl}
                       alt={user.name}
                       width={24}
                       height={24}
                       className="h-6 w-6 rounded-full object-cover"
                       />
                    </div>
                  </div>
                )}
              </div>
          </div>
        )}
      </div>
    </DialogContent>
    </Dialog>
  )
      
  
}