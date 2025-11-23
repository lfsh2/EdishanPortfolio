// main.js loaded
console.log('main.js loaded');

// Testimonial Carousel
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

document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOMContentLoaded fired.');

  // Ensure EmailJS is available; if not, attempt to load it dynamically
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async function ensureEmailJS() {
    if (typeof emailjs !== 'undefined') {
      console.log('EmailJS already present.');
      return true;
    }
    const CDN = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    try {
      console.log('EmailJS not found, loading from CDN...');
      await loadScript(CDN);
      if (typeof emailjs !== 'undefined') {
        console.log('EmailJS loaded dynamically.');
        return true;
      }
      console.error('EmailJS still undefined after loading script.');
      return false;
    } catch (err) {
      console.error('Error loading EmailJS SDK:', err);
      return false;
    }
  }

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  // Initialize EmailJS with your public key
  const EMAILJS_PUBLIC_KEY = 'A_DEL6xAPosD0bPY0';
  const EMAILJS_SERVICE_ID = 'service_37zm85h';
  const EMAILJS_TEMPLATE_ID = 'template_sor2lvt';

  // Try to initialize EmailJS (use dynamic load if needed)
  let emailJSInitialized = false;
  try {
    const available = await ensureEmailJS();
    if (available && typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailJSInitialized = true;
        console.log('EmailJS initialized successfully');
      } catch (initErr) {
        console.error('EmailJS init error:', initErr);
      }
    } else {
      console.log('EmailJS not available, will use mailto fallback');
    }
  } catch (error) {
    console.log('EmailJS check failed, will use mailto fallback', error);
  }

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // If EmailJS is configured, use it
    if (!emailJSInitialized) {
      // Try to load/init again just before sending
      try {
        const availableNow = await ensureEmailJS();
        if (availableNow && typeof emailjs !== 'undefined') {
          try { emailjs.init(EMAILJS_PUBLIC_KEY); emailJSInitialized = true; console.log('EmailJS initialized on-demand.'); } catch(e){ console.error('EmailJS on-demand init failed', e); }
        }
      } catch(e) {
        console.error('On-demand EmailJS load failed', e);
      }
    }

    if (emailJSInitialized && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'edishanleetenorio03@gmail.com'
      };

      console.log('Sending via EmailJS with params:', templateParams);
      try {
        const resp = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('EmailJS SUCCESS', resp);
        showMessage('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
      } catch (err) {
        console.error('EmailJS send FAILED', err);
        showMessage('Failed to send message. Please try emailing directly.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    } else {
      // Fallback: Open default email client
      console.log('Using mailto fallback');
      const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoLink = 'mailto:edishanleetenorio03@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);

      window.location.href = mailtoLink;

      showMessage('Opening your email client... If it doesn\'t open, please email me directly at edishanleetenorio03@gmail.com', 'info');

      // Reset form after a delay
      setTimeout(function() {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }, 2000);
    }
  });

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.style.display = 'block';

    // Set colors based on message type
    if (type === 'success') {
      formMessage.style.backgroundColor = '#d4edda';
      formMessage.style.color = '#155724';
      formMessage.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
      formMessage.style.backgroundColor = '#f8d7da';
      formMessage.style.color = '#721c24';
      formMessage.style.border = '1px solid #f5c6cb';
    } else {
      formMessage.style.backgroundColor = '#d1ecf1';
      formMessage.style.color = '#0c5460';
      formMessage.style.border = '1px solid #bee5eb';
    }

    // Hide message after 5 seconds
    setTimeout(function() {
      formMessage.style.display = 'none';
    }, 5000);
  }

  // Portfolio modal and project data

      document.addEventListener('DOMContentLoaded', async function() {
        console.log('DOMContentLoaded fired.');

        // Ensure EmailJS is available; if not, attempt to load it dynamically
        function loadScript(src) {
          return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('Failed to load ' + src));
            document.head.appendChild(s);
          });
        }

        async function ensureEmailJS() {
          if (typeof emailjs !== 'undefined') {
            console.log('EmailJS already present.');
            return true;
          }
          const CDN = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          try {
            console.log('EmailJS not found, loading from CDN...');
            await loadScript(CDN);
            if (typeof emailjs !== 'undefined') {
              console.log('EmailJS loaded dynamically.');
              return true;
            }
            console.error('EmailJS still undefined after loading script.');
            return false;
          } catch (err) {
            console.error('Error loading EmailJS SDK:', err);
            return false;
          }
        }

        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');

        // Initialize EmailJS with your public key
        const EMAILJS_PUBLIC_KEY = 'A_DEL6xAPosD0bPY0';
        const EMAILJS_SERVICE_ID = 'service_37zm85h';
        const EMAILJS_TEMPLATE_ID = 'template_sor2lvt';

        // Try to initialize EmailJS (use dynamic load if needed)
        let emailJSInitialized = false;
        try {
          const available = await ensureEmailJS();
          if (available && typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            try {
              emailjs.init(EMAILJS_PUBLIC_KEY);
              emailJSInitialized = true;
              console.log('EmailJS initialized successfully');
            } catch (initErr) {
              console.error('EmailJS init error:', initErr);
            }
          } else {
            console.log('EmailJS not available, will use mailto fallback');
          }
        } catch (error) {
          console.log('EmailJS check failed, will use mailto fallback', error);
        }

        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;

          // Disable submit button
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';

          // If EmailJS is configured, use it
          (async function() {
            if (!emailJSInitialized) {
              // Try to load/init again just before sending
              try {
                const availableNow = await ensureEmailJS();
                if (availableNow && typeof emailjs !== 'undefined') {
                  try { emailjs.init(EMAILJS_PUBLIC_KEY); emailJSInitialized = true; console.log('EmailJS initialized on-demand.'); } catch(e){ console.error('EmailJS on-demand init failed', e); }
                }
              } catch(e) {
                console.error('On-demand EmailJS load failed', e);
              }
            }

            if (emailJSInitialized && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
            const templateParams = {
              from_name: name,
              from_email: email,
              subject: subject,
              message: message,
              to_email: 'edishanleetenorio03@gmail.com'
            };
      
              console.log('Sending via EmailJS with params:', templateParams);
              try {
                const resp = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                console.log('EmailJS SUCCESS', resp);
                showMessage('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
              } catch (err) {
                console.error('EmailJS send FAILED', err);
                showMessage('Failed to send message. Please try emailing directly.', 'error');
              } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
              }
            } else {
              // Fallback: Open default email client
              console.log('Using mailto fallback');
              const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
              const mailtoLink = 'mailto:edishanleetenorio03@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);
        
              window.location.href = mailtoLink;
        
              showMessage('Opening your email client... If it doesn\'t open, please email me directly at edishanleetenorio03@gmail.com', 'info');
        
              // Reset form after a delay
              setTimeout(function() {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
              }, 2000);
            }
          })();
        });

        function showMessage(text, type) {
          formMessage.textContent = text;
          formMessage.style.display = 'block';
    
          // Set colors based on message type
          if (type === 'success') {
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.border = '1px solid #c3e6cb';
          } else if (type === 'error') {
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
            formMessage.style.border = '1px solid #f5c6cb';
          } else {
            formMessage.style.backgroundColor = '#d1ecf1';
            formMessage.style.color = '#0c5460';
            formMessage.style.border = '1px solid #bee5eb';
          }

          // Hide message after 5 seconds
          setTimeout(function() {
            formMessage.style.display = 'none';
          }, 5000);
        }

  
  // Portfolio modal and project data
  const projectsData = {
    project1: {
      title: "Construction Portfolio & Appointment Booking System",
      category: "Web Development",
      description: "A comprehensive construction company website featuring portfolio showcase, client testimonials, and integrated appointment booking system. Implemented automated email notifications and admin dashboard for appointment management, resulting in 40% increase in client inquiries and streamlined booking process.",
      client: "JKK Construction Services Co.",
      date: "February 2024",
      technologies: ["HTML5/CSS3", "PHPMailer", "PHP", "MySQL", "Hostinger Hosting"],
      link: "https://jkkconstructionservices.com/",
      results: ["40% increase in client inquiries", "Automated appointment system", "Mobile-responsive design", "SEO optimized"],
      images: [
        "assets/work/jkk/JKK.png",
        "assets/work/jkk/JKkADMIN.png",
        "assets/work/jkk/JKKTransaction.png",
        "assets/work/jkk/Appointment_JKK.png",
        "assets/work/jkk/1.png",
        "assets/work/jkk/2.png",
        "assets/work/jkk/3.png",
        "assets/work/jkk/5.png",
        "assets/work/jkk/6.png",
        "assets/work/jkk/8.png",
        "assets/work/jkk/9.png"
      ]
    },
    project2: {
      title: "IEM Ecommerce with 3D Customization & Payment Integration",
      category: "Web Development",
      description: "A next-generation e-commerce platform featuring real-time 3D product customization using Three.js and seamless payment processing. Integrated PayMongo payment gateway with secure transaction handling, reducing cart abandonment by 35% and improving user engagement through interactive 3D visualization.",
      client: "INM Audio",
      date: "November 2023",
      technologies: ["CodeIgniter", "Three.js", "PayMongo API", "MySQL", "PHP", "HTML5/CSS3/JS"],
      link: "https://www.inmaudio.com/designer",
      results: ["35% reduction in cart abandonment", "Real-time 3D product visualization", "Secure payment processing", "Admin inventory management"],
      images: [
        "assets/work/inm/INMHP.png",
        "assets/work/inm/Customization.png",
        "assets/work/inm/custom1.png",
        "assets/work/inm/GRINM.png",
        "assets/work/inm/Comm.png",
        "assets/work/inm/Shop.png",
        "assets/work/inm/cart.png",
        "assets/work/inm/inmadin.png",
        "assets/work/inm/manageOrd.png",
        "assets/work/inm/modal.png"
      ]
    },
    project3: {
      title: "Theatre Ticketing System",
      category: "Web Development",
      description: "A modern theatre booking system with interactive UI, that allows user to browse shows, select seats, and purchase ticket online. Manage seat availablilty, show schedules, and payment processing, providing convinience to customers",
      client: "Medallion Theatre",
      date: "August 2023",
      technologies: ["CodeIgniter", "Php", "MySql", "Html + Css + Js"],
      link: "",
      images: [
        "assets/work/movie/1.png",
        "assets/work/movie/2.png",
        "assets/work/movie/3.png",
        "assets/work/movie/4.png",
        "assets/work/movie/5.png",
        "assets/work/movie/6.png"
      ]
    },
    project4: {
      title: "UI/UX Wireframs",
      category: "UI/UX Designn",
      description: "A plot of ui/ux wireframes of previous project that worked on",
      client: "",
      date: "May 2024",
      technologies: ["Figma"],
      images: [
        "assets/work/ui/1.png",
        "assets/work/ui/2.png",
        "assets/work/ui/3.png",
        "assets/work/ui/7.png"
      ]
    },
    project5: {
      title: "CVSU External Business and Affairs Website",
      category: "Web Development",
      description: "A responsive website for a CVSU Eba page and EBA shop that showcase and offers various product of EBA. Also it has an Admin CRM that manage stocks, vire transaction, see schedule, manage announcement for the bulletin, and also manage shop",
      client: "CVSU Tanza EBA",
      date: "March 2024",
      technologies: ["Reactjs", "NodeJs", "RestApi", "JavaScript", "MySQL"],
      link: "https://example.com/restaurant-website",
      images: [
        "assets/work/ui/4.png",
        "assets/work/ui/5.png",
        "assets/work/ui/6.png",
        "assets/work/mobile/7.png",
        "assets/work/mobile/8.png",
        "assets/work/mobile/9.png",
        "assets/work/mobile/10.png",
        "assets/work/mobile/11.png",
        "assets/work/mobile/12.png"
      ]
    },
    project6: {
      title: "CVSU* Tanza EBA Shop",
      category: "UI/UX Design",
      description: "A clean, intuitive interface design for a shop application focusing on user experience, accessibility, and engaging visual elements. The app features a clean UI, user-friendly navigation, offering a convenient shopping experience on the go.",
      client: "CVSU Tanza EBA",
      date: "January 2024",
      technologies: ["Figma"],
      link: "",
      images: [
        "assets/work/mobile/1.png",
        "assets/work/mobile/2.png",
        "assets/work/mobile/3.png",
        "assets/work/mobile/4.png",
        "assets/work/mobile/5.png",
        "assets/work/mobile/6.png"
      ]
    },
    project7: {
      title: "HOA Management System",
      category: "Web Development",
      description: "A comprehensive system for managing homeowners associations, including features for communication, document management, and payment processing, designed to streamline HOA operations and enhance member engagement.",
      client: "Pagsibol Village HOA",
      date: "June 2024",
      technologies: ["CodeIgniter", "Php", "MySql", "Html + Css + Js"],
      link: "",
      images: [
        "assets/work/hoa/login1.png",
        "assets/work/hoa/h1.png",
        "assets/work/hoa/h2.png",
        "assets/work/hoa/h3.png",
        "assets/work/hoa/h4.png",
        "assets/work/hoa/h5.png",
        "assets/work/hoa/h6.png"
      ]
    },
    project8: {
      title: "ForeverLife Gym Management System",
      category: "Web Development",
      description: "A comprehensive gym management solution built with Laravel and Vue.js, featuring member management, class scheduling, payment processing, and real-time analytics. Implemented role-based access control and automated billing, reducing administrative overhead by 50% and improving member satisfaction by 25%.",
      client: "ForeverLife Gym",
      date: "January 2025",
      technologies: ["Laravel", "Vue.js", "React.js", "PHP", "MySQL", "HTML/CSS/JS"],
      link: "",
      results: ["50% reduction in admin overhead", "25% improvement in member satisfaction", "Automated billing system", "Real-time analytics dashboard"],
      images: [
        "assets/work/gym/h11.png",
        "assets/work/gym/h2.png",
        "assets/work/gym/h3.png",
        "assets/work/gym/f1.png",
        "assets/work/gym/f2.png",
        "assets/work/gym/p1.png",
        "assets/work/gym/p2.png",
        "assets/work/gym/c1.png",
        "assets/work/gym/c2.png",
        "assets/work/gym/dashb1.png"
      ]
    },
    project9: {
      title: "Vantrippers Travel and Tours Management System",
      category: "Web Development",
      description: "A comprehensive travel and tours management system featuring portfolio website with integrated CRM for booking management, scheduling, appointment booking, and van rental management. Built with modern web technologies to streamline travel operations and enhance customer experience through automated booking workflows and real-time availability tracking.",
      client: "Vantrippers Travel and Tours",
      date: "October 2024",
      technologies: ["Next.js", "TypeScript", "React", "Laravel", "MySQL", "AWS", "Payment Gateway"],
      link: "https://vantripperstravelandtours.com/",
      results: ["Streamlined booking management", "Automated scheduling system", "Integrated CRM dashboard", "Real-time availability tracking"],
      images: [
        "assets/work/vantrips/v1.png",
        "assets/work/vantrips/v2.png",
        "assets/work/vantrips/v3.png",
        "assets/work/vantrips/v4.png",
        "assets/work/vantrips/v5.png",
        "assets/work/vantrips/v6.png",
        "assets/work/vantrips/v7.png",
        "assets/work/vantrips/v8.png",
        "assets/work/vantrips/v9.png",
        "assets/work/vantrips/v10.png"
      ]
    },
    project10: {
      title: "Cozy Crave Finder - Tinder-based Food Hunting",
      category: "Web Development",
      description: "A unique food discovery platform inspired by Tinder, featuring interactive quiz and swipe functionality to match users with their perfect food cravings. Users answer preference questions and swipe through curated food options to find personalized recommendations. Built with modern frontend technologies and intuitive UX design for engaging food exploration experience.",
      client: "Cozy Crave Finder",
      date: "September 2024",
      technologies: ["Next.js", "TypeScript", "React", "Shadcn UI", "Vercel", "Geolocation API"],
      link: "https://cozy-crave-finder.vercel.app/",
      results: ["Interactive food matching system", "Personalized recommendations", "Engaging swipe interface", "Location-based suggestions"],
      images: [
        "assets/work/cozy-crave/1.png",
        "assets/work/cozy-crave/2.png",
        "assets/work/cozy-crave/3.png",
        "assets/work/cozy-crave/4.png",
        "assets/work/cozy-crave/5.png",
        "assets/work/cozy-crave/6.png",
        "assets/work/cozy-crave/7.png",
        "assets/work/cozy-crave/8.png",
        "assets/work/cozy-crave/9.png"
      ]
    },
    project11: {
      title: "MeepleCrate - Board Game Rental Platform",
      category: "Web Development",
      description: "A modern, TypeScript-based board game rental service built with Next.js 14, featuring seamless BoardGameGeek (BGG) integration for dynamic game catalog management. Complete booking and inventory management system with secure authentication, Stripe payment processing, and mobile-first responsive design optimized for performance.",
      client: "MeepleCrate",
      date: "November 2024",
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Stripe API", "BoardGameGeek API", "PostgreSQL"],
      link: "",
      results: ["Real-time BGG integration", "Secure payment processing", "Dynamic game catalog", "Mobile-first responsive design"],
      images: [
        "assets/work/meeplecrate/1.png",
        "assets/work/meeplecrate/2.png",
        "assets/work/meeplecrate/3.png",
        "assets/work/meeplecrate/4.png",
        "assets/work/meeplecrate/5.png",
        "assets/work/meeplecrate/v21.png",
        "assets/work/meeplecrate/6.png",
        "assets/work/meeplecrate/7.png",
        "assets/work/meeplecrate/8.png",
        "assets/work/meeplecrate/9.png",
        "assets/work/meeplecrate/10.png",
        "assets/work/meeplecrate/11.png",
        "assets/work/meeplecrate/12.png",
        "assets/work/meeplecrate/13.png",
        "assets/work/meeplecrate/14.png",
        "assets/work/meeplecrate/15.png",
        "assets/work/meeplecrate/16.png",
        "assets/work/meeplecrate/17.png",
        "assets/work/meeplecrate/18.png",
        "assets/work/meeplecrate/19.png",
        "assets/work/meeplecrate/20.png"
      ]
    }
  };

  const modal = document.getElementById('portfolio-modal');
  const closeModal = document.querySelector('.close-modal');
  const projectButtons = document.querySelectorAll('.view-project');
  
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-description');
  const modalClient = document.getElementById('modal-client');
  const modalDate = document.getElementById('modal-date');
  const modalTech = document.getElementById('modal-tech');
  const modalLink = document.getElementById('modal-link');
  const modalLinkContainer = document.getElementById('modal-link-container');
  const galleryImages = document.getElementById('gallery-images');
  const galleryIndicators = document.getElementById('gallery-indicators');
  const prevBtn = document.getElementById('prev-img');
  const nextBtn = document.getElementById('next-img');
  const modalResults = document.getElementById('modal-results');
  
  let currentImageIndex = 0;
  let currentProject = null;

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    currentProject = project;
    currentImageIndex = 0;
    
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.description;
    modalClient.textContent = project.client;
    modalDate.textContent = project.date;
    
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
      const li = document.createElement('li');
      li.textContent = tech;
      modalTech.appendChild(li);
    });
    
    // Add results if available
    if (project.results) {
      modalResults.innerHTML = '';
      project.results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        modalResults.appendChild(li);
      });
      modalResults.parentElement.style.display = 'block';
    } else {
      modalResults.parentElement.style.display = 'none';
    }
    
    if (project.link) {
      modalLink.href = project.link;
      modalLinkContainer.style.display = 'block';
    } else {
      modalLinkContainer.style.display = 'none';
    }
    
    setupGallery(project.images);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
  }
    
  function setupGallery(images) {
    galleryImages.innerHTML = '';
    galleryIndicators.innerHTML = '';
    
    images.forEach((imgSrc, index) => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'gallery-image';
      imgDiv.style.backgroundImage = `url(${imgSrc})`;
      galleryImages.appendChild(imgDiv);
      
      const indicator = document.createElement('div');
      indicator.className = 'gallery-indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.dataset.index = index;
      indicator.addEventListener('click', () => {
        goToImage(index);
      });
      galleryIndicators.appendChild(indicator);
    });
    
    updateGalleryPosition();
  }
    
  function updateGalleryPosition() {
    galleryImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    
    const indicators = galleryIndicators.querySelectorAll('.gallery-indicator');
    indicators.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
    
  function goToImage(index) {
    if (!currentProject) return;
    
    if (index < 0) {
      index = currentProject.images.length - 1;
    } else if (index >= currentProject.images.length) {
      index = 0;
    }
    
    currentImageIndex = index;
    updateGalleryPosition();
  }
    
  function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; 
    currentProject = null;
  }
    
  projectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });
    
  closeModal.addEventListener('click', closeProjectModal);
    
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeProjectModal();
    }
  });
    
  prevBtn.addEventListener('click', () => {
    goToImage(currentImageIndex - 1);
  });
    
  nextBtn.addEventListener('click', () => {
    goToImage(currentImageIndex + 1);
  });
    
  document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
      if (event.key === 'Escape') {
        closeProjectModal();
      } else if (event.key === 'ArrowLeft') {
        goToImage(currentImageIndex - 1);
      } else if (event.key === 'ArrowRight') {
        goToImage(currentImageIndex + 1);
      }
    }
  });

}
});
