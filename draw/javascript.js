const container = document.querySelector('.container')
const color = document.querySelector('.color')
const resetbtn = document.querySelector('.reset')
const rubberbtn = document.querySelector('.rubber')

let draw = false;
let rubber = false;

function init() {
    if(IsSafari()) {
        populate(14)
    } else {
        populate(28)
    }
        //Event wenn man die Linkemaustaste drückt
        window.addEventListener('mousedown', function() {
            draw = true
        })
    
        //Event wenn man aufhört die Linkemaustaste zu schicken
        window.addEventListener('mouseup', function() {
            draw = false
        })
    
        //Event wenn man den Button 'reset' Click
        resetbtn.addEventListener('click', function() {
            container.innerHTML = ''
            if(IsSafari()) {
                populate(14)
            } else {
                populate(28)
            }
        })
    
        //Event wenn man den Button 'Radiergummi' Click
        rubberbtn.addEventListener('click', function() {
            if(rubber) {
                //Deaktiviert den Radiergummi
                rubber = false
                rubberbtn.classList.remove('triggerd')
            } else {
                //AKtiviert den Radiergummi
                rubber = true
                rubberbtn.classList.add('triggerd')
            }
        })
}

function populate(size) {
    container.style.setProperty('--size',size)
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    for(let i = 0; i < size * size; i++) {
        const div = document.createElement('div')
        div.classList.add('pixel')
        div.setAttribute("ID",(i+1) + "")
        container.appendChild(div)

        div.addEventListener('mouseover', function() {
            if(rubber) {
                //Hier wird Radiert
                if(draw) {
                    div.style.backgroundColor = '#3d3d3d';
                    console.log("Pixel: " + div.getAttribute("ID") + " würde radiert")
                }
            } else {
                //Wenn die Farbe dem Hintergrund entspricht wird sie wieder auf Weiß gesetzt
                if(color.value === '#3d3d3d') {
                    color.value = '#ffffff'
                }
                //Hier wird der Pixel Coloriert
                if(draw) {
                    div.style.backgroundColor = color.value;  
                }
            }
        })

        //Event wenn der Pixel gedrückt wird
        div.addEventListener('mousedown', function() {
            if(rubber) {
                div.style.backgroundColor = '#3d3d3d';
                console.log("Pixel: " + div.getAttribute("ID") + " würde radiert")
            } else {
                div.style.backgroundColor = color.value;
            }
        })

        //Event wenn man den TouchSreen berührt (benutzt)
        div.addEventListener('ontouchstart', function() {
            div.style.backgroundColor = color.value;
        })
    }
}

function preventDefault(e){
    e.preventDefault();
}

function IsSafari() {
    var safari = navigator.vendor ==  "Apple Computer, Inc."
    return safari
}

init();