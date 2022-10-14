const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK



// Disable/ Enable Button
function toggleButton() {
    button.disabled=!button.disabled;
}

// Passing the joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: '73ecb2b046ca41d7a734b2e3f6559548',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
async function getJokes(){
    let joke='';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    const response = await fetch(apiUrl);
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke=`${data.setup}... ${data.delivery}`;
        }
        else{
            joke=data.joke
        }
        // Text to speech
        tellMe(joke);
        // Disable button
        toggleButton();

}
    catch(e){
        console.log(e);
    }
}

// Event handlers
button.addEventListener("click",getJokes);
audioElement.addEventListener("ended",toggleButton);
