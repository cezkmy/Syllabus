document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    
    // Load user data
    if (loggedInUser) {
        document.getElementById('fullName').value = loggedInUser.name || '';
        document.getElementById('email').value = loggedInUser.email || '';
    }

    // Profile form
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedUser = {
            ...loggedInUser,
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            department: document.getElementById('department').value,
            phone: document.getElementById('phone').value
        };
        
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        
        alert('Profile updated successfully!');
        
        // Update header
        document.getElementById('userName').textContent = updatedUser.name;
        const avatar = document.querySelector('.avatar');
        if (avatar) {
            avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(updatedUser.name)}&background=5fa89a&color=fff`;
        }
    });

    // Password form
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        // In a real app, this would call an API
        alert('Password updated successfully!');
        this.reset();
    });

    // Preferences
    document.getElementById('savePreferences').addEventListener('click', function() {
        const preferences = {
            language: document.getElementById('language').value,
            timezone: document.getElementById('timezone').value,
            dateFormat: document.getElementById('dateFormat').value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved successfully!');
    });

    // Load preferences
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    if (savedPreferences.language) {
        document.getElementById('language').value = savedPreferences.language;
    }
    if (savedPreferences.timezone) {
        document.getElementById('timezone').value = savedPreferences.timezone;
    }
    if (savedPreferences.dateFormat) {
        document.getElementById('dateFormat').value = savedPreferences.dateFormat;
    }

    // Toggle switches
    document.querySelectorAll('.toggle input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.parentElement.parentElement.querySelector('h4').textContent;
            console.log(`${setting}: ${this.checked ? 'Enabled' : 'Disabled'}`);
            // In a real app, this would save to backend
        });
    });
});
