var canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
canvas.style.border = "1px solid";

var context = canvas.getContext("2d");
context.filter = 'brightness(0.4)';
// document.body.appendChild(canvas);

var button = document.createElement("button");
button.innerHTML = "DOWNLOAD COLLAGE";
button.style.position = "absolute";
button.style.top = "615px";
button.style.left = "8px";
button.style.width = "602px";

var link = document.createElement('a');
link.appendChild(button);
// document.body.appendChild(link);

button.addEventListener('click', function () {
    link.href = canvas.toDataURL();
    link.download = "collage.png";
});

var min_x = 200;
var max_x = 400;
var x = Math.round(Math.random() * (max_x - min_x) + min_x);

var min_y = 150;
var max_y = 450;
var y = Math.round(Math.random() * (max_y - min_y) + min_y);

var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'https://source.unsplash.com/random/?nature,winter,summer,autumn,spring', true);
xhr1.send(null);
xhr1.onload = function () {
    if (xhr1.status !== 200){
        alert(`Error ${xhr1.status}: ${xhr1.statusText}`);
    } else {
        context = canvas.getContext("2d");
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            context.drawImage(img, 0, 0, x, y);
        };
        img.src = xhr1.responseURL;
    }
};

// setTimeout(function () {
var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'https://source.unsplash.com/random/?humans', true);
xhr2.send(null);
xhr2.onload = function () {
    if (xhr2.status !== 200){
        alert(`Error ${xhr2.status}: ${xhr2.statusText}`);
    } else {
        context = canvas.getContext("2d");
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            context.drawImage(img, x, 0, canvas.width - x, y);
        };
        img.src = xhr2.responseURL;
    }
}
// }, 2000);

// setTimeout(function () {
var xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'https://source.unsplash.com/random/?home,work,office', true);
xhr3.send(null);
xhr3.onload = function () {
    if (xhr3.status !== 200){
        alert(`Error ${xhr3.status}: ${xhr3.statusText}`);
    } else {
        context = canvas.getContext("2d");
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            context.drawImage(img, 0, y, x, canvas.height - y);
        };
        img.src = xhr3.responseURL;
    }
}
// }, 4000);

// setTimeout(function () {
var xhr4 = new XMLHttpRequest();
xhr4.open('GET', 'https://source.unsplash.com/random/?road', true);
xhr4.send(null);
xhr4.onload = function () {
    if (xhr4.status !== 200){
        alert(`Error ${xhr4.status}: ${xhr4.statusText}`);
    } else {
        context = canvas.getContext("2d");
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () {
            context.drawImage(img, x, y, canvas.width - x, canvas.height - y);
        };
        img.src = xhr4.responseURL;
    }
}
// }, 6000);

setTimeout(function () {
    document.body.appendChild(canvas);
    document.body.appendChild(link);
}, 3000);

setTimeout(function () {
    var xhr_ = new XMLHttpRequest();
    xhr_.open('GET', 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=ru', true);
    xhr_.send(null);
    xhr_.onload = function() {
        if (xhr_.status !== 200) {
            alert(`Error ${xhr_.status}: ${xhr_.statusText}`);
        } else {
            context = canvas.getContext("2d");
            context.filter = "none";
            context.font = "22px Verdana";
            context.fillStyle = "#fff";
            context.textBaseline = "bottom";
            context.textAlign = "center";

            var words = xhr_.responseText.split(" ");
            var countWords = words.length;
            var maxWidth = canvas.width;
            var marginLeft = canvas.width/2;
            var marginTop = canvas.height/2;
            var lineHeight = 30;
            var line = "";
            for (var n = 0; n < countWords; n++) {
                var testLine = line + words[n] + " ";
                var testWidth = context.measureText(testLine).width;
                if (testWidth > maxWidth) {
                    context.fillText(line, marginLeft, marginTop);
                    line = words[n] + " ";
                    marginTop += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            context.fillText(line, marginLeft, marginTop);
        }
    };
}, 2000);