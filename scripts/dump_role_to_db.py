from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB (adjust the URI as needed)
client = MongoClient("mongodb://localhost:27017")
db = client["db-name"]  # Replace with your database name
roles_collection = db["roles"]  # Replace with your collection name

# Roles data to be inserted
roles = [
    {"code": "ADMIN", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow(),"status":True},
    {"code": "USER", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow(),"status":True},
    {"code": "SUPER_ADMIN", "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow(),"status":True},
]

# Insert roles into the collection
try:
    roles_collection.insert_many(roles)
    print("Roles added successfully")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    client.close()
