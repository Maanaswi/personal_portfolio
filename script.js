// Select elements
const addProjectButton = document.getElementById('add-project-btn');
const projectTitleInput = document.getElementById('project-title');
const projectDescriptionInput = document.getElementById('project-description');
const projectLinkInput = document.getElementById('project-link');
const projectsList = document.getElementById('projects-list');

// Load projects from localStorage
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    return projects;
}

// Save projects to localStorage
function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Display projects in the DOM
function displayProjects() {
    const projects = loadProjects();
    projectsList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <div>
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            </div>
            <button class="delete-btn" data-index="${index}">❌</button>
        `;

        projectsList.appendChild(projectCard);
    });

    // Add delete functionality to buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = button.getAttribute('data-index');
            deleteProject(index);
        });
    });
}

// Add new project
addProjectButton.addEventListener('click', () => {
    const title = projectTitleInput.value;
    const description = projectDescriptionInput.value;
    const link = projectLinkInput.value;

    if (title && description && link) {
        const projects = loadProjects();
        projects.push({ title, description, link });
        saveProjects(projects);

        // Clear the form
        projectTitleInput.value = '';
        projectDescriptionInput.value = '';
        projectLinkInput.value = '';

        displayProjects();
    } else {
        alert('Please fill in all fields.');
    }
});

// Delete project
function deleteProject(index) {
    const projects = loadProjects();
    projects.splice(index, 1);
    saveProjects(projects);
    displayProjects();
}

// Initial display
displayProjects();
