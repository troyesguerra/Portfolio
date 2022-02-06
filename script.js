// Constructor function with a method of type (does everything)
// Initialize then convert to es6 class

// Typerwriter definition -> init event listener -> function init -> TyperWriter Portotype Funtion 

// ELEMENT: SPAN
// WORDS: ARRAY
// WAIT: TIME BEFORE DELETION

// 1 Constructor Function
const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    // array index
    this.wait = parseInt(wait, 10);
    // convert to integer and in base 10
    this.type();
    // main method
    this.isDeleting = false;
    // State if deleting or not
}

// Type Method
// 4 Add method to typewriter by prototype
TypeWriter.prototype.type = function () {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current]

    // Check if deleting
    if (this.isDeleting) {
        // Remove Char
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        // Add Char
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Type Speed (miliseconds) when deleting it goes faster, when its the end itll pause
    // initial type speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete 
    if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set is deleting to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), typeSpeed);
}

// 2 Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// 3 Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

const joke = document.querySelector('.joke');
const pill = document.querySelector('#pill');
const pillButton = document.querySelector('#pillButton');

const addNewJoke = async () => {
    const jokeString = await getNewJoke();
    pill.textContent = jokeString;
}

const getNewJoke = async () => {
    try {
        const config = {
            headers: {
                Accept: 'application/json',
            }
        };
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        // console.log(res.data);
        return res.data.joke

    } catch (e) {
        return 'No Jokes Available this time. Sorry!'
    }
}

window.addEventListener('load', addNewJoke);
pillButton.addEventListener('click', addNewJoke);