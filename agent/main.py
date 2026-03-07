from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

from fastapi import FastAPI
from pydantic import BaseModel

from vector import retriever

app = FastAPI()

class JDRequest(BaseModel):
    job_description: str

model = ChatGoogleGenerativeAI(
    model = "gemini-2.5-flash-lite",
    temperature=0.7
)

template="""
You are an expert technical recruiter and resume reviewer.

RESUME CONTENT:
{resume_chunks}

JOB DESCRIPTION:
{job_description}

TASK:
1. Analyze how well the resume matches the job description.
2. Identify missing skills or keywords.
3. Suggest improvements to align the resume with the job.
4. Suggest new bullet points if needed.

OUTPUT FORMAT:
Match Score: X%

Missing Skills:
- skill 1
- skill 2

Suggested Improvements:
- improvement 1
- improvement 2
"""

prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

@app.post("/analyze")
async def analyze_resume(data: JDRequest):
    docs = retriever.invoke(data.job_description)
    resume_chunks = "\n\n".join([doc.page_content for doc in docs])
    
    result = chain.invoke({
        "resume_chunks": resume_chunks,
        "job_description": data.job_description,
    })
    
    return {
        "job_description": data.job_description,
        "response": result.content
    }