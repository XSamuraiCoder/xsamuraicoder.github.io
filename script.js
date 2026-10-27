document.addEventListener('DOMContentLoaded', () => {
    const username = 'XSamuraiCoder';
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;

    fetch(url)
        .then(response => response.json())
        .then(repos => {
            const listElement = document.getElementById('repo-list');

            // Safety check: ensure the element actually exists
            if (!listElement) {
                console.error("Element #repo-list not found in the DOM.");
                return;
            }

            DESCRIPTIONS = {}
            
            repos.forEach(repo => {
                const repo_div = document.createElement('div');
                const repo_title = document.createElement('h6');
                const repo_desc = document.createElement("p");

                repo_title.href = repo.html_url;
                repo_title.textContent = repo.name;
                repo_title.target = '_blank';
                repo_div.className = "repo_element"

                repo_title.id = "repo-title"
                
                repo_desc.id = "repo-desc"
                if (repo.description != null) {
                    repo_desc.textContent = repo.description
                } else if (DESCRIPTIONS[repo.name] != null) {
                    repo_desc.textContent = DESCRIPTIONS[repo.name]
                } else {
                    repo_desc.textContent = "No Description Given."
                }

                repo_div.appendChild(repo_title);
                repo_div.appendChild(repo_desc);
                listElement.appendChild(repo_div);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});
