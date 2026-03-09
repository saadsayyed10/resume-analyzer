"use client";

import { fetchResumeHistoryAPI } from "@/api/resume.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Ellipsis, Info, Loader2, UploadCloud } from "lucide-react";
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

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredData = data.filter(
    (resume) =>
      resume.job_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      resume.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.created_at
        .split("T")[0]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const res = await fetchResumeHistoryAPI(token!);
        setData(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, []);

  const tableHeadings = [
    {
      name: "Sr. No",
    },
    {
      name: "Job Description",
    },
    {
      name: "Analyzed Result",
    },
    {
      name: "Date",
    },
    {
      name: "Options",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full flex-col gap-y-4 px-48 mt-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full flex-row gap-x-2">
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-104"
            placeholder="Search analyze history"
          />
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 stroke-1 opacity-60" />
            </TooltipTrigger>
            <TooltipContent>Total: {total}</TooltipContent>
          </Tooltip>
        </div>
        <h1>
          <Button size={"lg"} className="flex items-center">
            <span>Analyze Resume</span>
            <UploadCloud />
          </Button>
        </h1>
      </div>
      {!loading ? (
        <Table>
          <TableHeader className="bg-neutral-800 border">
            <TableRow>
              {tableHeadings.map((tH, idx) => (
                <TableHead key={idx} className="text-neutral-100">
                  {tH.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="border">
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No resumes found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((resume, idx) => (
                <TableRow
                  className={`${idx % 2 === 0 && "bg-neutral-100"}`}
                  key={resume.id}
                >
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="truncate max-w-40">
                    {resume.job_description}
                  </TableCell>
                  <TableCell className="truncate max-w-40">
                    {resume.response}
                  </TableCell>
                  <TableCell>{resume.created_at.split("T")[0]}</TableCell>
                  <TableCell className="cursor-pointer">
                    <Ellipsis className="stroke-[1.5] w-5 h-5" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center w-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default FetchResumeHistory;
