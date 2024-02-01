'use strict';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Queue Ready');

    const userList= document.querySelector('#userList');
    const generateList = document.querySelector('#generateList')
    
    generateList.addEventListener('click', function () {
        const inputS = document.querySelector('#inputS'); // Select input with id 'inputS'
        const inputA = document.querySelector('#inputA');

        const listElement = document.createElement('ol'); //create ol items from input

        const listItem = document.createElement('li'); //create single list item from both inputs as a string
        listItem.innerText = `${inputS.value} - ${inputA.value}`;

        // Check if the list item is not empty before appending
        if (listItem.innerText.trim() !== '') {
            listElement.appendChild(listItem); // add li to ol
            userList.appendChild(listElement); // Append the generated list to the container
            userList.classList.add('new-list'); //add class to userList
        }     
        // Clear the value of the input fields
        inputS.value = "";
        inputA.value = "";
    });
});

function get(url) {
    console.log('Functions Defined')
    return fetch(url, {             //fetch requests data from the API server (JSON)
    method: 'GET',                  // want to tell server we want to receive data (fetch can give and receive)
    headers: {
        'User-Agent': 'KyraHaIsHere/3.0', //This server wants a user agent, so we have to explicitly pass one
    },
})                                  // can use a local JSON file instead of a server as a workaround for fetch api Errors
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
        get(url).then(function (data) {
            const {releases} = data;
            console.log(releases);
            releases.map(function (release) {
                const { title } = release;
                const paragraph =document.createElement('p');
                paragraph.textContent = title;
                // printLib.appendChild(paragraph);
                releasesContainer.appendChild(paragraph);
            })
        })
    };
    

    document.addEventListener('DOMContentLoaded', function () { // DOM event setup
    console.log('Library Loaded');

    const printLib = document.querySelector('#printLib');
    const releasesContainer = document.querySelector('#releasesContainer');

    printLib.addEventListener('click',(function() {
        console.log("IIFE")
        get("https://api.discogs.com/artists/277594").then (function(data) {
            const { releases_url } = data;
            getReleases(releases_url);

        });

    }) );

    });

    function showArtist(artistName) {
        const paragraph = document.createElement('p');
        paragraph.textContent = artistName; // pulling data by key name for p element
        artistsContainer.appendChild(paragraph);
                        
    };

    document.addEventListener('DOMContentLoaded', function () { 
        console.log('XRay Loaded');
    
        const artistsData = document.querySelector('#artistsData');
        const artistsContainer = document.querySelector('#artistsContainer');

    
        artistsData.addEventListener('click',(function() {
            console.log("artists IIFE");
            get("https://api.discogs.com/artists/277594").then (function(data) {
                const {name} = data;
                showArtist(name);

            });
        }));

        // startSearch.addEventListener("click", function() {
        document.getElementById("startSearch").addEventListener("click", function() {
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

        // document.getElementById("showKeys").addEventListener("click", function() {
        //     const keysContainer = document.getElementById("#keysContainer");
        //     get("https://api.discogs.com/artists/277594").then(function(data) {
        //         const keys = Object.keys(data); 
        //         keys.forEach(function(key) { 
        //             const paragraph = document.createElement("p");
        //             paragraph.textContent = key;
        //             keysContainer.appendChild(paragraph);
        //         });
        //     });
        // });
    
});
