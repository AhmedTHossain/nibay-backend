"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageModal } from "./ImageModal";

interface ImagePreviewProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function ImagePreview({ src, alt, width, height }: ImagePreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width || undefined}
          height={height || undefined}
          className="object-cover"
        />
      </button>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={src || "/placeholder.svg"}
        alt={alt}
      />
    </>
  );
}
