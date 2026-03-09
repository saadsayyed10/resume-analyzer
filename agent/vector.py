from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import shutil
import os

def create_retriver(pdf_path):
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001"
    )

    db_location = "./chroma_db"

    # delete old vector database
    if os.path.exists(db_location):
        shutil.rmtree(db_location)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )

    chunks = text_splitter.split_documents(documents)

    vector_store = Chroma(
        collection_name="resume_chunks",
        embedding_function=embeddings,
        persist_directory=db_location
    )

    vector_store.add_documents(chunks)

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 5}
    )
    
    return retriever
