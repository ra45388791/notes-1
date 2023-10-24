const bands_str = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const bands_sort = bands_str.sort((a, b) => a > b ? 1 : -1);


document.querySelector('#bands').innerHTML =
    bands_sort.map((e) => {
        return `<li>${e}<li>`
    })
        .join("");