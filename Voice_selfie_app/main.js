
var SpeechRecognition=window.webkitSpeechRecognition;

var Recognition=new SpeechRecognition();


Webcam.set({
    width : 360,
    height : 250,
    img_format : "png",
    png_quality : 180
});


camera = document.getElementById("webcam");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("selfie").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
    })
}

function start(){
    document.getElementById("textbox").innerHTML="";
    Recognition.start();
}

Recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML=content;
    if(content == "take my selfie"){
        console.log("=-Taking your SELFIE-=")
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "taking your selfie in three seconds";
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
    Webcam.attach(camera);    

    setTimeout(function(){
        take_snapshot();
        save();
    }, 3000);
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image ;
    link.click();
}