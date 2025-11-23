// contact-fix.js — lightweight contact handler with EmailJS fallback
console.log('contact-fix.js loaded');

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
  if (typeof emailjs !== 'undefined') return true;
  try {
    await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
    return typeof emailjs !== 'undefined';
  } catch (e) {
    console.error('Failed to load EmailJS SDK:', e);
    return false;
  }
}

(async function attachContactHandler() {
  // Wait for DOM
  if (document.readyState === 'loading') await new Promise(r => document.addEventListener('DOMContentLoaded', r));

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');
  if (!contactForm) {
    console.warn('contact-fix: contactForm not found');
    return;
  }

  const EMAILJS_PUBLIC_KEY = 'A_DEL6xAPosD0bPY0';
  const EMAILJS_SERVICE_ID = 'service_37zm85h';
  const EMAILJS_TEMPLATE_ID = 'template_sor2lvt';

  let emailjsReady = false;
  try {
    const ok = await ensureEmailJS();
    if (ok) {
      try { emailjs.init(EMAILJS_PUBLIC_KEY); emailjsReady = true; console.log('contact-fix: EmailJS initialized'); } catch(e){ console.warn('contact-fix: emailjs.init failed', e); }
    }
  } catch (e) {
    console.warn('contact-fix: ensureEmailJS failed', e);
  }

  function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    if (type === 'success') { formMessage.style.backgroundColor = '#d4edda'; formMessage.style.color = '#155724'; formMessage.style.border = '1px solid #c3e6cb'; }
    else if (type === 'error') { formMessage.style.backgroundColor = '#f8d7da'; formMessage.style.color = '#721c24'; formMessage.style.border = '1px solid #f5c6cb'; }
    else { formMessage.style.backgroundColor = '#d1ecf1'; formMessage.style.color = '#0c5460'; formMessage.style.border = '1px solid #bee5eb'; }
    setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
  }

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const subject = (document.getElementById('subject') || {}).value || 'Message from portfolio';
    const message = (document.getElementById('message') || {}).value || '';

    submitBtn.disabled = true; submitBtn.textContent = 'Sending...';

    if (!emailjsReady) {
      // Try to init on-demand
      try {
        const ok = await ensureEmailJS();
        if (ok) { try { emailjs.init(EMAILJS_PUBLIC_KEY); emailjsReady = true; } catch(e){ console.warn('contact-fix init error', e); } }
      } catch(e) { console.warn('contact-fix ensure on-demand failed', e); }
    }

    if (emailjsReady) {
      const templateParams = { from_name: name, from_email: email, subject: subject, message: message, to_email: 'edishanleetenorio03@gmail.com' };
      console.log('contact-fix: sending via EmailJS', templateParams);
      try {
        const resp = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('contact-fix: EmailJS success', resp);
        showMessage('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
      } catch (err) {
        console.error('contact-fix: EmailJS send failed', err);
        showMessage('Failed to send via EmailJS — opening mail client as fallback.', 'error');
        const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = 'mailto:edishanleetenorio03@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);
      } finally {
        submitBtn.disabled = false; submitBtn.textContent = 'Send Message';
      }
    } else {
      // Mailto fallback
      console.log('contact-fix: EmailJS unavailable — using mailto fallback');
      const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      window.location.href = 'mailto:edishanleetenorio03@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailtoBody);
      showMessage('Opening your email client... If it doesn\'t open, please email me directly at edishanleetenorio03@gmail.com', 'info');
      setTimeout(() => { contactForm.reset(); submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }, 2000);
    }
  });

})();
