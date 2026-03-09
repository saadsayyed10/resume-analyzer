"use client";

import { analyzeResumeAPI, fetchResumeHistoryAPI } from "@/api/resume.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Ellipsis, Eye, Info, Loader2, Trash, UploadCloud } from "lucide-react";
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

  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

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

  useEffect(() => {
    getHistory();
  }, []);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      await analyzeResumeAPI(jobDescription.trim(), token!);
      console.log("Resume analyzed");
    } catch (error) {
      console.log(error);
    } finally {
      getHistory();
      setLoading(false);
    }
  };

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
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"} className="flex items-center">
                <span>Analyze Resume</span>
                <UploadCloud />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Analyze Resume:</DialogTitle>
              <div className="flex justify-start items-start w-full mt-6 flex-col gap-y-4">
                <button className="flex justify-center items-center w-full px-8 py-4 border border-gray-400 rounded-md bg-gray-100/40 cursor-pointer hover:bg-gray-100 transition">
                  <UploadCloud className="w-8 h-8 stroke-1 text-gray-700" />
                </button>
                <Textarea
                  className="border border-gray-400 h-40 resize-none overflow-y-auto"
                  placeholder="Type or Copy and Paste Job Description..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <Button onClick={analyzeResume} className="mt-4">
                Submit
              </Button>
            </DialogContent>
          </Dialog>
        </h1>
      </div>
      {!loading ? (
        <>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis className="stroke-[1.5] w-5 h-5 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="start">
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="flex justify-between items-center w-full px-6 cursor-pointer">
                              View <Eye />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-between items-center w-full px-6 cursor-pointer text-red-500">
                              Delete <Trash className="text-red-500" />
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {paginatedData.length !== 0 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    // disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    // disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default FetchResumeHistory;
