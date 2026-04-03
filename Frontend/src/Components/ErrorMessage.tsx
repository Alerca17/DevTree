import React from "react";

type ErrormessageProps = {
  children: React.ReactNode;
};
export default function ErrorMessage({ children }: ErrormessageProps) {
  return (
    <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center">
      {children}
    </p>
  );
}
