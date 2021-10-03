import requests
import json
from datetime import datetime, tzinfo
import pytz
from time import sleep

# azure 서버에서 호출
# azure pw : rkdtmdrlf1plato!
kst = pytz.timezone('Asia/Seoul')
pre = datetime(1990,1,1, tzinfo = kst)
now = datetime.now(kst)

lastNotifyDay = 0
while True:
    if now.hour >= 8:
        if (now - pre).days * 60 * 60 * 24 + (now - pre).seconds >= 60 * 240 :
            response = requests.post('https://us-central1-plato-calendar.cloudfunctions.net/requestSync',
                data= {"password":"password"}
            )
            pre = now
        if now.day != lastNotifyDay:
            response = requests.post('https://us-central1-plato-calendar.cloudfunctions.net/requestNotify',
                data= {"password":"password"}
            )
            lastNotifyDay = now.day
    sleep(60 * 60)

print(1)