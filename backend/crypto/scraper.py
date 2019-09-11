import requests, requests.exceptions as ex
import time
import json
import re
from bs4 import BeautifulSoup




#url = 'https://blog.feedspot.com/cryptocurrency_blogs/'

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
    print(page, 'PAGINA CONSULTADA')
    soup = BeautifulSoup(page.text, 'html.parser')
    soup.prettify()
    return soup

def scrap_blog1(to_scrap):

        # METHOD FOR SCRAP THR SITE 
        #INITAL BLOCK SELECTION
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
        response.append({'site': lista.getText(), 'link': '', 'content': '', 'image': ''})
        # LOOP FOR GET EACH IMAGE LINK SITE
    for index, lista in enumerate(tmplist): 
        response[index]['image'] = (((selection.find('p', {'data': lista})).find('img')).get('data-lazy-src')) 
        
    for index, lista in enumerate(tmplist): 
        response[index]['link'] = (((selection.find('p', {'data': lista})).find('a')).get('href')) 

    print(response, 'RESPUESTA PARA M<ANDAR')
    return response


def get_site_content(to_scrap):
    
    #selection = to_scrap.find('a')
    try:
        selection = to_scrap.find_all('a', href=re.compile("news")) 
        response = [{'url': content.get('href'), 'title': content.getText()} for content in selection]
        return response
    except (AttributeError, KeyError) as ex:
        return [{'error': str(ex)}]

    
    

    
    
    #content = soup.find_all(class_='trow trow-wrap')
    #content = selection.find_all('p', {data: })


def scrap_blog2(to_scrap):
    
    response = []    
    tmplist = []
    selection = to_scrap.find_all('div', {'class': 'items__col'})

    for divs in selection:
        childs = divs.find_all('a', {'class': 'item__link'})
        for titles in childs:
            response.append({'categories': {titles.text : 
                        {'site': '', 'link': '', 'description': '', 'image': ''} }})

    
    for i in range(len(response)): 
        for k,v in response[i]['categories'].items(): 
            tmplist.append(k)
    
    for index, category in enumerate(tmplist): 
        sites = divs.find_all('a', {'data-category': category }) 
        for site in sites: 
            print(site.text) 
            #response[index]['categories']['site'] = site.text 
            #response[index]['categories']['link'] = sites.get('data-category-link') 



if __name__ == "__main__":
    pass

