'use client'

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Channel, ChannelHeader, useChatContext, Window, Thread, MessageList, MessageInput } from "stream-chat-react";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();

  const handleCall = () => {
    console.log("Calling...");
  };

  const handleLeaveChat = () => {
    console.log("Leaving chat...");
  };

  return (
    <div className="flex flex-col w-full flex-1">
      {channel ? (
        <Channel>
          <Window>
            <div className="flex items-center justify-between">
              {channel.data?.member_count === 1 ? (
                <ChannelHeader title="Everyone else has left this chat" />
              ) : (
                <ChannelHeader />
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCall}>
                  <VideoIcon className="mr-2 h-4 w-4" />
                  Video Call
                </Button>

                <Button 
                  variant="outline" 
                  onClick={handleLeaveChat} 
                  className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Leave Chat
                </Button>
              </div>

              <MessageList />

              <div className="sticky bottom-0 w-full bg-background pt-4">
                <MessageInput />
              </div>
            </div>
          </Window>
          <Thread />
        </Channel>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            No chat selected
          </h2>
          <p className="text-muted-foreground mb-8">
            Select a chat from the sidebar or start a new one.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;