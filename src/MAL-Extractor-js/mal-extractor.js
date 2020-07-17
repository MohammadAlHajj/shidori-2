// import Axios from "axios";
// import fetch from "fetch";

// scrape all anime data from the provided list
export function getAllPossibleAnimeFromList(list_of_anime, caller) {
    // var path = 'list.txt'
    // base_url = "https://myanimelist.net/api/anime/search.xml?q="
    var base_url = "https://api.jikan.moe/v3/search/anime?q="

    // # get list of anime to search for
    // with open(path) as out_file:
    //     list_of_anime = [i.strip() for i in out_file]

    // console.log(list_of_anime);
    var dict_of_anime = {}
    // scrape search results for each entry in search list
    list_of_anime.forEach(anime => {
        var full_url = base_url + '"'+anime+'"&page=1'
        // console.log(full_url)
        fetch(full_url)
					.then((response) => response.json())
					.then((res) => (dict_of_anime[anime] = res["results"]))
            .then((r) => caller.state.animeList = r)
        .then( r => caller.render())
        
        // required by api provider to prevent overuse (requirement is 4 second delay between queries)
        // sleep(4000)
    });
    // for anime in list_of_anime:
    //     full_url = base_url + '"{}"&page=1'.format(anime)
    //     print(full_url)
    //     r = requests.get(full_url).json()
    //     dict_of_anime[anime] = r["results"]
    //     # required by api provider to prevent overuse (requirement is 4 second delay between queries)
    //     sleep(4)

    // console.log(dict_of_anime);
    // # dump search results into a json file
    // with open("anime dump.json", "w") as out_file:
    //     json.dump(dict_of_anime, out_file)
    // return dict_of_anime
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
    
