"use client";

import { useEffect, useState } from "react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}

function useContentType(url: string | undefined) {
  const [contentType, setContentType] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setContentType(null);
      return;
    }

    let isCancelled = false;

    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (!isCancelled && res.ok) {
          setContentType(res.headers.get("content-type"));
        }
      })
      .catch(() => {
        if (!isCancelled) setContentType(null);
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return contentType;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const contentType = useContentType(value);

  if (value && contentType?.startsWith("image/")) {
    return (
      <div className="relative h-50 w-45">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-4 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && contentType === "application/pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          View PDF
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // fallback / no file selected
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
  );
};