"use client"; // <- not server component (prone to hydration errors)

import { CreateServerlModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";

export const ModalProvider = () => {
    // prevent hydration errors
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []); // if server side, don't render

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerlModal />
            <InviteModal />
        </>
    )
}