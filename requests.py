import requests
import json
# azure pw : rkdtmdrlf1plato!
response = requests.post('https://us-central1-plato-calendar.cloudfunctions.net/requestSync',
    data= {"password":"password"}
)

print(1)