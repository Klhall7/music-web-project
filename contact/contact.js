'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact Page Ready');

    const contactForm = document.querySelector('#contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("contact form event")
        //take inputs and combine into one string
        const fullName = document.getElementById('fullName').value; 
        const message = document.getElementById('message').value;
        const combinedInputs = `Name: ${fullName}, Email: ${email}, Message: ${message}`;
        //create elements for combinedInputs
        const containerElement = document.createElement('div');
        // set p to have text of input string; class and id for styling and selection; attach to div 
        const paragraphElement = document.createElement('p');
        paragraphElement.id = 'contactFormString';
        paragraphElement.classList.add('contact-form-string');
        paragraphElement.textContent = combinedInputs;
        containerElement.appendChild(paragraphElement)
        // attach div to contact form
        contactForm.appendChild(containerElement);
        // Clear form fields after submission
        contactForm.reset();
    });

    const songRequest = document.querySelector('#songRequest');
    const generateList = document.querySelector('#generateList');
    let undoButtonCreated = false; // Boolean flag to track if button is created
    let sendRequestCreated = false;
    let reqParElementCreated = false;
    let listItemCreated =false;

    generateList.addEventListener('click', function () {
        console.log('request list add click');
        const inputS = document.querySelector('#inputS'); // Select input with id 'inputS'
        const inputA = document.querySelector('#inputA');
        const listElement = document.createElement('ul'); //create ol items from input
        const listItem = document.createElement('li'); //create single list item from both inputs as a string
        listItemCreated=true;
        listItem.innerText = `${inputS.value} - ${inputA.value}`;
        listElement.appendChild(listItem); // add li to ol
        songRequest.appendChild(listElement); // Append the generated list to the container
        songRequest.classList.add('request-list');
        inputS.value = "";
        inputA.value = "";

        
        // Create Undo Button
        if (!undoButtonCreated) {
            const undoButton = document.createElement('button');
            undoButton.setAttribute('type', 'button');
            undoButton.innerText = 'Undo Last';
            undoButton.classList.add('undo-bttn');
            // Append Undo Button next to Generate List Button
            generateList.insertAdjacentElement('afterend', undoButton);
            undoButtonCreated = true; // Update flag to indicate undo button is created
                undoButton.addEventListener('click', function () {
                    console.log('undo click')
                    const lastListItem = songRequest.querySelector('ol li:last-child');
                    if (lastListItem) {
                        lastListItem.remove();
                    }
            });

            //Create send button
            if (!sendRequestCreated && undoButtonCreated) {
                const sendRequest = document.createElement('button');
                sendRequest.setAttribute('type', 'button');
                sendRequest.classList.add('request-bttn');
                sendRequest.innerText = 'SEND REQUEST';
                sendRequestCreated = true;
                undoButton.insertAdjacentElement('afterend', sendRequest);

                    sendRequest.addEventListener('click', function () {
                        console.log("Request Send Clicked")
                        const listItems = songRequest.querySelectorAll('li');
                        const emailInput = document.querySelector('email').value;
                        const compiledList = Array.from(listItems).map(item => item.innerText).join('\n');
                        const compiledInputs = `Email: ${emailInput}\n Requests:${compiledList}`;

                        const containerDiv = document.createElement('div');
                        const paragraphElement = document.createElement('p');
                        paragraphElement.textContent = compiledInputs;
                        containerDiv.appendChild(paragraphElement);
                        songRequest.appendChild(containerDiv);
                    });

                };
            
        };

        // Create paragraph
        if (!reqParElementCreated) {
        const reqParagraphElement = document.createElement('p');
        reqParagraphElement.classList.add('request-text');
        reqParagraphElement.innerText = "If you added all the songs you want click [SEND REQUEST].If not, please continue to add more until you are ready.";
        reqParElementCreated = true;
        songRequest.appendChild(reqParagraphElement);
        } else {
            // If paragraph already exists, remove and re-append after the ordered list
            const reqParagraphElement = songRequest.querySelector('.request-text');
            songRequest.removeChild(reqParagraphElement);
            songRequest.appendChild(reqParagraphElement);
        };
        
    });

});

