import os
import requests

# =========================================
# TRUTHLENS AI — REMOTE AI CLASSIFIER
# =========================================

HF_API_URL = (
    "https://router.huggingface.co/hf-inference/models/"
    "hamzab/roberta-fake-news-classification"
)

HF_TOKEN = os.getenv("HF_TOKEN")


def predict_news(text):

    # Empty input
    if not text or not text.strip():
        return {
            "score": 0,
            "label": "No Text",
            "message": "Please enter some news.",
            "model_label": "NONE",
            "confidence_level": "NONE",
            "analysis_status": "NOT PROCESSED"
        }

    text = text.strip()[:2000]

    # -----------------------------------------
    # CALL HUGGING FACE INFERENCE API
    # -----------------------------------------

    headers = {}

    if HF_TOKEN:
        headers["Authorization"] = f"Bearer {HF_TOKEN}"

    try:
        response = requests.post(
            HF_API_URL,
            headers=headers,
            json={"inputs": text},
            timeout=60
        )

        response.raise_for_status()

        result = response.json()

        # Hugging Face normally returns:
        # [[{"label": "...", "score": ...}]]

        if isinstance(result, list) and result:
            predictions = result[0]

            if isinstance(predictions, list):
                prediction = max(
                    predictions,
                    key=lambda x: x.get("score", 0)
                )
            else:
                prediction = predictions

        else:
            raise ValueError("Unexpected model response.")

        raw_label = str(prediction.get("label", "UNKNOWN"))
        confidence = round(
            float(prediction.get("score", 0)) * 100,
            2
        )

    except Exception as e:

        return {
            "score": 0,
            "label": "Analysis Unavailable",
            "message": "The AI model could not be reached.",
            "model_label": "ERROR",
            "confidence_level": "NONE",
            "analysis_status": "FAILED",
            "error": str(e)
        }

    # -----------------------------------------
    # CONVERT MODEL OUTPUT
    # -----------------------------------------

    label_lower = raw_label.lower()

    if (
        "real" in label_lower
        or "true" in label_lower
        or label_lower == "label_1"
    ):
        label = "Likely Genuine"
    else:
        label = "Potentially Fake"

    # -----------------------------------------
    # CONFIDENCE LEVEL
    # -----------------------------------------

    if confidence >= 80:
        confidence_level = "HIGH"
    elif confidence >= 60:
        confidence_level = "MODERATE"
    else:
        confidence_level = "LOW"

    # -----------------------------------------
    # MESSAGE
    # -----------------------------------------

    if label == "Likely Genuine":
        message = (
            "The AI model detected patterns "
            "more consistent with genuine information."
        )
    else:
        message = (
            "The AI model detected patterns "
            "that may be associated with unreliable "
            "or misleading information."
        )

    return {
        "score": confidence,
        "label": label,
        "message": message,
        "model_label": raw_label,
        "confidence_level": confidence_level,
        "analysis_status": "COMPLETE"
    }