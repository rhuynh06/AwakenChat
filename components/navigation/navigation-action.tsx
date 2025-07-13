"use client";

import { Plus } from "lucide-react";
import { ActionToolTip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <ActionToolTip side="right" align="center" label="Add a server">
            <button
                onClick={() => onOpen("createServer")}
                className="group flex items-center focus:outline-none"
                aria-label="Add a server"
            >
                <div className="flex items-center justify-center h-12 w-12 mx-3 rounded-full transition-all duration-200 overflow-hidden bg-neutral-100 dark:bg-neutral-700 group-hover:bg-emerald-500 group-hover:rounded-2xl">
                    <Plus
                        size={25}
                        className="text-emerald-500 group-hover:text-white transition-colors"
                    />
                </div>
            </button>
        </ActionToolTip>
    );
};
