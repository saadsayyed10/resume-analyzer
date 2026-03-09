"use client";

import { viewResumeAPI } from "@/api/resume.api";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AnalyzedResume {
  id: string;
  job_description: string;
  response: string;
  created_at: string;
}

const ViewAnalyzedResumeSummary = () => {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<AnalyzedResume | null>(null);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    const viewResume = async () => {
      setLoading(true);
      try {
        const res = await viewResumeAPI(id, token!);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    viewResume();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="w-40 h-40 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data?.response || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ViewAnalyzedResumeSummary;
