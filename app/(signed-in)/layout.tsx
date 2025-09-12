'use client';

import { Chat } from "stream-chat-react"
import UserSyncWrapper from "@/components/UserSyncWrapper";
import streamClient from "@/lib/stream";


function Layout({ children }: { children: React.ReactNode }) {
  return <UserSyncWrapper>
    <Chat client={streamClient}>
    {children}
    </Chat>
  </UserSyncWrapper>
}

export default Layout;