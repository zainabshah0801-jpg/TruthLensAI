from transformers import pipeline

# Fake-news classification model
classifier = pipeline(
    "text-classification",
    model="hamzab/roberta-fake-news-classification"
)


def predict_news(text):

    if not text or not text.strip():
        return {
            "score": 0,
            "label": "No Text",
            "message": "Please enter some news."
        }

    # Limit input size
    text = text.strip()[:2000]

    result = classifier(text)[0]

    raw_label = result["label"]
    confidence = round(result["score"] * 100, 2)

    # Convert model labels into TruthLens labels
    if raw_label.upper() in ["REAL", "TRUE", "LABEL_1"]:
        label = "Likely Genuine"
    else:
        label = "Potentially Fake"

    return {
        "score": confidence,
        "label": label,
        "message": "AI prediction completed.",
        "model_label": raw_label
    }