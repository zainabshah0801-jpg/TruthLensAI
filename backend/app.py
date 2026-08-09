from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_news

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    text = data.get("text", "")

    result = predict_news(text)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)