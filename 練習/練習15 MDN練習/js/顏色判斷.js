var select = document.querySelector('select');
var html = document.querySelector('.output');

select.onchange = function () {
    var choice = select.value;

    // ADD SWITCH STATEMENT
    switch (choice) {
        case 'white':
            update('white', 'black');
            break;

        case 'black':
            update('black', 'white');
            break;

        case 'purple':
            update('Purple', 'black');
            break;

        case 'yellow':
            update('Yellow', 'black');
            break;

        case 'psychedelic':
            update('psychedelic', 'black');
            break;

    }


}

function update(bgColor, textColor) {
    html.style.backgroundColor = bgColor;
    html.style.color = textColor;
}



