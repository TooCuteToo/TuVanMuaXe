import requests
from bs4 import BeautifulSoup
import csv
from numpy import random

origin_car_list = []
clean_car_list = []

for i in range(2, 50):
    url = ''.join(('https://bonbanh.com/oto/page,', str(i)))
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    cars = soup.select('li.car-item')

    for car in cars:
        title = car.select('div.cb2_02 h3')[0].text
        price = car.select('div.cb3 b')[0]['content']

        place = car.select('div.cb4 b')[0].text
        img = car.select('div.cb5 img')[0].get('src')

        code = car.select('div.cb5 span')[0].text
        features = car.select('div.cb6_02 p')[0].text

        year = car.select('div.cb1 b')[0].text

        info = {
            "name": title.strip(),
            "brand": title.split()[0],

            "price": round(float(price) / 23131, 0),
            "img": img,

            "code": code.strip(),
            "features": features.strip(),

            "place": place.strip(),
            "year": year.strip(),
        }

        origin_car_list.append(info)

for i in range(0, len(origin_car_list)):
    for j in range(i + 1, len(origin_car_list) - 20):
        if (origin_car_list[i]['name'] == origin_car_list[j]['name']):
            origin_car_list.pop(j)

for car in origin_car_list:
    for i in range(0, random.randint(3, 10)):
        info = {
            "name": car['name'],
            "brand": car['brand'],

            "price": car['price'],
            "img": car['img'],

            "id": car['code'],
            "features": car['features'],

            "place": car['place'],
            "year": car['year'],

            "age": random.randint(20, 70),
            "outcome": car['price'] + random.randint(1000, 5000),
        }

        clean_car_list.append(info)

keys = clean_car_list[0].keys()

with open('car_list.csv', 'w', newline='') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(clean_car_list)
