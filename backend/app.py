from flask import Flask, request, jsonify
from flask_cors import CORS

from model import predict_news
from source_verifier import verify_source


app = Flask(__name__)

CORS(app)


# ==========================================
# AI PREDICTION + SOURCE VERIFICATION
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received."
        }), 400

    # Get news text
    text = data.get("text", "").strip()

    # Get source URL
    source_url = data.get("source_url", "").strip()

    # ------------------------------
    # AI NEWS PREDICTION
    # ------------------------------

    result = predict_news(text)

    # ------------------------------
    # SOURCE VERIFICATION
    # ------------------------------

    if source_url:

        try:
            source_result = verify_source(source_url)

        except Exception as e:
            source_result = {
                "verified": False,
                "message": "Source verification could not be completed.",
                "error": str(e)
            }

    else:

        source_result = {
            "verified": False,
            "message": "No source URL provided."
        }

    # ------------------------------
    # COMBINE RESULTS
    # ------------------------------

    result["source_verification"] = source_result

    result["source_url"] = source_url

    return jsonify(result)


# ==========================================
# STANDALONE SOURCE VERIFICATION
# ==========================================

@app.route("/verify-source", methods=["POST"])
def verify_source_route():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received."
        }), 400

    url = data.get("url", "").strip()

    if not url:
        return jsonify({
            "verified": False,
            "message": "Please provide a source URL."
        }), 400

    try:
        result = verify_source(url)

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "verified": False,
            "message": "Source verification failed.",
            "error": str(e)
        }), 500


# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":
    app.run(debug=True)