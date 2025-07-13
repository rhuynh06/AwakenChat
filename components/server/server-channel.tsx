"use client";

import { cn } from "@/lib/utils";
import { Channel, Server, MemberRole, ChannelType } from "@prisma/client";
import { Lock, Edit, Hash, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionToolTip } from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];
    const isSelected = params?.channelId === channel.id;

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
    };

    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, { channel, server });
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "group flex items-center gap-x-2 w-full rounded-md px-3 py-2 transition",
                "hover:bg-zinc-100 dark:hover:bg-zinc-700/50",
                isSelected && "bg-zinc-200 dark:bg-zinc-700"
            )}
        >
            <Icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />

            <p
                className={cn(
                    "text-sm font-medium line-clamp-1 transition",
                    "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200",
                    isSelected && "text-primary dark:text-white"
                )}
            >
                {channel.name}
            </p>

            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionToolTip label="Edit">
                        <Edit
                            onClick={(e) => onAction(e, "editChannel")}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
                        />
                    </ActionToolTip>
                    <ActionToolTip label="Delete">
                        <Trash
                            onClick={(e) => onAction(e, "deleteChannel")}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition"
                        />
                    </ActionToolTip>
                </div>
            )}

            {channel.name === "general" && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            )}
        </button>
    );
};
