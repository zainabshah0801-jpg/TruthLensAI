from transformers import pipeline

# =========================================
# TRUTHLENS AI — LIGHTWEIGHT FAKE NEWS MODEL
# =========================================

MODEL_NAME = "Aakash22134/fake_news_DistilBert"

classifier = pipeline(
    "text-classification",
    model=MODEL_NAME,
    device=-1
)


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

    # Limit input size
    text = text.strip()[:1500]

    # AI prediction
    result = classifier(
        text,
        truncation=True,
        max_length=256
    )[0]

    raw_label = result["label"]
    confidence = round(result["score"] * 100, 2)

    # Convert model output
    label_lower = raw_label.lower()

    if "real" in label_lower or "true" in label_lower:
        label = "Likely Genuine"
    else:
        label = "Potentially Fake"

    # Confidence level
    if confidence >= 80:
        confidence_level = "HIGH"
    elif confidence >= 60:
        confidence_level = "MODERATE"
    else:
        confidence_level = "LOW"

    # Message
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