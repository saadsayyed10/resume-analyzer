from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import pandas as pd

df = pd.read_csv("./test.csv")

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001"
)

db_location = "./chroma_db"
add_document = not os.path.exists(db_location)

if add_document:
    documents = []
    ids = []

    for i, row in df.iterrows():
        document = Document(
            page_content=f"""
            Business Name: {row['BusinessName']}
            Category: {row['Category']}
            Area: {row['Area']}
            Rating: {row['Rating']}
            Reviews: {row['Reviews']}
            Opening Hours: {row['OpeningHours']}
            Services: {row['Services']}
            Summary: {row['Summary']}
            """,
            metadata={
                "area": row["Area"],
                "rating": row["Rating"],
                "reviews": row["Reviews"]
            }
        )

        documents.append(document)
        ids.append(str(i))

vector_store = Chroma(
    collection_name = "vet_reviews",
    embedding_function = embeddings,
    persist_directory = db_location
)

if add_document:
    vector_store.add_documents(documents=documents, ids=ids)

retriever = vector_store.as_retriever(
    search_kwargs = {
        "k": 5
    }
)