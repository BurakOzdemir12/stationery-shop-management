import React from "react";

export default function TypographyH2({ title }: { title?: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-teal-500 mb-5">
      {title}
    </h2>
  );
}
