import os
from transformers import pipeline


# =========================================
# TRUTHLENS AI — FAKE NEWS CLASSIFIER
# =========================================

HF_TOKEN = os.getenv("HF_TOKEN")

classifier = pipeline(
    "text-classification",
    model="hamzab/roberta-fake-news-classification",
    token=HF_TOKEN
)


# =========================================
# PREDICT NEWS
# =========================================

def predict_news(text):

    # -----------------------------------------
    # EMPTY INPUT CHECK
    # -----------------------------------------

    if not text or not text.strip():
        return {
            "score": 0,
            "label": "No Text",
            "message": "Please enter some news.",
            "model_label": "NONE",
            "confidence_level": "NONE",
            "analysis_status": "NOT PROCESSED"
        }


    # -----------------------------------------
    # CLEAN INPUT
    # -----------------------------------------

    text = text.strip()[:2000]


    # -----------------------------------------
    # AI MODEL PREDICTION
    # -----------------------------------------

    try:

        result = classifier(text)[0]

        raw_label = result["label"]

        confidence = round(
            result["score"] * 100,
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

    if raw_label.upper() in [
        "REAL",
        "TRUE",
        "LABEL_1"
    ]:

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
    # ANALYSIS MESSAGE
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


    # -----------------------------------------
    # RETURN STRUCTURED RESULT
    # -----------------------------------------

    return {

        "score": confidence,

        "label": label,

        "message": message,

        "model_label": raw_label,

        "confidence_level": confidence_level,

        "analysis_status": "COMPLETE"

    }