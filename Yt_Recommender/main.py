from flask import Flask, render_template, request
from recommender import load_intents, search_videos

app = Flask(__name__)
intents = load_intents()

@app.route("/", methods=["GET", "POST"])
def home():
    results = []
    selected_intent = ""
    if request.method == "POST":
        selected_intent = request.form["intent"]
        keywords = intents.get(selected_intent, [])
        results = search_videos(keywords)
    return render_template("index.html", intents=intents, results=results, selected_intent=selected_intent)

if __name__ == "__main__":
    app.run(debug=True)
