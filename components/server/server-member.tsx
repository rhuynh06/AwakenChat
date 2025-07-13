"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMaps = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-6 w-6 ml-2 text-indigo-600 dark:text-indigo-400" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-6 w-6 ml-2 text-rose-600 dark:text-rose-400" />,
};

const roleColorClassMap = {
  [MemberRole.GUEST]: "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300",
  [MemberRole.MODERATOR]: "text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300",
  [MemberRole.ADMIN]: "text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300",
};

export const ServerMember = ({ member }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMaps[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
      type="button"
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm transition",
          roleColorClassMap[member.role],
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};
