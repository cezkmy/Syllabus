let currentFilter = 'all';
let allSyllabi = [];

document.addEventListener('DOMContentLoaded', function() {
    // Load syllabi
    loadSyllabi();

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterSyllabi();
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterSyllabi(searchTerm);
    });

    // Modal
    const modal = document.getElementById('detailsModal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

function loadSyllabi() {
    // Get uploaded syllabi from localStorage
    const uploads = JSON.parse(localStorage.getItem('syllabusUploads') || '[]');
    
    // Add mock data for demonstration
    allSyllabi = [
        ...uploads,
        {
            courseCode: 'CS 101',
            courseName: 'Introduction to Programming',
            semester: '1st',
            academicYear: '2024-2025',
            uploadDate: new Date(Date.now() - 86400000 * 2).toISOString(),
            status: 'approved',
            reviewedBy: 'Dr. Smith',
            reviewDate: new Date(Date.now() - 86400000).toISOString(),
            notes: 'Excellent syllabus, well structured'
        },
        {
            courseCode: 'CS 201',
            courseName: 'Data Structures',
            semester: '1st',
            academicYear: '2024-2025',
            uploadDate: new Date(Date.now() - 86400000 * 5).toISOString(),
            status: 'returned',
            reviewedBy: 'Dr. Johnson',
            reviewDate: new Date(Date.now() - 86400000 * 3).toISOString(),
            notes: 'Please add more learning outcomes',
            feedback: 'The syllabus needs to include detailed learning outcomes for each topic.'
        }
    ];

    filterSyllabi();
}

function filterSyllabi(searchTerm = '') {
    let filtered = allSyllabi;

    // Filter by status
    if (currentFilter !== 'all') {
        filtered = filtered.filter(s => s.status === currentFilter);
    }

    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(s => 
            s.courseCode.toLowerCase().includes(searchTerm) ||
            s.courseName.toLowerCase().includes(searchTerm)
        );
    }

    renderTable(filtered);
}

function renderTable(syllabi) {
    const tbody = document.getElementById('syllabiTableBody');

    if (syllabi.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-state-icon">📭</div>
                        <p>No syllabi found</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = syllabi.map((syllabus, index) => `
        <tr>
            <td><strong>${syllabus.courseCode}</strong></td>
            <td>${syllabus.courseName}</td>
            <td>${syllabus.semester} ${syllabus.academicYear}</td>
            <td>${new Date(syllabus.uploadDate).toLocaleDateString()}</td>
            <td><span class="status-badge ${syllabus.status}">${syllabus.status}</span></td>
            <td>
                ${syllabus.reviewedBy ? `
                    <div class="reviewer-info">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(syllabus.reviewedBy)}&background=5fa89a&color=fff" 
                             alt="${syllabus.reviewedBy}" 
                             class="reviewer-avatar">
                        <span class="reviewer-name">${syllabus.reviewedBy}</span>
                    </div>
                ` : '<span style="color: #a0aec0;">Not reviewed</span>'}
            </td>
            <td>
                <div class="actions">
                    <button class="action-btn view" onclick="viewDetails(${index})">View</button>
                    <button class="action-btn download" onclick="downloadSyllabus('${syllabus.courseCode}')">Download</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function viewDetails(index) {
    const syllabus = allSyllabi[index];
    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Course Code:</span>
            <span class="detail-value"><strong>${syllabus.courseCode}</strong></span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Course Name:</span>
            <span class="detail-value">${syllabus.courseName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Semester:</span>
            <span class="detail-value">${syllabus.semester} ${syllabus.academicYear}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Upload Date:</span>
            <span class="detail-value">${new Date(syllabus.uploadDate).toLocaleString()}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value"><span class="status-badge ${syllabus.status}">${syllabus.status}</span></span>
        </div>
        ${syllabus.reviewedBy ? `
            <div class="detail-row">
                <span class="detail-label">Reviewed By:</span>
                <span class="detail-value">${syllabus.reviewedBy}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Review Date:</span>
                <span class="detail-value">${new Date(syllabus.reviewDate).toLocaleString()}</span>
            </div>
        ` : ''}
        ${syllabus.notes ? `
            <div class="detail-row">
                <span class="detail-label">Notes:</span>
                <span class="detail-value">${syllabus.notes}</span>
            </div>
        ` : ''}
        ${syllabus.feedback ? `
            <div class="detail-row">
                <span class="detail-label">Feedback:</span>
                <span class="detail-value">${syllabus.feedback}</span>
            </div>
        ` : ''}
    `;

    modal.style.display = 'block';
}

function downloadSyllabus(courseCode) {
    alert(`Downloading syllabus for ${courseCode}...\n\n(In a real application, this would download the PDF file)`);
}
