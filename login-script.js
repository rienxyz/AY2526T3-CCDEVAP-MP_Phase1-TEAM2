/**
 * AnimoFlow Login Page - External JavaScript
 * Handles DLSU email validation, guest access, toast notifications
 * Based on project spec: Phase 1 authentication with @dlsu.edu.ph domain
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('dlsuEmail');
    const passwordInput = document.getElementById('password');
    const guestCheckbox = document.getElementById('guestDemo');
    const loginBtn = document.getElementById('loginBtn');
    const emailErrorDiv = document.getElementById('emailError');
    const passwordErrorDiv = document.getElementById('passwordError');
    const forgotLink = document.getElementById('forgotLink');
    
    // Toast element (Bootstrap 5)
    const toastElement = document.getElementById('liveToast');
    let bsToast = null;
    
    // Initialize toast if element exists
    if (toastElement) {
        bsToast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
    }
    
    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success', 'error', 'info' (default: info)
     */
    function showToast(message, type = 'info') {
        if (!bsToast || !toastElement) return;
        
        const toastBody = toastElement.querySelector('.toast-body');
        if (toastBody) {
            toastBody.innerHTML = message;
        }
        
        // Set toast styling based on type
        toastElement.classList.remove('bg-success', 'bg-danger', 'bg-primary');
        if (type === 'success') {
            toastElement.classList.add('bg-success');
            toastElement.style.background = '#006837';
        } else if (type === 'error') {
            toastElement.classList.add('bg-danger');
            toastElement.style.background = '#dc3545';
        } else {
            toastElement.classList.add('bg-primary');
            toastElement.style.background = '#006837';
        }
        
        bsToast.show();
    }
    
    /**
     * Validate DLSU email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid DLSU email
     */
    function validateDLSUEmail(email) {
        // According to spec: must contain "@dlsu.edu.ph" (simple string check, not strict regex)
        if (!email) return false;
        const trimmedEmail = email.trim().toLowerCase();
        return trimmedEmail.includes('@dlsu.edu.ph');
    }
    
    /**
     * Validate password length
     * @param {string} password - Password to validate
     * @returns {boolean} - True if password length >= 8 characters
     */
    function validatePassword(password) {
        return password && password.length >= 8;
    }
    
    /**
     * Clear all validation errors
     */
    function clearErrors() {
        if (emailInput) {
            emailInput.classList.remove('is-invalid');
        }
        if (passwordInput) {
            passwordInput.classList.remove('is-invalid');
        }
        if (emailErrorDiv) {
            emailErrorDiv.classList.add('d-none');
        }
        if (passwordErrorDiv) {
            passwordErrorDiv.classList.add('d-none');
        }
    }
    
    /**
     * Handle successful login (demo simulation)
     * @param {string} email - User email (or 'guest' for guest mode)
     * @param {boolean} isGuest - Whether guest mode is active
     */
    function handleLoginSuccess(email, isGuest = false) {
        const userType = isGuest ? 'Guest' : 'DLSU Student/Faculty';
        const userIdentifier = isGuest ? 'guest_user' : email;
        
        // Store session data in localStorage
        localStorage.setItem('animoflow_user', JSON.stringify({
            email: userIdentifier,
            role: isGuest ? 'guest' : 'user',
            loginTime: new Date().toISOString()
        }));
        
        // Success toast with spec-compliant message
        showToast(`Welcome, ${userType}! Redirecting to dashboard...`, 'success');
        
        // Simulate redirect after 1.5 seconds (to show toast)
        setTimeout(() => {
            console.log('[AnimoFlow] Login successful:', { email: userIdentifier, role: isGuest ? 'guest' : 'user' });
            
            alert(`✅ Login successful!\n\nUser: ${userIdentifier}\nType: ${userType}\n\nIn the full application, you would be redirected to the AnimoFlow dashboard where you can:\n• Report elevator queue status\n• Search for classrooms\n• View crowd indicators\n\n(Session will persist until browser close or logout.)`);
            
            // Optional: Redirect to dashboard (uncomment when dashboard is ready)
            // window.location.href = '/dashboard.html';
        }, 1500);
    }
    
    /**
     * Handle login attempt
     * @param {Event} event - Form submit event
     */
    function handleLogin(event) {
        event.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Check for guest mode first
        const isGuestMode = guestCheckbox ? guestCheckbox.checked : false;
        
        if (isGuestMode) {
            // Guest mode: bypass email/password validation
            if (loginBtn) {
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;
            }
            
            setTimeout(() => {
                handleLoginSuccess('guest@animoflow.local', true);
                if (loginBtn) {
                    loginBtn.classList.remove('loading');
                    loginBtn.disabled = false;
                }
            }, 300);
            
            return;
        }
        
        // Non-guest mode: validate email and password
        const email = emailInput ? emailInput.value : '';
        const password = passwordInput ? passwordInput.value : '';
        
        let isValid = true;
        
        // Email validation (spec: must contain "@dlsu.edu.ph")
        if (!validateDLSUEmail(email)) {
            if (emailInput) {
                emailInput.classList.add('is-invalid');
            }
            if (emailErrorDiv) {
                emailErrorDiv.classList.remove('d-none');
            }
            isValid = false;
        }
        
        // Password validation (spec: minimum 8 characters)
        if (!validatePassword(password)) {
            if (passwordInput) {
                passwordInput.classList.add('is-invalid');
            }
            if (passwordErrorDiv) {
                passwordErrorDiv.classList.remove('d-none');
            }
            isValid = false;
        }
        
        if (!isValid) {
            showToast('Please fix the validation errors before signing in.', 'error');
            return;
        }
        
        // Valid credentials: show loading and process
        if (loginBtn) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        }
        
        // Simulate API call delay (Phase 1: no backend yet)
        setTimeout(() => {
            handleLoginSuccess(email, false);
            if (loginBtn) {
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
            }
        }, 800);
    }
    
    /**
     * Real-time email validation on input
     */
    function onEmailInput() {
        if (!emailInput) return;
        
        const email = emailInput.value;
        if (email && !validateDLSUEmail(email)) {
            emailInput.classList.add('is-invalid');
            if (emailErrorDiv) {
                emailErrorDiv.classList.remove('d-none');
            }
        } else if (email && validateDLSUEmail(email)) {
            emailInput.classList.remove('is-invalid');
            if (emailErrorDiv) {
                emailErrorDiv.classList.add('d-none');
            }
        } else if (!email) {
            emailInput.classList.remove('is-invalid');
            if (emailErrorDiv) {
                emailErrorDiv.classList.add('d-none');
            }
        }
    }
    
    /**
     * Real-time password validation
     */
    function onPasswordInput() {
        if (!passwordInput) return;
        
        const password = passwordInput.value;
        if (password && !validatePassword(password)) {
            passwordInput.classList.add('is-invalid');
            if (passwordErrorDiv) {
                passwordErrorDiv.classList.remove('d-none');
            }
        } else if (password && validatePassword(password)) {
            passwordInput.classList.remove('is-invalid');
            if (passwordErrorDiv) {
                passwordErrorDiv.classList.add('d-none');
            }
        } else if (!password) {
            passwordInput.classList.remove('is-invalid');
            if (passwordErrorDiv) {
                passwordErrorDiv.classList.add('d-none');
            }
        }
    }
    
    /**
     * Handle guest checkbox toggle
     */
    function onGuestToggle() {
        if (!guestCheckbox) return;
        
        const isGuest = guestCheckbox.checked;
        
        if (isGuest) {
            // Guest mode: clear validation states
            if (emailInput) {
                emailInput.classList.remove('is-invalid');
                emailInput.placeholder = "guest@dlsu.edu.ph (optional)";
            }
            if (passwordInput) {
                passwordInput.classList.remove('is-invalid');
            }
            if (emailErrorDiv) emailErrorDiv.classList.add('d-none');
            if (passwordErrorDiv) passwordErrorDiv.classList.add('d-none');
        } else {
            // Normal mode: restore placeholder
            if (emailInput) emailInput.placeholder = "juandelacruz@dlsu.edu.ph";
        }
    }
    
    /**
     * Handle forgot password - demo info toast
     */
    function handleForgotPassword(event) {
        event.preventDefault();
        showToast('Password reset demo: Please contact DLSU IT Services or use "Continue as guest" for view-only access.', 'info');
    }
    
    /**
     * Check if user already has an active session (on page load)
     */
    function checkExistingSession() {
        const storedUser = localStorage.getItem('animoflow_user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                const loginTime = new Date(userData.loginTime);
                const now = new Date();
                const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
                
                if (hoursDiff < 8) {
                    console.log('[AnimoFlow] Active session found for:', userData.email);
                    setTimeout(() => {
                        showToast(`Welcome back! You have an active session as ${userData.email}.`, 'info');
                    }, 500);
                } else {
                    localStorage.removeItem('animoflow_user');
                }
            } catch (e) {
                localStorage.removeItem('animoflow_user');
            }
        }
    }
    
    // ===== Attach Event Listeners =====
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', onEmailInput);
        emailInput.addEventListener('blur', onEmailInput);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', onPasswordInput);
        passwordInput.addEventListener('blur', onPasswordInput);
    }
    
    if (guestCheckbox) {
        guestCheckbox.addEventListener('change', onGuestToggle);
    }
    
    if (forgotLink) {
        forgotLink.addEventListener('click', handleForgotPassword);
    }
    
    // Check for existing session on load
    checkExistingSession();
    
    console.log('[AnimoFlow] Login page initialized — DLSU white/green theme ready');
});