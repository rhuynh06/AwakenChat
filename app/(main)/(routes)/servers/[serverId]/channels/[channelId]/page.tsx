import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
    const profile = await currentProfile();
    const awaitedParams = await params;

    if (!profile) {
        return redirect("/sign-in");
    }

    const channel = await db.channel.findUnique({
        where: {
            id: awaitedParams.channelId
        }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: awaitedParams.serverId,
            profileId: profile.id,
        }
    });

    if (!channel || !member) {
        return redirect("/");
    }
    
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
        </div>
    );
}
 
export default ChannelIdPage;