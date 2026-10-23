/**
 * K.S. FRUITS - Main Interactive Script
 * Handles Navigation, Enquiry Form Validation, Honest Backend Clarifications,
 * and Direct Pre-filled WhatsApp & Email Handlers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initProductEnquiries();
  initEnquiryForm();
  initQuickQuoteModal();
  initCopyrightYear();
});

/* ==========================================================================
   Mobile Menu Functionality
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   Sticky Header Shadow Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Product Card WhatsApp & Phone Helpers
   ========================================================================== */
const COMPANY_WHATSAPP = '918489031280';
const COMPANY_EMAIL = 'Ksbrine2023@gmail.com';

function initProductEnquiries() {
  // Direct WhatsApp buttons on product cards
  const productWhatsappButtons = document.querySelectorAll('[data-product-whatsapp]');
  productWhatsappButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productName = btn.getAttribute('data-product-whatsapp');
      const text = `Hello K.S. FRUITS, I would like to enquire about ${productName}. Please share details regarding commercial supply.`;
      const url = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  });
}

/* ==========================================================================
   Enquiry Form Validation & Honest Backend Notice
   ========================================================================== */
function initEnquiryForm() {
  const form = document.getElementById('business-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Field references
    const nameInput = form.querySelector('#cust-name');
    const companyInput = form.querySelector('#company-name');
    const phoneInput = form.querySelector('#phone-number');
    const emailInput = form.querySelector('#email-address');
    const productInput = form.querySelector('#product-selection');
    const quantityInput = form.querySelector('#required-quantity');
    const messageInput = form.querySelector('#enquiry-message');

    // Clear previous errors
    clearAllErrors(form);

    // Validate Customer Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please enter your full name (minimum 2 characters).');
      isValid = false;
    }

    // Validate Company Name
    if (!companyInput.value.trim()) {
      setError(companyInput, 'Please enter your business or company name.');
      isValid = false;
    }

    // Validate Phone Number (must have at least 10 digits)
    const phoneVal = phoneInput.value.replace(/[\s-]/g, '');
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneVal)) {
      setError(phoneInput, 'Please enter a valid phone number (10 to 15 digits).');
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      setError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate Product Selection
    if (!productInput.value) {
      setError(productInput, 'Please select a product.');
      isValid = false;
    }

    // Validate Quantity
    if (!quantityInput.value.trim()) {
      setError(quantityInput, 'Please specify your required quantity (e.g., in kg, drums, or tonnage).');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      setError(messageInput, 'Please enter details about your enquiry requirement.');
      isValid = false;
    }

    if (!isValid) {
      // Focus on first invalid input
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // All fields are valid!
    // Since no backend server is configured, never claim message has been sent.
    // Instead, open the honest Backend Notice Modal with ready-to-send WhatsApp & Mailto bridges.
    const enquiryData = {
      name: nameInput.value.trim(),
      company: companyInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      product: productInput.value,
      quantity: quantityInput.value.trim(),
      message: messageInput.value.trim()
    };

    showBackendNoticeModal(enquiryData);
  });
}

function setError(inputEl, msg) {
  inputEl.classList.add('is-invalid');
  const errorContainer = document.getElementById(`${inputEl.id}-error`);
  if (errorContainer) {
    errorContainer.textContent = msg;
  }
}

function clearAllErrors(form) {
  form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  form.querySelectorAll('.field-error-msg').forEach((el) => (el.textContent = ''));
}

/* ==========================================================================
   Honest Backend Notice Modal
   Never falsely claims that an enquiry has been sent.
   Provides real, working WhatsApp and Email actions using the customer's data.
   ========================================================================== */
function showBackendNoticeModal(data) {
  const modal = document.getElementById('backend-notice-modal');
  if (!modal) return;

  // Build formatted text for WhatsApp
  const waMessage = 
`*NEW BUSINESS ENQUIRY - K.S. FRUITS*
*Name:* ${data.name}
*Company:* ${data.company}
*Phone:* ${data.phone}
*Email:* ${data.email}
*Product:* ${data.product}
*Required Quantity:* ${data.quantity}
*Message:* ${data.message}

Sent via K.S. FRUITS official website`;

  // Build mailto body
  const mailSubject = `Business Enquiry from ${data.name} (${data.company}) - ${data.product}`;
  const mailBody = 
`Dear K.S. FRUITS Team,

I would like to place an enquiry for your brine products:

- Name: ${data.name}
- Company: ${data.company}
- Phone: ${data.phone}
- Email: ${data.email}
- Product: ${data.product}
- Required Quantity: ${data.quantity}

Details:
${data.message}

Looking forward to your prompt response.`;

  // Update modal preview
  const previewDiv = modal.querySelector('#modal-enquiry-preview');
  if (previewDiv) {
    previewDiv.innerHTML = `
      <p><strong>Customer:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.company)})</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)} | <strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Product:</strong> ${escapeHtml(data.product)} | <strong>Quantity:</strong> ${escapeHtml(data.quantity)}</p>
      <p><strong>Message:</strong> ${escapeHtml(data.message)}</p>
    `;
  }

  // Setup WhatsApp button
  const waBtn = modal.querySelector('#modal-wa-send-btn');
  if (waBtn) {
    waBtn.onclick = () => {
      const url = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
      window.open(url, '_blank');
    };
  }

  // Setup Email button
  const emailBtn = modal.querySelector('#modal-email-send-btn');
  if (emailBtn) {
    emailBtn.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  }

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Setup close handlers
  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal(modal);
  }

  modal.onclick = (e) => {
    if (e.target === modal) closeModal(modal);
  };
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   Quick Quote Modal (Triggerable from Header CTA & Product Cards)
   ========================================================================== */
function initQuickQuoteModal() {
  const quoteModal = document.getElementById('quick-quote-modal');
  if (!quoteModal) return;

  const quoteButtons = document.querySelectorAll('[data-open-quote]');
  quoteButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillProduct = btn.getAttribute('data-open-quote');
      
      const selectEl = quoteModal.querySelector('#modal-product-select');
      if (selectEl && prefillProduct) {
        selectEl.value = prefillProduct;
      }

      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeBtn = quoteModal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal(quoteModal);
  }

  quoteModal.onclick = (e) => {
    if (e.target === quoteModal) closeModal(quoteModal);
  };

  // Quick modal form validation & transfer
  const quickForm = quoteModal.querySelector('#quick-quote-form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = quickForm.querySelector('#quick-name').value.trim();
      const phone = quickForm.querySelector('#quick-phone').value.trim();
      const product = quickForm.querySelector('#modal-product-select').value;
      const quantity = quickForm.querySelector('#quick-quantity').value.trim();
      const notes = quickForm.querySelector('#quick-notes').value.trim();

      if (!name || !phone || !product || !quantity) {
        alert('Please fill in your name, contact phone, selected product, and quantity.');
        return;
      }

      // Close quick modal
      closeModal(quoteModal);

      // Open honest notice modal with this data
      showBackendNoticeModal({
        name: name,
        company: 'Business Client',
        phone: phone,
        email: 'Provided via WhatsApp / Call',
        product: product,
        quantity: quantity,
        message: notes || 'Enquiry initiated via quick quote.'
      });
    });
  }
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function initCopyrightYear() {
  const yearEls = document.querySelectorAll('.dynamic-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = currentYear;
  });
}
