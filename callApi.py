import requests
import json
from datetime import datetime, tzinfo
import pytz
from time import sleep

# use in azure vm machine
# azure pw : rkdtmdrlf1plato!

# chmod 755 callApi.py
# nohup python3 -u callApi.py &

# 실행중인 프로세스 보고 종료
# ps -ef | grep py
# sudo kill 000
kst = pytz.timezone('Asia/Seoul')
pre = datetime(1990,1,1, tzinfo = kst)
now = datetime.now(kst)

lastNotifyDay = 0
while True:
    print(now.__str__())
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