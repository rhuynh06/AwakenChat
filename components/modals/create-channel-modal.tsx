"use client";

import qs from "query-string";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from "next/navigation";
import { ChannelType } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(
        name => name !== "general",
        { message: 'Channel name cannot be "general" '}
    ),
    type: z.nativeEnum(ChannelType)
});

export const CreateChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const params = useParams();

    const isModalOpen = isOpen && type === "createChannel";
    const { channelType } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channelType || ChannelType.TEXT
        }
    });

    useEffect(() => {
        if (channelType) {
            form.setValue("type", channelType);
        } else {
            form.setValue("type", ChannelType.TEXT);
        }
    }, [channelType, form]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params?.serverId
                }
            });
            await axios.post(url, values);
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log("There was an error with creating the server: ", error);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-gray-900 p-0 overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-3xl font-extrabold text-center tracking-wide">
                        Create Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 px-6 pb-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-semibold text-gray-500 dark:text-gray-400">
                                        Channel name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            className="bg-gray-100 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-zinc-600 dark:text-zinc-200 placeholder-gray-600 disabled:opacity-50"
                                            placeholder="Enter channel name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600 dark:text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-semibold text-gray-500 dark:text-gray-400">
                                        Channel Type
                                    </FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-zinc-600 dark:text-zinc-200 w-full capitalize disabled:opacity-50">
                                                <SelectValue placeholder="Select a channel type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white dark:bg-gray-700 rounded-md shadow-lg">
                                            {Object.values(ChannelType).map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                    className="capitalize text-gray-900 dark:text-gray-100"
                                                >
                                                    {type.toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-600 dark:text-red-400" />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button disabled={isLoading} variant="primary" className="w-full">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
