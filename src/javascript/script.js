
const burger = document.querySelector('.header__burger')
const mobile = document.querySelector('.mobile')

burger.addEventListener('click', () => {
  burger.classList.toggle('active')
  mobile.classList.toggle('active')
})


const myCarousel = document.querySelector('#myCarousel')
const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 1800,
  wrap: true,
  pause: 'hover',
  ride: true,
  touch: true,
})
