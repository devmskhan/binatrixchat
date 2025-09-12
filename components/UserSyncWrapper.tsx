'use client'
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import streamClient from "@/lib/stream";
import { createToken } from "@/actions/createToken";


function UserSyncWrapper({children}: {children: React.ReactNode}) {
    const { user, isLoaded : isUserLoaded} = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Convex mutation to sync user data
    const createOrderUpdateUser = useMutation(api.users.upsertUser);

    const syncUser = useCallback(async () => {
        if (!user?.id) return;

        try {
            setIsLoading(true);
            setError(null);

            const tokenProvider = async () => {
                if (!user?.id) {
                    throw new Error("User is not autjehenticated");
                }

                const token = await createToken(user.id);
                return token;
            }

            // 1.Save or update user in Convex
            await createOrderUpdateUser({
                userId: user.id,
                name:
                user.fullName ||
                user.firstName ||
                user.emailAddresses[0]?.emailAddress ||
                "Unknown User",
                email: user.primaryEmailAddress?.emailAddress || "",
                imageUrl: user.imageUrl || "",
            });


        // 2. Connect user to Stream
        await streamClient.connectUser(
            {
                id: user.id,
                name:
                user.fullName ||
                user.firstName ||
                user.emailAddresses[0]?.emailAddress ||
                "Unknown User",
                image: user.imageUrl || "",
            },
            tokenProvider
        );
               
        } catch (err) {
            console.error("Error syncing user:", err);
            setError(err instanceof Error ? err.message : "Failed to sync user");
        } finally {
            setIsLoading(false);
        }

    }, [user, createOrderUpdateUser]);

    const disconnectUser = useCallback(async () => {
        try {
            await streamClient.disconnectUser();
        } catch (err) {
            console.error("Error disconnecting user:", err);
        }
    }, []);

    useEffect(() => {
        if (isUserLoaded) return;
        
        if (user) {
            syncUser();
        } else {
            disconnectUser();
            setIsLoading(false);
        }

        // Cleanup function
        return () => {
            if (user) {
            disconnectUser();
        }
    };
    }, [isUserLoaded, user, syncUser, disconnectUser]);

    

    // Loadiing state
    if (!isUserLoaded || isLoading) {
        return (
            <LoadingSpinner 
             size="lg"
             message={!isUserLoaded ? "Loading user..." : "Syncing user data..."}
             className="min-h-screen"
            />

        )};

    if (error) {
        return (
            <div className="flex-1 items-center justify-center bg-white px-6">
                <p className="text-red-600 text-lg font-semibold mb-2">Sync Error</p>
                <p className="text-gray500 text-sm text-center">{error}</p>
                <p>
                    Please try refreshing the page, and if the problem persists, contact support.
                </p>
            </div>
        )
    }

  return <>{children}</>
  
}

export default UserSyncWrapper;