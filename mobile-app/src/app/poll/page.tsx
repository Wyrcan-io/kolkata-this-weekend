"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PollClient from "./[id]/PollClient";

function DynamicPollWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "sat-crew-plan";
  return <PollClient pollId={id} />;
}

export default function PollPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading poll...</div>}>
      <DynamicPollWrapper />
    </Suspense>
  );
}
