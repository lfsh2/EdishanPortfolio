$('.testimonial-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      768: { items: 2 },
      992: { items: 3 }
    }
  });
