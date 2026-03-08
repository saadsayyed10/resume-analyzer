"use client";

import { fetchResumeHistoryAPI } from "@/api/resume.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Info, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

interface ResumeHistory {
  id: string;
  job_description: string;
  response: string;
  created_at: string;
}

const FetchResumeHistory = () => {
  const { token } = useAuth();
  const [data, setData] = useState<ResumeHistory[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await fetchResumeHistoryAPI(token!);
        setData(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        console.log(error);
      }
    };

    getHistory();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col gap-y-4 px-20">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full flex-row gap-x-4">
          <Input className="w-104" placeholder="Search analyze history" />
          <Info className="w-6 h-6 stroke-1 opacity-60" />
        </div>
        <h1>
          <Button size={"lg"}>
            <UploadCloud />
          </Button>
        </h1>
      </div>
    </div>
  );
};

export default FetchResumeHistory;
