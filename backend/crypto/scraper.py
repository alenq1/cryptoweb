import requests
import requests.exceptions as ex
import time
import json
import re
import logging
from bs4 import BeautifulSoup
import concurrent.futures
from celery import shared_task
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from backend.celery import celery_app


##
from celery.utils.log import get_logger
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def get_page(url, scrap=True):

    #global response
    response = []

    try:
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:59.0) Gecko/20120101 Firefox/59.0'
        }
        print(url, "REQUEST APIKEY")
        page = requests.get(url, headers=headers, timeout=1)

        if page.status_code != 200:
            response = [{'error_code': page.status_code}]

            return response
    except (ex.RequestException, ex.Timeout, ex.ConnectionError, ex.ConnectTimeout, ex.InvalidURL) as e:
        response = [{'error': str(e)}]
        return response
    #print(page, 'PAGINA CONSULTADA')
    if scrap:
        print("SSSSSSSSIIIIIIIIII SCRAPEAAAAAA")
        soup = BeautifulSoup(page.text, 'html.parser')
        soup.prettify()
        return soup
    else:
        print("SOOOOOLLLLLOOO REQQQQUESST")
        return page.json()
    


def scrap_news_sites(to_scrap):

        # METHOD FOR SCRAP THR SITE
        # INITAL BLOCK SELECTION
    response = []
    try:
        ###FOR NEWS SOURCE
        selection = to_scrap.find_all('tr', {'class': 'photography-wrapper'})

        # selection = to_scrap.find('div', {'id': 'fsb'})
        # # GET TITLES SECTION
        # title = selection.find_all('h3')
        # # CREATE TEMP LIST FOR GET TAGS ID
        # tmplist = []

        # for lista in title:
        #     tmplist.append(lista.get("id")[1:])

        #     # LOOP FOR GET EACH TITLE SITE
        # for lista in title:
        #     response.append({'site': lista.getText(), 'link': '',
        #                     'content': '', 'image': ''})

        for line in selection:
            response.append({
            'site': line.find('h3').getText(), 
            'link': line.find('a').get('href'), 'content': '',
            'description': line.find('span', {'class', 'blog-description'}).getText(),
            'image': line.find('img').get('src'), 
            'rank': line.find('p', {'class': 'blog-counting rank'}).getText(), 
            'mentions': line.find('p', {'class': 'blog-counting mention'}).getText()
            })


            # LOOP FOR GET EACH IMAGE LINK SITE
        # for index, lista in enumerate(tmplist):
        #     response[index]['image'] = (
        #         ((selection.find('p', {'data': lista})).find('img')).get('data-lazy-src'))

        # for index, lista in enumerate(tmplist):
        #     response[index]['link'] = (
        #         ((selection.find('p', {'data': lista})).find('a')).get('href'))

    except AttributeError as e:
        response = [{'error': str(e)}]
        return response
    print(response, 'RESPUESTA PARA M<ANDAR')
    return response


def get_site_content(to_scrap, keyword):

    #selection = to_scrap.find('a')
    try:
        
        selection = to_scrap.find_all('a', href=re.compile(keyword))[1:6]
        
        response = [{'url': content.get(
            'href'), 'title': " ".join(content.getText().split())} for content in selection]
        # filter_title = " ".join(content.getText().split()) fo
        # print(filter_title, "TITULO FILTRADO")
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
    
    sites_to_get_data = [{'page': 'cryptoData', 'url':'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD'},
                        {'page': 'exchangeData', 'url':'https://min-api.cryptocompare.com/data/exchanges/general'},
                        {'page': 'explorerInfo', 'url':'http://chainz.cryptoid.info/explorer/api.dws?q=summary'},
                        ]
    
    #SET FUCNTIONS FOR EXECUTING CONCURRENT REQUESTS
    def get_site(url):
        print("CONECTANDO A SITIO", url)
        return requests.get(url, timeout=5)
    
    def get_all_sites(urls):
        with concurrent.futures.ThreadPoolExecutor(max_workers=len(sites_to_get_data)) as executor:
            return list(executor.map(get_site, urls))

    only_sites = [urls['url'] for urls in sites_to_get_data ]
    data_to_client = [responses.json() for responses in get_all_sites(only_sites)]

    print(data_to_client[0]['Data'][0]['CoinInfo'], "ME EJECUTARON COMO TAREA PERIRODICA")
    
    # CALLING WEBSOCKET GROUP TO SEND REQUESTS RESULTS

    channel_layer = get_channel_layer()
    logger = logging.getLogger()
    print("ESTES ESSSSS CHANNEL LAYYYYYYER", channel_layer)

    return async_to_sync(channel_layer.group_send)('crypto', {
        'type': 'send.broadcast' ,
        sites_to_get_data[0]['page']: data_to_client[0],
        sites_to_get_data[1]['page']: data_to_client[1],
        sites_to_get_data[2]['page']: data_to_client[2],
    })


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
