let selectedFile = null;

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadForm = document.getElementById('uploadForm');
    const filePreview = document.getElementById('filePreview');
    const removeBtn = document.getElementById('removeBtn');

    // Load recent uploads
    loadRecentUploads();

    // Browse button click
    browseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            handleFile(file);
        } else {
            alert('Please select a PDF file');
        }
    });

    // Drag and drop
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });

    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFile(file);
        } else {
            alert('Please drop a PDF file');
        }
    });

    // Remove file
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        selectedFile = null;
        filePreview.style.display = 'none';
        fileInput.value = '';
    });

    // Form submit
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedFile) {
            alert('Please select a PDF file to upload');
            return;
        }

        const formData = {
            file: selectedFile.name,
            fileSize: selectedFile.size,
            courseCode: document.getElementById('courseCode').value,
            courseName: document.getElementById('courseName').value,
            semester: document.getElementById('semester').value,
            academicYear: document.getElementById('academicYear').value,
            notes: document.getElementById('notes').value,
            uploadDate: new Date().toISOString(),
            status: 'pending'
        };

        // Get existing uploads
        let uploads = JSON.parse(localStorage.getItem('syllabusUploads') || '[]');
        uploads.unshift(formData);
        localStorage.setItem('syllabusUploads', JSON.stringify(uploads));

        alert('Syllabus uploaded successfully!');
        
        // Reset form
        uploadForm.reset();
        selectedFile = null;
        filePreview.style.display = 'none';
        fileInput.value = '';
        
        // Reload recent uploads
        loadRecentUploads();
    });
});

function handleFile(file) {
    selectedFile = file;
    
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    document.getElementById('filePreview').style.display = 'block';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function loadRecentUploads() {
    const uploads = JSON.parse(localStorage.getItem('syllabusUploads') || '[]');
    const uploadList = document.getElementById('uploadList');
    
    if (uploads.length === 0) {
        uploadList.innerHTML = '<p style="color: #a0aec0; text-align: center;">No recent uploads</p>';
        return;
    }
    
    uploadList.innerHTML = uploads.slice(0, 5).map(upload => `
        <div class="upload-item">
            <div class="upload-item-header">
                <span class="upload-item-title">${upload.courseCode}</span>
                <span class="status-badge ${upload.status}">${upload.status}</span>
            </div>
            <div class="upload-item-info">
                ${upload.courseName}<br>
                ${new Date(upload.uploadDate).toLocaleDateString()}
            </div>
        </div>
    `).join('');
}
