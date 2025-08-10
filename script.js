// script.js - AI Resume Analyzer Logic

// Global variables
let uploadedFile = null;
let resumeText = '';

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const optionsSection = document.getElementById('optionsSection');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const analyzeBtn = document.getElementById('analyzeBtn');
const newAnalysisBtn = document.getElementById('newAnalysisBtn');
const jobTitleInput = document.getElementById('jobTitle');

// Sample resume keywords database
const keywordDatabase = {
    'software developer': ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'API', 'Database', 'Agile', 'Frontend', 'Backend'],
    'marketing manager': ['SEO', 'SEM', 'Analytics', 'Campaign', 'Social Media', 'Content Marketing', 'Brand Management', 'Lead Generation'],
    'data scientist': ['Python', 'R', 'Machine Learning', 'Statistics', 'SQL', 'Pandas', 'NumPy', 'Visualization', 'Big Data'],
    'project manager': ['Agile', 'Scrum', 'Risk Management', 'Budget', 'Timeline', 'Stakeholder', 'Leadership', 'Communication'],
    'general': ['Leadership', 'Communication', 'Problem Solving', 'Team Work', 'Project Management', 'Analysis', 'Strategic Thinking']
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleFileDrop);
    
    // Analyze button click
    analyzeBtn.addEventListener('click', analyzeResume);
    
    // New analysis button click
    newAnalysisBtn.addEventListener('click', resetAnalyzer);
}

// File handling functions
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleFileDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    if (file) {
        processFile(file);
    }
}

function processFile(file) {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, DOCX, or TXT file.');
        return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
    }
    
    uploadedFile = file;
    
    // Update UI to show file is uploaded
    updateUploadUI(file.name);
    
    // Show options section
    optionsSection.style.display = 'block';
    
    // Extract text from file (simplified simulation)
    extractTextFromFile(file);
}

function updateUploadUI(fileName) {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <i class="fas fa-check-circle upload-icon" style="color: #4CAF50;"></i>
        <h3>File Uploaded Successfully</h3>
        <p>${fileName}</p>
        <button class="upload-btn" onclick="document.getElementById('fileInput').click()">
            <i class="fas fa-folder-open"></i> Choose Different File
        </button>
    `;
}

function extractTextFromFile(file) {
    // In a real implementation, you would use libraries like PDF.js for PDFs
    // or mammoth.js for Word documents. For this demo, we'll simulate with sample text.
    const reader = new FileReader();
    
    reader.onload = function(event) {
        // Simulate text extraction (in reality, this would depend on file type)
        resumeText = simulateTextExtraction(file.name);
    };
    
    if (file.type === 'text/plain') {
        reader.readAsText(file);
    } else {
        // For demo purposes, simulate reading other file types
        resumeText = simulateTextExtraction(file.name);
    }
}

function simulateTextExtraction(fileName) {
    // Simulate extracted resume text for demonstration
    return `
        John Doe
        Software Developer
        Email: john.doe@email.com
        Phone: (555) 123-4567
        
        EXPERIENCE
        Senior Software Developer - Tech Corp (2020-2023)
        • Developed web applications using JavaScript, React, and Node.js
        • Collaborated with cross-functional teams using Agile methodology
        • Improved application performance by 40% through code optimization
        • Mentored junior developers and conducted code reviews
        
        Software Developer - StartupXYZ (2018-2020)
        • Built RESTful APIs using Python and Django framework
        • Implemented automated testing procedures reducing bugs by 30%
        • Worked with databases including PostgreSQL and MongoDB
        • Participated in daily standups and sprint planning
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology (2014-2018)
        
        SKILLS
        Programming Languages: JavaScript, Python, Java, HTML, CSS
        Frameworks: React, Node.js, Django, Express.js
        Tools: Git, Docker, AWS, Jenkins
        Databases: PostgreSQL, MongoDB, MySQL
        
        PROJECTS
        E-commerce Platform
        • Developed full-stack web application with payment integration
        • Used React for frontend and Node.js for backend
        • Deployed on AWS with automated CI/CD pipeline
    `;
}

// Analysis functions
function analyzeResume() {
    if (!uploadedFile) {
        alert('Please upload a resume first.');
        return;
    }
    
    // Show loading section
    optionsSection.style.display = 'none';
    loadingSection.style.display = 'block';
    
    // Simulate analysis delay
    setTimeout(() => {
        performAnalysis();
        showResults();
    }, 3000);
}

function performAnalysis() {
    const jobTitle = jobTitleInput.value.toLowerCase() || 'general';
    
    // Get relevant keywords for the job title
    const relevantKeywords = getRelevantKeywords(jobTitle);
    
    // Analyze resume
    const analysis = {
        overallScore: calculateOverallScore(),
        formatScore: Math.floor(Math.random() * 30) + 70, // 70-100
        contentScore: Math.floor(Math.random() * 25) + 75, // 75-100
        keywordsScore: calculateKeywordScore(relevantKeywords),
        atsScore: Math.floor(Math.random() * 20) + 80, // 80-100
        strengths: generateStrengths(),
        improvements: generateImprovements(),
        foundKeywords: findKeywordsInResume(relevantKeywords),
        missingKeywords: findMissingKeywords(relevantKeywords),
        recommendations: generateRecommendations()
    };
    
    // Store analysis for display
    window.currentAnalysis = analysis;
}

function calculateOverallScore() {
    // Simulate overall score calculation
    return Math.floor(Math.random() * 25) + 75; // 75-100
}

function calculateKeywordScore(relevantKeywords) {
    const foundKeywords = findKeywordsInResume(relevantKeywords);
    const score = (foundKeywords.length / relevantKeywords.length) * 100;
    return Math.floor(score);
}

function getRelevantKeywords(jobTitle) {
    // Find matching keywords or use general keywords
    for (const [key, keywords] of Object.entries(keywordDatabase)) {
        if (jobTitle.includes(key)) {
            return keywords;
        }
    }
    return keywordDatabase['general'];
}

function findKeywordsInResume(relevantKeywords) {
    const foundKeywords = [];
    const resumeTextLower = resumeText.toLowerCase();
    
    relevantKeywords.forEach(keyword => {
        if (resumeTextLower.includes(keyword.toLowerCase())) {
            foundKeywords.push(keyword);
        }
    });
    
    return foundKeywords;
}

function findMissingKeywords(relevantKeywords) {
    const foundKeywords = findKeywordsInResume(relevantKeywords);
    return relevantKeywords.filter(keyword => !foundKeywords.includes(keyword));
}

function generateStrengths() {
    const strengths = [
        'Strong technical skills mentioned with specific technologies',
        'Quantified achievements with measurable results',
        'Progressive career growth demonstrated',
        'Relevant work experience in the field',
        'Educational background aligns with career path',
        'Project experience shows practical application of skills',
        'Leadership and mentoring experience highlighted',
        'Collaborative work experience mentioned'
    ];
    
    // Return 4-6 random strengths
    const shuffled = strengths.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 4);
}

function generateImprovements() {
    const improvements = [
        'Add more quantified achievements and metrics',
        'Include relevant certifications or training',
        'Expand on soft skills and leadership experience',
        'Add links to portfolio or GitHub projects',
        'Include volunteer work or community involvement',
        'Optimize keywords for Applicant Tracking Systems (ATS)',
        'Consider adding a professional summary section',
        'Include relevant conference attendance or speaking engagements',
        'Add testimonials or recommendations if possible',
        'Ensure consistent formatting throughout the document'
    ];
    
    // Return 3-5 random improvements
    const shuffled = improvements.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
}

function generateRecommendations() {
    return [
        {
            title: 'Optimize for ATS',
            description: 'Use standard section headings and include relevant keywords naturally throughout your resume to improve ATS compatibility.'
        },
        {
            title: 'Quantify Your Impact',
            description: 'Add more specific metrics and numbers to demonstrate your achievements. For example, "increased sales by 25%" instead of "increased sales".'
        },
        {
            title: 'Tailor for Target Role',
            description: 'Customize your resume for each application by highlighting the most relevant skills and experience for the specific position.'
        },
        {
            title: 'Professional Summary',
            description: 'Consider adding a brief professional summary at the top that highlights your key strengths and career objectives.'
        },
        {
            title: 'Skills Section Enhancement',
            description: 'Organize your skills into categories (Technical, Soft Skills, Languages) and include proficiency levels where relevant.'
        }
    ];
}

function showResults() {
    const analysis = window.currentAnalysis;
    
    // Hide loading section
    loadingSection.style.display = 'none';
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Animate score
    animateScore(analysis.overallScore);
    
    // Update score bars
    updateScoreBar('formatScore', analysis.formatScore);
    updateScoreBar('contentScore', analysis.contentScore);
    updateScoreBar('keywordsScore', analysis.keywordsScore);
    updateScoreBar('atsScore', analysis.atsScore);
    
    // Populate strengths
    populateList('strengthsList', analysis.strengths);
    
    // Populate improvements
    populateList('improvementsList', analysis.improvements);
    
    // Populate keywords
    populateKeywords('foundKeywords', analysis.foundKeywords, 'keyword-tag');
    populateKeywords('missingKeywords', analysis.missingKeywords, 'missing-keyword-tag');
    
    // Populate recommendations
    populateRecommendations('recommendationsList', analysis.recommendations);
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function animateScore(targetScore) {
    const scoreElement = document.getElementById('scoreValue');
    let currentScore = 0;
    const increment = targetScore / 50; // Animation duration
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, 30);
}

function updateScoreBar(elementId, score) {
    const scoreBar = document.getElementById(elementId);
    setTimeout(() => {
        scoreBar.style.width = score + '%';
    }, 500);
}

function populateList(elementId, items) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

function populateKeywords(elementId, keywords, className) {
    const container = document.getElementById(elementId);
    container.innerHTML = keywords.map(keyword => 
        `<span class="${className}">${keyword}</span>`
    ).join('');
}

function populateRecommendations(elementId, recommendations) {
    const container = document.getElementById(elementId);
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <h5>${rec.title}</h5>
            <p>${rec.description}</p>
        </div>
    `).join('');
}

function resetAnalyzer() {
    // Reset all variables
    uploadedFile = null;
    resumeText = '';
    window.currentAnalysis = null;
    
    // Reset form
    fileInput.value = '';
    jobTitleInput.value = '';
    
    // Reset upload area
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <i class="fas fa-cloud-upload-alt upload-icon"></i>
        <h3>Upload Your Resume</h3>
        <p>Drag and drop your resume here or click to browse</p>
        <input type="file" id="fileInput" accept=".pdf,.doc,.docx,.txt" hidden>
        <button class="upload-btn" onclick="document.getElementById('fileInput').click()">
            <i class="fas fa-folder-open"></i> Browse Files
        </button>
    `;
    
    // Hide sections
    optionsSection.style.display = 'none';
    loadingSection.style.display = 'none';
    resultsSection.style.display = 'none';
    
    // Re-initialize file input listener
    const newFileInput = document.getElementById('fileInput');
    newFileInput.addEventListener('change', handleFileSelect);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Additional utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Adjust layout if needed
    if (window.innerWidth <= 768) {
        // Mobile adjustments
        const analysisGrid = document.querySelector('.analysis-grid');
        if (analysisGrid) {
            analysisGrid.style.gridTemplateColumns = '1fr';
        }
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading states and error handling
function showError(message) {
    alert(message); // In production, use a more elegant error display
}

// Export functions for potential external use
window.ResumeAnalyzer = {
    analyzeResume,
    resetAnalyzer,
    processFile
};