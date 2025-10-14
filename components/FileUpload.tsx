"use client";

import React, { useRef, useState } from "react";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { IKContext, IKImage, IKUpload, IKVideo } from "imagekitio-react";
import { ImageKitProvider } from "@imagekit/next";
import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: unknown) {
    throw new Error(
      `Authentication request failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
};
interface Props {
  onFileChange: (filePath: string) => void;
  variant?: "dark" | "light";
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  value?: string;
}
const FileUpload = ({
  onFileChange,
  variant,
  type,
  accept,
  placeholder,
  folder,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === "dark" ? "bg-neutral-200" : "bg-neutral-800",
    placeholder: variant === "dark" ? "text-neutral-100" : "text-neutral-900",
    text: variant === "dark" ? "text-gold" : "text-neutral-900 ",
    image: variant === "dark" ? "" : "",
    uploadButton:
      variant === "dark"
        ? "flex cursor-pointer mt-2 gap-2"
        : "flex  cursor-pointer flex-col gap-1    items-center ",
  };
  const onError = (error: any) => {
    toast.error(
      `${type} upload failed. ${error.filePath} could not be uploaded`,
    );
  };
  const onSuccess = (res: any) => {
    toast.success(
      `${type} uploaded Successfully. ${res.filePath} uploaded successfully`,
    );

    setFile(res);
    onFileChange(res.filePath);
  };
  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size should be less than 20MB");
        return false;
      }
    }
    return true;
  };
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden "
        ref={ikUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        // className="flex cursor-pointer mt-2 gap-2"
        className={styles.uploadButton}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <UploadIcon className="" />
        <p className={styles.text}>{placeholder}</p>

        {file && <p>{file.filePath}</p>}
      </button>
      {progress > 0 && (
        <div
          className={
            variant === "dark" ? "w-full rounded-full bg-green-200" : "hidden"
          }
        >
          <div
            className="text-2xl text-center text-black font-bebas font-bold"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
      {file &&
        (type === "image" ? (
          <IKImage
            className="  flex flex-col items-center justify-center"
            alt={file.filePath}
            path={file.filePath}
            width={styles.image}
          />
        ) : type === "video" ? (
          <IKVideo path={file.filePath} controls={true} />
        ) : null)}
    </IKContext>
  );
};
export default FileUpload;
