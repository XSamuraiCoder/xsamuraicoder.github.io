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

      repos.forEach(repo => {
        const listItem = document.createElement('div');
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.textContent = repo.name;
        link.target = '_blank';
        listItem.className = "repo_element"
        listItem.appendChild(link);
        listElement.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching repos:', error));
});
