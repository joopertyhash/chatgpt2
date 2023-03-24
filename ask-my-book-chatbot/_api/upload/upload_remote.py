"""Script to upload books to your vector index by running the ask-my-book package remotely."""
import re
from pathlib import Path
from typing import Optional, Set

import click
from langchain.document_loaders import PagedPDFSplitter
from steamship import Steamship
from steamship.utils.url import Verb
from steamship_langchain.vectorstores import SteamshipVectorStore

# Step 1: Give your index a name
from api import AskMyBook

INDEX_NAME = "test-enias-2"

if __name__ == "__main__":
    client = Steamship(workspace=INDEX_NAME)

    package_instance = client.use(
        "ask-my-book-chat-api", config={"index_name": INDEX_NAME}, version="0.2.0"
    )
    print(package_instance.invocation_url)
    print(package_instance.package_version_handle)

    docs = package_instance.invoke("documents", verb=Verb.GET)
    print(docs)
    package_instance.invoke("reset", verb=Verb.POST)
    docs = package_instance.invoke("documents", verb=Verb.GET)
    print(docs)
    package_instance.invoke("add_document", **{
        "url": "https://www.pdfdrive.com/download.pdf?id=158699038&h=27b488a11dd3efed1217baf65bf0e102&u=cache&ext=pdf",
        "name": "tester.pdf",
        "mime_type": "application/pdf"
    })
    docs = package_instance.invoke("documents", verb=Verb.GET)
    print(docs)
    response = package_instance.invoke("answer", question="What is specific knowledge?")
    print(response)
