const nav = document.querySelector('.top');
const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');

function handleEnter() {
    // console.log('移入')
    this.classList.add('trigger-enter')
    setTimeout(() => this.classList.contains("trigger-enter") && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    const dropdown = this.querySelector('.dropdown');
    const liProperty = dropdown.getBoundingClientRect();
    const navProperty = nav.getBoundingClientRect();

    // console.log(navProperty)
    // console.log(liProperty);
    const coords = {
        height: liProperty.height,
        width: liProperty.width,
        top: liProperty.top - navProperty.top,
        left: liProperty.left - navProperty.left,
    }


    console.log(coords);
    background.style.width = coords.width + 'px';
    background.style.height = coords.height + 'px';
    background.style.transform = `translate(${coords.left}px,${coords.top}px)`
}
function handleLeave() {
    // console.log('移出')
    this.classList.remove('trigger-enter')
    setTimeout(() => {
        this.classList.remove('trigger-enter-active');
    }, 150);
    background.classList.remove('open');


}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));