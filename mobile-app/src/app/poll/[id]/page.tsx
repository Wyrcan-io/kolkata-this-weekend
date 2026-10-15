import React from "react";
import PollClient from "./PollClient";

export function generateStaticParams() {
  return [
    { id: "sat-crew-plan" },
    { id: "sample" },
  ];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <PollClient pollId={resolvedParams.id} />;
}
