import React from "react";

export function BookmarkAddIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        fill="currentColor"
        d="M24 16v10.752l-7.096-3.59-.904-.457-.9.456L8 26.748V4h10V2H8a2 2 0 00-2 2v26l10-5.054L26 30V16z"
      />
      <path
        fill="currentColor"
        d="M26 6L26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6 26 6z"
      />
    </svg>
  );
}
