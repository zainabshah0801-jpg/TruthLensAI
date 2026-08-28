from flask import Flask, request, jsonify
from flask_cors import CORS

from model import predict_news
from source_verifier import verify_source


app = Flask(__name__)

# Allow requests from your Vercel frontend
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})


# ==========================================
# HOME / HEALTH CHECK
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "message": "TruthLens AI backend is live",
        "service": "TruthLens AI"
    })


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


# ==========================================
# AI PREDICTION + SOURCE VERIFICATION
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "error": "No data received."
            }), 400

        # ------------------------------
        # GET INPUT
        # ------------------------------

        text = str(
            data.get("text", "")
        ).strip()

        source_url = str(
            data.get("source_url", "")
        ).strip()

        if not text:

            return jsonify({
                "error": "Please enter some news or information."
            }), 400


        # ------------------------------
        # AI PREDICTION
        # ------------------------------

        try:

            result = predict_news(text)

        except Exception as e:

            print("AI MODEL ERROR:", str(e))

            return jsonify({
                "error": "AI model could not process the information.",
                "details": str(e)
            }), 500


        # ------------------------------
        # SOURCE VERIFICATION
        # ------------------------------

        if source_url:

            try:

                source_result = verify_source(
                    source_url
                )

            except Exception as e:

                print(
                    "SOURCE VERIFICATION ERROR:",
                    str(e)
                )

                source_result = {
                    "status": "ERROR",
                    "level": "UNKNOWN",
                    "domain": None,
                    "message": (
                        "Source verification "
                        "could not be completed."
                    )
                }

        else:

            source_result = {
                "status": "NO SOURCE",
                "level": "UNKNOWN",
                "domain": None,
                "message": (
                    "No source URL was provided."
                )
            }


        # ------------------------------
        # COMBINE RESULTS
        # ------------------------------

        result["source_verification"] = (
            source_result
        )

        result["source_url"] = source_url

        return jsonify(result), 200


    except Exception as e:

        print("SERVER ERROR:", str(e))

        return jsonify({
            "error": "TruthLens server encountered an error.",
            "details": str(e)
        }), 500


# ==========================================
# STANDALONE SOURCE VERIFICATION
# ==========================================

@app.route("/verify-source", methods=["POST"])
def verify_source_route():

    try:

        data = request.get_json(silent=True)

        if not data:

            return jsonify({
                "error": "No data received."
            }), 400


        url = str(
            data.get("url", "")
        ).strip()


        if not url:

            return jsonify({
                "status": "NO SOURCE",
                "level": "UNKNOWN",
                "domain": None,
                "message": (
                    "Please provide a source URL."
                )
            }), 400


        result = verify_source(url)

        return jsonify(result), 200


    except Exception as e:

        print(
            "SOURCE VERIFICATION ERROR:",
            str(e)
        )

        return jsonify({
            "status": "ERROR",
            "level": "UNKNOWN",
            "domain": None,
            "message": (
                "Source verification failed."
            ),
            "error": str(e)
        }), 500


# ==========================================
# ERROR HANDLERS
# ==========================================

@app.errorhandler(404)
def not_found(error):

    return jsonify({
        "error": "Endpoint not found.",
        "message": (
            "Check that the requested API route exists."
        )
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):

    return jsonify({
        "error": "Method not allowed.",
        "message": (
            "This endpoint requires the correct HTTP method."
        )
    }), 405


# ==========================================
# LOCAL DEVELOPMENT
# ==========================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )