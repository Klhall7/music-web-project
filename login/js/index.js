'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Login Page Ready');

});

function get(url) {
    console.log('get function defined');
    return fetch(url, {     
    mode: 'cors',       //fetch requests data from the API server (JSON)
    method: 'GET',                  // want to tell server we want to receive data (fetch can give and receive)
    headers: {
        'User-Agent': 'KyraXIsHere/3.0',  //This server wants a user agent, so we have to explicitly pass one
    },
})                                 // can use a local JSON file instead of a server as a workaround for fetch api Errors
    .then(function (response) { // parameter can have any name, it will still be a response
        console.log(response);
        return response.json();
    })

    .then(function (data) { //data refers to data in API server
        console.log(data);
        return data;
    });
};

    function getReleases(url) {
        console.log('get releases defined');
        get(url).then(function (data) {
            const {releases} = data;
            console.log(releases);
            releases.map(function (release) {
                const { title } = release;
                const paragraph =document.createElement('p');
                paragraph.textContent = title;
                releasesContainer.appendChild(paragraph);
            })
        })
    };

    const printLib = document.querySelector('#printLib');
    const releasesContainer = document.querySelector('#releasesContainer');

    printLib.addEventListener('click',(function() {
        console.log("show active lib clicked")
        get("https://api.discogs.com/artists/277594").then (function(data) {
            const { releases_url } = data;
            getReleases(releases_url);

        });

    }) );


    function showArtist(artistName) {
        console.log('show artist func defined');
        const paragraph = document.createElement('p');
        paragraph.textContent = artistName; // pulling data by key name for p element
        artistsContainer.appendChild(paragraph);
                        
    };

        const artistsData = document.querySelector('#artistsData');
        const artistsContainer = document.querySelector('#artistsContainer');

    
        artistsData.addEventListener('click',(function() {
            console.log("show available clicked xray");
            get("ttps://api.discogs.com/artists/277594").then (function(data) {
                const {name} = data;
                showArtist(name);

            });
        }));

        // startSearch.addEventListener("click", function() {
        document.getElementById("startSearch").addEventListener("click", function() {
            console.log('input fill and search xray');
            let searchKey = document.getElementById("searchInput").value.toLowerCase(); //input control
            const searchResultElement = document.getElementById("searchResult");
            searchKey = searchKey.replace(/\s+/g, ''); // remove spaces from input


            document.getElementById("searchInput").value = ""; //clear input

            get("https://api.discogs.com/artists/277594").then(function(data) {
            
                // Check if the search term matches any key in the JSON data
                for (const key in data) {
                    if (data.hasOwnProperty(searchKey)) {
                        // Output the value of the key
                        searchResultElement.innerText = `${searchKey}: ${data[searchKey]}`;
                        return; // Exit the loop once a match is found
                    }
                }
                // If no match found
                searchResultElement.innerText = "No matching result found.";
            });
        });
    

