"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  UserPlus,
  Settings,
  Users,
  PlusCircle,
  Trash,
  LogOut,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-full flex items-center justify-between px-3 h-12 text-md font-semibold border-b-2 border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition focus:outline-none"
          type="button"
        >
          {server.name}
          <ChevronDown className="h-5 w-5 ml-2 text-zinc-600 dark:text-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 space-y-1 text-sm font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="flex items-center px-3 py-2 text-indigo-600 dark:text-indigo-400 cursor-pointer"
          >
            Invite People
            <UserPlus className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="flex items-center px-3 py-2 cursor-pointer"
          >
            Server Settings
            <Settings className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="flex items-center px-3 py-2 cursor-pointer"
          >
            Manage Members
            <Users className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="flex items-center px-3 py-2 cursor-pointer"
          >
            Create Channel
            <PlusCircle className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="flex items-center px-3 py-2 text-rose-500 cursor-pointer"
          >
            Delete Server
            <Trash className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="flex items-center px-3 py-2 text-rose-500 cursor-pointer"
          >
            Leave Server
            <LogOut className="ml-auto w-4 h-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
