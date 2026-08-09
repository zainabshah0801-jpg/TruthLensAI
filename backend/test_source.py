import requests

url = "http://127.0.0.1:5000/verify-source"

data = {
    "url": "https://www.reuters.com"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())