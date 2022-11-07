const exampletext = document.querySelector(".example");
let showexampleimg = false;

exampletext.addEventListener("click", function() {
    if(showexampleimg) {
        showexampleimg = false
        exampletext.style.textDecorationColor = "white"
        document.querySelector(".exampleimg").classList.remove("show")
    } else {
        showexampleimg = true
        exampletext.style.textDecorationColor = "blue"
        document.querySelector(".exampleimg").classList.add("show")
    }
})

exampletext.addEventListener("mouseover", function() {
    exampletext.style.textDecorationColor = "blue"
    document.querySelector(".exampleimg").classList.add("show")
})

exampletext.addEventListener("mouseout", function() {
    exampletext.style.textDecorationColor = "white"
    document.querySelector(".exampleimg").classList.remove("show")
})

document.addEventListener("DOMContentLoaded", function(event) {
    fileUploadStyling();
})

function fileUploadStyling(){
    let input = document.querySelectorAll("input[type=file]");
    for (let i = 0; i < input.length; i++) {
        var inputFile = input[i];
        var label = document.querySelector(".inputlabel")
        inputFile.addEventListener('change',function(e){
            label.innerHTML = this.files[0].name + ' ' + "Datei Ausgewählt";
        });
    }
}

window.uploadPhotos = function(url){
    // Read in file
    var file = event.target.files[0];

    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        console.log('An image has been loaded');

        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 28,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                    if (width > max_size) {
                        width = max_size;
                    }
                    if (height > max_size) {
                        height = max_size;
                    }
                canvas.width = width;
                canvas.height = height;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, width, height);
                console.log("Image was passed in Canvas")
                console.log("Started Gray")
                var imageData = context.getImageData(0,0, width, height);
                for(h=0; h<imageData.height; h++) {
                    console.log("--Height: " + (h+1))
                    for(w=0; w<imageData.width; w++) {
                        console.log("Width: " + (w+1))
                        var index=(w*4)*imageData.width+(h*4);
                        var red=imageData.data[index];
                        var green=imageData.data[index+1];
                        var blue=imageData.data[index+2];
                        //var alpha=imageData.data[index+3];
                        var average=(red+green+blue)/3;
                        imageData.data[index]=average;
                        imageData.data[index+1]=average;
                        imageData.data[index+2]=average;
                        //imageData.data[index+3]=alpha;
                    }
                }
                context.putImageData(imageData,0,0,0,0, imageData.width,   imageData.height);
                console.log("Finished Gray")

                var imageData2 = context.getImageData(0,0, width, height);
                var dataArr = imageData2.data;

                for(var i = 0; i < dataArr.length; i += 4)
                {
                    var r = dataArr[i]; // Red color lies between 0 and 255
                    var g = dataArr[i + 1]; // Green color lies between 0 and 255
                    var b = dataArr[i + 2]; // Blue color lies between 0 and 255
                    var a = dataArr[i + 3]; // Transparency lies between 0 and 255

                    var invertedRed = 255 - r;
                    var invertedGreen = 255 - g;
                    var invertedBlue = 255 - b;

                    dataArr[i] = invertedRed;
                    dataArr[i + 1] = invertedGreen;
                    dataArr[i + 2] = invertedBlue;
                }
                        
                context.putImageData(imageData2,0,0,0,0, imageData2.width,   imageData2.height);

                var dataUrl = canvas.toDataURL('image/jpeg');
                console.log(dataUrl);
                document.querySelector('.preimage').src = dataUrl;
            }
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    }
};

function askki() {
    //Event wenn der Button KI fragen gedrückt wird
}

function abbrechen() {
    document.location.reload()
}

