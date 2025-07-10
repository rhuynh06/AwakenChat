"use client";

import { X } from "lucide-react";
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing";
// import "@uploadthing/react/styles.css";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile"
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-50 w-45">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            className="
             p-[30%]
             border-[0.5px] border-gray-200
             flex flex-col items-center
             [&>*:first-child]:w-auto 
             [&>*:first-child]:h-10 
             [&>*:first-child]:opacity-40 
             [&>*:nth-child(2)]:mt-[5%]
             [&>*:nth-child(2)]:transition-colors 
             [&>*:nth-child(2):hover]:text-blue-500
             [&>button]:bg-blue-500 [&>button]:text-white [&>button]:opacity-0
             [&>button]:transition-opacity [&>button]:duration-300 [&>button]:rounded-md
             [&>button]:px-2 [&>button]:py-0 [&>button]:mt-3 [&>button]:text-sm
             [&>button]:enabled:opacity-100 [&>button]:enabled:pointer-events-auto
            "
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].ufsUrl);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}