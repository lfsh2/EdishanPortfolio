# Contact Form Setup Guide

Your contact form is now working with two options:

## Option 1: Using EmailJS (Recommended - Free & Easy)

EmailJS allows your contact form to send emails directly without a backend server.

### Setup Steps:

1. **Create a Free EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (allows 200 emails/month)

2. **Add an Email Service**
   - Go to Email Services
   - Click "Add New Service"
   - Choose Gmail (or your preferred email service)
   - Connect your email: edishanleetenorio03@gmail.com
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to Email Templates
   - Click "Create New Template"
   - Use this template:
   
   ```
   Subject: New Contact from {{from_name}}
   
   You have received a new message from your portfolio:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
   
   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to Account > General
   - Copy your **Public Key**

5. **Update Your Portfolio**
   - Open `js/main.js`
   - Replace these values around line 15:
   
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your_actual_public_key';
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   ```

6. **Test It!**
   - Open your portfolio
   - Fill out the contact form
   - Submit and check your email

---

## Option 2: Mailto Fallback (Already Working!)

If you don't configure EmailJS, the form will automatically use a **mailto fallback**.

### How it works:
- When someone submits the form, it opens their default email client
- The message is pre-filled with their information
- They can send it directly to you

### Current Functionality:
✅ Email link is clickable: [edishanleetenorio03@gmail.com](mailto:edishanleetenorio03@gmail.com)
✅ Phone link is clickable: [09299503384](tel:+639299503384)
✅ Contact form works with mailto fallback
✅ Form validation is enabled
✅ Success/error messages display

---

## Quick Test

1. Open `index.html` in your browser
2. Scroll to the Contact section
3. Click the email address - your email client should open
4. Click the phone number - your phone app should open (on mobile)
5. Fill out the contact form and submit
   - If EmailJS is configured: Email sent automatically
   - If not configured: Email client opens with pre-filled message

---

## Tips

- **For Production**: Use EmailJS for professional automated emails
- **For Quick Start**: The mailto fallback works immediately, no setup needed
- **Security**: EmailJS handles spam protection and rate limiting
- **Free Tier**: 200 emails/month should be plenty for a portfolio site

---

## Need Help?

If you need help setting up EmailJS, let me know and I can guide you through the process!
