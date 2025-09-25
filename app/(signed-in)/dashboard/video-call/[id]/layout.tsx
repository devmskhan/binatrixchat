"use client"
import { createToken } from "@/actions/createToken"
import { useUser } from "@clerk/nextjs"
import {
    Call,
    CallingState,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("NEXT_PUBLIC_STREAM_API_KEY is not defined")
}

function layout({children}: {children: React.ReactNode}) {
    const { user } = useUser()
    const { id } = useParams()
    const [call, setCall] = useState<Call | null>(null)
    const [error,setError] = useState<string | null>(null)
    const [client,setClient] = useState<StreamVideoClient | null>(null)

    const streamUser = useMemo(() => {
        if (!user) return null
        
        return {
            id: user.id,
            name:
                user.fullName && user.emailAddresses[0]?.emailAddress || "Unknown User",
                image: user.imageUrl || "",
                type: "authenticated" as const,
        }
    }, [user])


    //Create token provider function outside of useMemo to avoid recreating it on every render
    const tokenProvider = useCallback(async () => {
        if (!user?.id) {
            throw new Error("User not authenticated")
        }
        return await createToken(user.id);
    }, [user?.id])

    //Initialize client in UseEffect to avoid side effects during render
    useEffect(() => {
        if (!streamUser) {
            setClient(null)
            return
        }

        const newClient = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
            user: streamUser,
            tokenProvider,
        });

        setClient(newClient);

        return () => {
            newClient.disconnectUser().catch(console.error);
        };
    }, [streamUser, tokenProvider]);

    //Effect to handle call setup
    useEffect(() => {
        if (!client || !id) return;

        setError(null);
        const streamCall = client.call("default", id as string);

        const joinCall = async () => {
            try {
                await streamCall.join({ create: true });
                setCall(streamCall);
            } catch (error) {
                console.error("Error joining call:", error);
                setError("Failed to join the call. Please try again.");
            }
        };
        joinCall();

        //Cleanup function to leave call on unmount
        return () => {
            if (streamCall && streamCall.state.callingState !== CallingState.JOINED) {
                streamCall.leave().catch(console.error);
            }
        }
    },[id, client]);
    

    if (!client) {
        return <div>Loading...</div>
    }

    if (!call) {
        return <div>Loading...</div>
    }
  return (
    <StreamVideo client={client}>
        <StreamTheme className="text-white">
            <StreamCall call={call}>
                {children}
            </StreamCall>
        </StreamTheme>
    </StreamVideo>
  )
}

export default layout