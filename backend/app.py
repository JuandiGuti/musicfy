from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)

db = client["music_db"]
songs = db["songs"]

# Route to add a new song
@app.route("/api/songs", methods=["POST"])
def add_song():
    data = request.json
    
    new_song = {
        "title": data.get("title"),
        "artist": data.get("artist"),
        "year": data.get("year"),
        "genre": data.get("genre")
    }

    res = songs.insert_one(new_song)

    return jsonify({
        "message": "Song added successfully",
        "id": str(res.inserted_id)
    }), 201


# Route to get all songs
@app.route("/api/songs", methods=["GET"])
def obtener_canciones():
    list = []

    for song in songs.find():
        list.append({
            "id": str(song["_id"]),
            "title": song["title"],
            "artist": song["artist"],
            "year": song["year"],
            "genre": song["genre"]
        })

    return jsonify(list)

if __name__ == "__main__":
    app.run(debug=True)