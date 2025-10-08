"use client";

import React, { useRef, useState } from "react";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { ImageKitProvider } from "@imagekit/next";
import Image from "next/image";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    toast(" Image Upload failed", {
      description: `${error.filePath} uploaded successfully`,
    });
  };
  const onSuccess = (res: any) => {
    toast("Image uploaded Successfully.", {
      description: `${res.filePath} uploaded successfully`,
    });

    setFile(res);
    onFileChange(res.filePath);
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
        fileName="test-upload.png"
      />
      <button
        className="flex cursor-pointer mt-2 gap-2"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <UploadIcon className="" />
        <p>Upload a File</p>

        {file && <p>{file.filePath}</p>}
      </button>
      {file && <IKImage alt={file.filePath} path={file.filePath} width={150} />}
    </IKContext>
  );
};
export default ImageUpload;
