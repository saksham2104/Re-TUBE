import requests
import json
from config import YOUTUBE_API_KEY, YOUTUBE_SEARCH_URL, YOUTUBE_VIDEO_URL

def load_intents():
    with open("intents.json", "r") as f:
        return json.load(f)

def search_videos(intent_keywords, max_results=5):
    query = " ".join(intent_keywords)
    params = {
        'part': 'snippet',
        'q': query,
        'key': YOUTUBE_API_KEY,
        'maxResults': max_results,
        'type': 'video',
        'safeSearch': 'strict'
    }

    response = requests.get(YOUTUBE_SEARCH_URL, params=params)
    results = []
    if response.status_code == 200:
        for item in response.json().get("items", []):
            title = item['snippet']['title']
            video_id = item['id']['videoId']
            link = YOUTUBE_VIDEO_URL + video_id
            results.append((title, link))
    return results
