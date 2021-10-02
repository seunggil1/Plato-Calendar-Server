import requests
import json
response = requests.post('https://us-central1-plato-calendar.cloudfunctions.net/requestSync',
    data= {"password":"password"}
)

print(1)