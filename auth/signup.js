// Signup Form Handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you can add your signup logic
    console.log('Signup attempt:', {
        username: username,
        email: email,
        password: password
    });
    
    // Example: You can send data to your server
    // fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, email, password })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         alert('Account created successfully!');
    //         window.location.href = 'login.html';
    //     } else {
    //         alert('Signup failed: ' + data.message);
    //     }
    // });
    
    // For demo purposes:
    alert('Account created successfully! Username: ' + username);
    // Redirect to login page after successful signup
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});

// Add input animation
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Real-time password match indicator
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

confirmPasswordInput.addEventListener('input', function() {
    if (this.value && passwordInput.value) {
        if (this.value === passwordInput.value) {
            this.style.borderColor = '#4ade80';
        } else {
            this.style.borderColor = '#ef4444';
        }
    } else {
        this.style.borderColor = '#3d6b5f';
    }
});
