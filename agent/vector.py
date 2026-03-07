from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
# from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader
import os
from langchain_text_splitters import RecursiveCharacterTextSplitter

# df = pd.read_csv("./test.csv")
loader = PyPDFLoader("./Saad_SWE_Resume.pdf")
documents = loader.load()

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001"
)

db_location = "./chroma_db"
add_document = not os.path.exists(db_location)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 800,
    chunk_overlap = 100
)

chunks = text_splitter.split_documents(documents)

vector_store = Chroma(
    collection_name = "resume_chunks",
    embedding_function = embeddings,
    persist_directory = db_location
)

if add_document:
    vector_store.add_documents(chunks)

retriever = vector_store.as_retriever(
    search_kwargs = {
        "k": 5
    }
)