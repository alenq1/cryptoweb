import requests
import requests.exceptions as ex
import time
import json
import re
from celery import shared_task
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from bs4 import BeautifulSoup


def get_page(url):

    #global response
    response = []

    try:
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:59.0) Gecko/20120101 Firefox/59.0'
        }
        page = requests.get(url, headers=headers, timeout=1)
        if page.status_code != 200:
            response = [{'error_code': page.status_code}]

            return response
    except (ex.RequestException, ex.Timeout, ex.ConnectionError, ex.ConnectTimeout, ex.InvalidURL) as e:
        response = [{'error': str(e)}]
        return response
    #print(page, 'PAGINA CONSULTADA')
    soup = BeautifulSoup(page.text, 'html.parser')
    soup.prettify()
    return soup


def scrap_news_sites(to_scrap):

        # METHOD FOR SCRAP THR SITE
        # INITAL BLOCK SELECTION
    response = []
    selection = to_scrap.find('div', {'id': 'fsb'})
    # GET TITLES SECTION
    title = selection.find_all('h3')
    # CREATE TEMP LIST FOR GET TAGS ID
    tmplist = []

    for lista in title:
        tmplist.append(lista.get("id")[1:])

        # LOOP FOR GET EACH TITLE SITE
    for lista in title:
        response.append({'site': lista.getText(), 'link': '',
                         'content': '', 'image': ''})
        # LOOP FOR GET EACH IMAGE LINK SITE
    for index, lista in enumerate(tmplist):
        response[index]['image'] = (
            ((selection.find('p', {'data': lista})).find('img')).get('data-lazy-src'))

    for index, lista in enumerate(tmplist):
        response[index]['link'] = (
            ((selection.find('p', {'data': lista})).find('a')).get('href'))

    print(response, 'RESPUESTA PARA M<ANDAR')
    return response


def get_site_content(to_scrap, keyword):

    #selection = to_scrap.find('a')
    try:
        selection = to_scrap.find_all('a', href=re.compile(keyword))
        response = [{'url': content.get(
            'href'), 'title': content.getText()} for content in selection]
        return response

    except (AttributeError, KeyError) as ex:
        return [{'error': str(ex)}]


@shared_task
def add(a, b):
    print('EJEVUTADA TASKKK')
    time.sleep(5)
    return a + b


@shared_task
def get_api_data():
    api = requests.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD')
    print("ME EJECUTARON COMO TAREA PERIRODICA")
    data_to_client = api.json()
    return data_to_client


def get_google_search(to_scrap):
    print('ME LLA MANARON', to_scrap)
    response1 = []
    try:
        for items in to_scrap.find_all('div', {'class': 'rc'}):
            response1.append(
                {'searchUrl': (items.a)['href'], 'searchName': (items.a).text})
        return response1

    except (AttributeError, KeyError) as ex:
        return [{'error': str(ex)}]
    #content = soup.find_all(class_='trow trow-wrap')
    # content = selection.find_all('p', {data: })


def get_wallet_info(to_scrap):
    response = []
    task = add.delay(5, 4)
    print('NO DE TASK', task)
    try:
        selection = to_scrap.find_all(
            'a', {'data-category': 'Cryptocurrency Wallets'})
        for links in selection:
            response.append(
                {'walletUrl': links['href'], 'walletName': links.text})
        return response

    except (AttributeError, KeyError) as ex:
        return [{'error': str(ex)}]


    # for i in range(len(response)):
    #     for k, v in response[i]['categories'].items():
    #         tmplist.append(k)
if __name__ == "__main__":
    pass
