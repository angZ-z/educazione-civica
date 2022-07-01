
async function setup() {

  var contact_name = document.getElementById('contact-name').value  
  var mail = document.getElementById('contact-mail').value
  var message = document.getElementById('contact-message').value
  
  const data = { contact_name, mail, message }
  
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const res = await fetch('/contatti', options)
  const json = await res.json()
  console.log(json) 
} 

async function search() {

  var mail_input = document.getElementById('mail_input').value
  data = {mail_input}

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const res = await fetch('/storico', options)
  const info = await res.json();

      const root = document.createElement('p');
      const time = document.createElement('h3');
      const message = document.createElement('h4');
    
      time.textContent = `${info.time} da ${info.name.replace(/^\w/, (c) => c.toUpperCase())}`;
      message.textContent = info.message;

      root.append(time, message);
      document.body.append(root);
  
    console.log(info);
  }




//animazione educazione civica
$('.slide-nav').on('click', function(e) {
  e.preventDefault();
  // get current slide
  var current = $('.flex--active').data('slide'),
    // get button data-slide
    next = $(this).data('slide');

  $('.slide-nav').removeClass('active');
  $(this).addClass('active');

  if (current === next) {
    return false;
  } else {
    $('.slider__warpper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
    $('.flex--active').addClass('animate--end');
    setTimeout(function() {
      $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
      $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
    }, 800);
  }
});


var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 20,
  effect: 'fade',
  loop: true,
  speed: 300,
  mousewheel: {
    invert: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});