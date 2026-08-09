from flask import Flask, request, jsonify
from flask_cors import CORS

from model import predict_news
from source_verifier import verify_source


app = Flask(__name__)

CORS(app)


# ==========================================
# EXISTING AI PREDICTION
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    text = data.get("text", "")

    result = predict_news(text)

    return jsonify(result)


# ==========================================
# SOURCE VERIFICATION
# ==========================================

@app.route("/verify-source", methods=["POST"])
def verify_source_route():

    data = request.get_json()

    url = data.get("url", "")

    result = verify_source(url)

    return jsonify(result)


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":
    app.run(debug=True)