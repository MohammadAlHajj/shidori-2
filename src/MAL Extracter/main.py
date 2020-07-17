# from requests.auth import HTTPBasicAuth
from time import sleep

import requests
import json




# scrape all anime data from the provided list
def retrieve_all_anime_data():
    path = 'list.txt'
    # base_url = "https://myanimelist.net/api/anime/search.xml?q="
    base_url = "https://api.jikan.moe/v3/search/anime?q="

    # get list of anime to search for
    with open(path) as out_file:
        list_of_anime = [i.strip() for i in out_file]

    print(list_of_anime)
    dict_of_anime = {}
    # scrape search results for each entry in search list
    for anime in list_of_anime:
        full_url = base_url + '"{}"&page=1'.format(anime)
        print(full_url)
        r = requests.get(full_url).json()
        dict_of_anime[anime] = r["results"]
        # required by api provider to prevent overuse (requirement is 4 second delay between queries)
        sleep(4)

    print(dict_of_anime)

    # dump search results into a json file
    with open("anime dump.json", "w") as out_file:
        json.dump(dict_of_anime, out_file)


# ask the user to filter the provided anime
def filter_anime():
    print("\nPick the index of all wanted anime separated by a comma with no spaces "
          "\npress enter key to continue to the lists .....")
    input()
    processed_data = {}
    with open("anime dump.json", "r") as file:
        all_data = json.load(file)
        # outer loop for each anime search result
        for item in all_data:
            print("\n\n--------------- ", item)
            max_index = -1

            # get and print all search results for cur anime
            for i, anime in enumerate(all_data[item]):
                index = (str(i) + ":").ljust(5)
                title = anime["title"][:60].ljust(60)
                start_date = anime["start_date"]
                start_date = "".ljust(10) if start_date is None else start_date[:10].ljust(10)
                url = anime["url"]
                print('{0}{1}   -  {2}   -  {3}'
                      .format(index, title, start_date, url))
                max_index = i

            # pick filtered items
            picks = input().split(",")
            cur_filtered = []
            for j in picks:
                if int(j) > max_index:
                    continue
                print(j, ":".ljust(5), all_data[item][int(j)]["title"])
                cur_filtered.append(all_data[item][int(j)])

            processed_data[item] = cur_filtered

    # dump processed results into a json file
    with open('processed anime dump.json', 'w') as outfile:
        json.dump(processed_data, outfile)


def fetch_anime_data():
    anime_data = {}
    with open("processed anime dump.json", "r") as file:
        processed_data = json.load(file)
        # outer loop for each anime series
        base_url = "https://api.jikan.moe/v3/anime/"
        for series in processed_data:
            print("\n\n--------------- ", series)
            # fetch data for current anime
            series_data = []
            for anime in processed_data[series]:
                full_url = base_url + str(anime["mal_id"])
                print(full_url)
                r = requests.get(full_url).json()
                print(r)
                series_data.append(r)
                # required by api provider to prevent overuse (requirement is 4 second delay between queries)
                sleep(4)
            anime_data[series] = series_data

    # dump processed results into a json file
    with open('anime data dump.json', 'w') as outfile:
        json.dump(anime_data, outfile)


def store_anime_data_into_ods_file():
    import os
    # import socket  # only needed on win32-OOo3.0.0
    import unotools
    unotools.

    # open ods file
    # launch_command = "\"\"C:\\Program Files\\LibreOffice\\program\\soffice.exe\" ./current.ods --calc --accept=\"socket,host=localhost,port=2002;urp;\"\""
    launch_command = "\"\"C:\\Program Files\\LibreOffice\\program\\soffice.exe\" --calc --accept=\"socket,host=localhost,port=2002;urp;\"\""
    print(launch_command)
    os.system(launch_command)

    # get the uno component context from the PyUNO runtime
    local_context = uno.getComponentContext()

    # create the UnoUrlResolver
    resolver = local_context.ServiceManager.createInstanceWithContext(
        "com.sun.star.bridge.UnoUrlResolver", local_context)

    # connect to the running office
    ctx = resolver.resolve("uno:socket,host=localhost,port=2002;urp;StarOffice.ComponentContext")
    smgr = ctx.ServiceManager
    # get the central desktop object
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    # access the current writer document
    model = desktop.getCurrentComponent()
    # access the active sheet
    active_sheet = model.CurrentController.ActiveSheet

    # access cell C4
    cell1 = active_sheet.getCellRangeByName("C4")
    # set text inside
    cell1.String = "Hello world"
    # other example with a value
    cell2 = active_sheet.getCellRangeByName("E6")
    cell2.Value = cell2.Value + 1


# retrieveAllAnimeData()
# filter_anime()
# fetch_anime_data()
store_anime_data_into_ods_file()
