from urllib.parse import urlparse


TRUSTED_DOMAINS = {
    "reuters.com",
    "apnews.com",
    "bbc.com",
    "bbc.co.uk",
    "theguardian.com",
    "nytimes.com",
    "washingtonpost.com",
    "npr.org",
    "aljazeera.com",
    "cnn.com",
    "who.int",
    "un.org",
    "nasa.gov",
}


def normalize_domain(domain):
    domain = domain.lower().strip()

    if domain.startswith("www."):
        domain = domain[4:]

    return domain


def verify_source(url):

    if not url or not url.strip():
        return {
            "status": "NO SOURCE",
            "level": "UNKNOWN",
            "domain": None,
            "message": "No source URL was provided."
        }

    url = url.strip()

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    try:
        parsed = urlparse(url)
        domain = normalize_domain(parsed.netloc)

    except Exception:
        return {
            "status": "INVALID",
            "level": "UNKNOWN",
            "domain": None,
            "message": "The provided URL could not be processed."
        }

    if not domain:
        return {
            "status": "INVALID",
            "level": "UNKNOWN",
            "domain": None,
            "message": "The provided URL does not contain a valid domain."
        }

    is_trusted = (
        domain in TRUSTED_DOMAINS
        or any(
            domain.endswith("." + trusted)
            for trusted in TRUSTED_DOMAINS
        )
    )

    if is_trusted:
        return {
            "status": "RECOGNIZED SOURCE",
            "level": "HIGH",
            "domain": domain,
            "message": (
                "The source belongs to a recognized "
                "news or institutional domain."
            )
        }

    return {
        "status": "UNVERIFIED SOURCE",
        "level": "UNKNOWN",
        "domain": domain,
        "message": (
            "TruthLens could not verify this domain "
            "against its current recognized-source list."
        )
    }


if __name__ == "__main__":
    print(verify_source("https://www.reuters.com"))
    print(verify_source("https://example.com"))