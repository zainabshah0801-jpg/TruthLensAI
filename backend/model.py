from transformers import pipeline


# --------------------------------------------------
# TruthLens AI - Fake News Classification Model
# --------------------------------------------------

classifier = pipeline(
    "text-classification",
    model="hamzab/roberta-fake-news-classification"
)


def predict_news(text):

    # --------------------------------------------------
    # 1. Validate input
    # --------------------------------------------------

    if not text or not text.strip():
        return {
            "score": 0,
            "label": "No Text",
            "message": "Please enter some news.",
            "assessment": "No content was provided for analysis.",
            "confidence_level": "None",
            "risk_level": "Unknown",
            "disclaimer": "Please enter text before requesting an analysis."
        }


    # --------------------------------------------------
    # 2. Clean and limit input
    # --------------------------------------------------

    text = text.strip()[:2000]


    # --------------------------------------------------
    # 3. Run AI classification
    # --------------------------------------------------

    result = classifier(text)[0]

    raw_label = result["label"]
    confidence = round(result["score"] * 100, 2)


    # --------------------------------------------------
    # 4. Convert model output into TruthLens labels
    # --------------------------------------------------

    if raw_label.upper() in ["REAL", "TRUE", "LABEL_1"]:
        label = "Likely Genuine"
        risk_level = "Low"

    else:
        label = "Potentially Fake"
        risk_level = "High"


    # --------------------------------------------------
    # 5. Determine confidence level
    # --------------------------------------------------

    if confidence >= 80:
        confidence_level = "High"

    elif confidence >= 60:
        confidence_level = "Moderate"

    else:
        confidence_level = "Low"


    # --------------------------------------------------
    # 6. Generate human-readable assessment
    # --------------------------------------------------

    if label == "Likely Genuine":

        assessment = (
            "The AI model found patterns in the submitted content "
            "that are more consistent with the genuine-news class."
        )

    else:

        assessment = (
            "The AI model found patterns in the submitted content "
            "that are more consistent with the potentially fake-news class."
        )


    # --------------------------------------------------
    # 7. Return complete TruthLens analysis
    # --------------------------------------------------

    return {
        "score": confidence,
        "label": label,
        "message": "AI prediction completed.",
        "model_label": raw_label,
        "assessment": assessment,
        "confidence_level": confidence_level,
        "risk_level": risk_level,
        "disclaimer": (
            "This is an AI-based classification, not a guarantee "
            "of factual accuracy. Verify important information "
            "using reliable sources."
        )
    }