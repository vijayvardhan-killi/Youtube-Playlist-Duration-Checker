from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.youtube import calculate_playlist_duration

app = FastAPI(title="YouTube Playlist Duration API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/playlist-duration")
def get_playlist_duration(playlist_id: str = Query(...)):
    try:
        return calculate_playlist_duration(playlist_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
