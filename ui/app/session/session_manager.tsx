"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useResponseContext } from "../contexts/responseContext";
const Session = dynamic(() => import("@/app/session/session"), { ssr: false });

export default function SessionManager({ version }: { version: string }) {
  const [sessionCnt, setSessionCnt] = React.useState(0);
  const { isGeneratingResponse, toggleResponseGeneration } = useResponseContext();
  const refreshSession = () => {
    setSessionCnt(sessionCnt + 1);
    toggleResponseGeneration(false);
  };
  return (
    <Session
      key={sessionCnt}
      refreshSession={refreshSession}
      version={version}
    />
  );
}
