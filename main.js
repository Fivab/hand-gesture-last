Webcam.set({
    height:316,
    width:384,
    image_format:'png',
    png_quality:100
})
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_img"src="'+data_uri+'">';
    });
}
console.log("ml5_version", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/b8w_biJhx/model.json', modelLoaded);
 
function modelLoaded() {
    console.log("Model Loaded!")
 }

function speak() {
    var synth= window.speechSynthesis;
    var speakdata1="The first Prediction is"+prediction_1;
    var speakdata2="The second Prediction is"+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}

function check() {
    img= document.getElementById('capture_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();

        if (results[0].label == "Victory!") {
            document.getElementById("update_emoji").innerHTML="&#128081";
        }

        if (results[0].label == "Wonderful!") {
            document.getElementById("update_emoji").innerHTML="&#128076";
        }

        if (results[0].label == "Good!") {
            document.getElementById("update_emoji").innerHTML="&#128077";
        }



        if (results[1].label == "Victory!") {
            document.getElementById("update_emoji2").innerHTML="&#128081";
        }

        if (results[1].label == "Wonderful!") {
            document.getElementById("update_emoji2").innerHTML="&#128076";
        }

        if (results[1].label == "Good!") {
            document.getElementById("update_emoji2").innerHTML="&#128077";
        }
    }
}