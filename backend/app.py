from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_news

app = Flask(__name__)
CORS(app)


# Health check
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "service": "TruthLens AI",
        "message": "TruthLens AI backend is running."
    })


# News prediction
@app.route("/predict", methods=["POST"])
def predict():

    try:
        # Check whether JSON data was received
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
                "error": "No JSON data received."
            }), 400

        # Get text from request
        text = data.get("text", "")

        # Validate text
        if not isinstance(text, str) or not text.strip():
            return jsonify({
                "success": False,
                "error": "Please enter some news text."
            }), 400

        # Prevent excessively large requests
        text = text.strip()[:2000]

        # Run AI prediction
        result = predict_news(text)

        # Add API success indicator
        result["success"] = True

        return jsonify(result), 200

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "error": "Unable to analyze the text at the moment."
        }), 500


if __name__ == "__main__":
    app.run(debug=True)