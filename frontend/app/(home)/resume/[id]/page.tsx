"use client";

import { useParams } from "next/navigation";

const ViewAnalyzedResumeSummary = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default ViewAnalyzedResumeSummary;
