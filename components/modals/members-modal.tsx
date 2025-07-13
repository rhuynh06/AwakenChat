"use client";

import axios from "axios";
import qs from "query-string";
import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    ShieldAlert,
    MoreVertical,
    ShieldQuestion,
    Shield,
    Check,
    Gavel,
    Loader2
} from "lucide-react";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
};

export const MembersModal = () => {
    const router = useRouter();
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState("");

    const isModalOpen = isOpen && type === "members";
    const { server } = data as { server: ServerWithMembersWithProfiles };

    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            });
            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    };

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            });
            const response = await axios.patch(url, { role });
            router.refresh();
            onOpen("members", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black dark:bg-gray-800 dark:text-white overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-6 max-h-[420px] px-6 pb-6">
                    <div className="space-y-4">
                        {server?.members?.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600"
                            >
                                <div className="flex items-center gap-x-3">
                                    <UserAvatar src={member.profile.imageUrl} />
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium flex items-center">
                                            {member.profile.name}
                                            {roleIconMap[member.role]}
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {member.profile.email}
                                        </p>
                                    </div>
                                </div>
                                {server.profileId !== member.profileId && loadingId !== member.id && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded">
                                            <MoreVertical className="h-4 w-4 text-zinc-500 dark:text-zinc-300" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            side="left"
                                            className="bg-white dark:bg-gray-800 text-black dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-md"
                                        >
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="w-4 h-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent className="bg-white dark:bg-gray-800 text-black dark:text-white border border-zinc-200 dark:border-zinc-700 shadow-md">
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            Guest
                                                            {member.role === "GUEST" && (
                                                                <Check className="h-4 w-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            Moderator
                                                            {member.role === "MODERATOR" && (
                                                                <Check className="h-4 w-4 ml-auto" />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onKick(member.id)}>
                                                <Gavel className="h-4 w-4 mr-2" />
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                                {loadingId === member.id && (
                                    <Loader2 className="animate-spin text-zinc-500 dark:text-zinc-400 w-4 h-4 ml-auto" />
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
