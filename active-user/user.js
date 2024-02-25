'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page Ready');
});

const get = (apiUrl) => { 
    console.log('Get Function Ready')
    return fetch(apiUrl, {             
        method: 'GET',                 
        headers: {
            'Authorization': 'token'+ token,
            'User-Agent': 'KyraIsHere/3.0', 
        },
    })                                    
    .then((result) => { console.log(result); return result.json(); })
    
    .then((data) => { console.log(data); return data; })

    .catch((error) => { console.error('ERROR:', error); });
}; 

const token = 'fBGIRCunmzhjcoYzVFhkStdohzYqkPHNFUqYMSUz';
const searchForm =document.querySelector('#searchForm')

searchForm.addEventListener ('submit', async function (event) {
    event.preventDefault();
    console.log ('button clicked')
    const trackName = document.getElementById('trackInput').value

    if (!trackName) { //check input exists
        console.error('Song or "Track" name is required.');
        return;
    }
        try {
            const apiUrl = `https://api.discogs.com/database/search?q=${encodeURIComponent(trackName)}&token=${token}`; 
            const filteredData = await get(apiUrl); // make sure get was successful before proceeding
            console.log(filteredData);

            if (filteredData.results && filteredData.results.length > 0) {
                const firstResult = filteredData.results[0];
                const mappedResult = { //conditional expressions 
                    cover_image: firstResult.cover_image ? firstResult.cover_image: '', 
                    title: firstResult.title ? firstResult.title: '',
                    genre: firstResult.genre ? firstResult.genre.join(', ') : '',
                    style: firstResult.style ? firstResult.style.join(' / ') : '',
                    year: firstResult.year ? firstResult.year : ''
                };

                    const newInspo = document.createElement('div');
                    newInspo.classList.add('new-inspo-div');
                    const resultParagraph = document.createElement('p'); //paragraph element for mapped result
                    const resultText = `${mappedResult.title}, Genre: ${mappedResult.genre}, Style: ${mappedResult.style}, Release Year: ${mappedResult.year}`;
                    resultParagraph.innerHTML = resultText.replace(/,/g, '<br>'); // Replace commas with line breaks
                    resultParagraph.classList.add('new-pgh');

                    newInspo.appendChild(resultParagraph); // append to new div
                    document.getElementById('albumGrid').appendChild(newInspo);

                    const resultImg = document.createElement('img'); // take cover image link and create img. append to div
                    resultImg.src = mappedResult.cover_image;
                    resultImg.classList.add('new-img');
                    resultParagraph.insertAdjacentElement("beforebegin", resultImg);

        
            } else { //if no result found
            const nResultParagraph = document.createElement('p');
            nResultParagraph.textContent = "No results found :(";
            document.getElementById('albumGrid').appendChild(nResultParagraph);  
            }         

        } catch (error) {
            console.error('Try Error:', error);

            }
});




