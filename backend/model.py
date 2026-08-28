# ==========================================
# TRUTHLENS AI — LIGHTWEIGHT NEWS ANALYZER
# ==========================================

import re


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
    # CLEAN TEXT
    # -----------------------------------------

    text = text.strip()[:2000]

    lower_text = text.lower()


    # -----------------------------------------
    # SUSPICIOUS PATTERN DETECTION
    # -----------------------------------------

    suspicious_words = [
        "shocking",
        "miracle",
        "secret",
        "100% guaranteed",
        "you won't believe",
        "click here",
        "urgent",
        "breaking",
        "cure",
        "instant cure",
        "doctors hate",
        "share immediately",
        "government hiding",
        "fake",
        "conspiracy"
    ]


    suspicious_count = 0

    for word in suspicious_words:

        if word in lower_text:
            suspicious_count += 1


    # -----------------------------------------
    # EXCESSIVE CAPITALIZATION
    # -----------------------------------------

    uppercase_count = sum(
        1 for char in text if char.isupper()
    )

    letter_count = sum(
        1 for char in text if char.isalpha()
    )


    uppercase_ratio = 0

    if letter_count > 0:

        uppercase_ratio = (
            uppercase_count / letter_count
        )


    # -----------------------------------------
    # EXCLAMATION MARKS
    # -----------------------------------------

    exclamation_count = text.count("!")


    # -----------------------------------------
    # CALCULATE RISK SCORE
    # -----------------------------------------

    risk_score = 0


    risk_score += suspicious_count * 12


    if uppercase_ratio > 0.35:
        risk_score += 15


    if exclamation_count >= 3:
        risk_score += 10


    risk_score = min(
        risk_score,
        95
    )


    # -----------------------------------------
    # CLASSIFICATION
    # -----------------------------------------

    if risk_score >= 45:

        label = "Potentially Fake"

        confidence = min(
            60 + risk_score / 2,
            95
        )

        message = (
            "The information contains patterns "
            "that may be associated with unreliable "
            "or misleading content. Further verification "
            "from trusted sources is recommended."
        )

        model_label = "SUSPICIOUS"


    else:

        label = "Likely Genuine"

        confidence = max(
            60,
            90 - risk_score
        )

        message = (
            "The information does not show many "
            "of the suspicious linguistic patterns "
            "checked by the TruthLens analysis engine."
        )

        model_label = "LOW_RISK"


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
    # RETURN RESULT
    # -----------------------------------------

    return {

        "score": round(
            confidence,
            2
        ),

        "label": label,

        "message": message,

        "model_label": model_label,

        "confidence_level": confidence_level,

        "analysis_status": "COMPLETE"

    }