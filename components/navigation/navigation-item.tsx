"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionToolTip } from "@/components/action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const isActive = params?.serverId === id;

    const onClick = () => {
        router.push(`/servers/${id}`);
    };

    return (
        <ActionToolTip side="right" align="center" label={name}>
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 w-[4px] rounded-r-full bg-emerald-500 transition-all",
                    isActive ? "h-[36px]" : "h-[8px] group-hover:h-[20px]"
                )} />
                <div className={cn(
                    "relative flex items-center justify-center m-1 mx-3 h-12 w-12 overflow-hidden transition-all",
                    "group-hover:rounded-2xl rounded-full",
                    isActive
                        ? "ring-2 ring-emerald-500"
                        : "bg-neutral-100 dark:bg-neutral-700"
                )}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover inset-0"
                    />
                </div>
            </button>
        </ActionToolTip>
    );
};
