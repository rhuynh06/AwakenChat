"use client"; // <- not server component (prone to hydration errors)

import { useEffect, useState } from "react";
import { CreateServerlModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerlModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";

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
            <EditServerlModal />
            <MembersModal />
        </>
    )
}