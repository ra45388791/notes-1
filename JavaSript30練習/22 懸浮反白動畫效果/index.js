const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);

function highlightLink() {
    console.log(this.getBoundingClientRect());
    const linkPmt = this.getBoundingClientRect();

    highlight.style.width = `${linkPmt.width + 10}px`;
    highlight.style.height = `${linkPmt.height + 5}px`;
    highlight.style.transform = `translate(${linkPmt.left - 5}px,${linkPmt.top - 2.5 + window.scrollY}px)`;
}

triggers.forEach(element => {
    element.addEventListener('mouseenter', highlightLink);
});