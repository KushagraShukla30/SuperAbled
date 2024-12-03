
//text to speech converter...................


const input = document.querySelector("input"),
sendtext = document.querySelector(".send");// we are creating 2 constants 

function textToSpeech(input)
{
    let u = new SpeechSynthesisUtterance(input);//creating an object of SpeechSynthesisUtterance web api for input
    speechSynthesis.speak(u);//calling speak funtion so that text will be readed by the assistant
}
sendtext.addEventListener("click",(e)=>{//adding event at send while clicking on the button. 
    if(input.value != ""){
            textToSpeech(input.value);
    }
});
.0``