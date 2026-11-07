document.addEventListener("DOMContentLoaded", () => {
  const username = "XSamuraiCoder";
  const listElement = document.getElementById("repo-list");
  const DESCRIPTIONS = {};

  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
      return response.json();
    })
    .then((repos) => {
      repos
        .filter((repo) => repo.name !== "xsamuraicoder.github.io")
        .forEach((repo) => {
          const card = document.createElement("div");
          card.className = "repo_element";

          const title = document.createElement("h6");
          title.className = "repo-title";
          title.textContent = repo.name;

          const desc = document.createElement("p");
          desc.className = "repo-desc";
          desc.textContent = repo.description ?? DESCRIPTIONS[repo.name] ?? "No Description Given.";

          const links = document.createElement("div");
          links.className = "repo-links";

          const repoLink = document.createElement("a");
          repoLink.textContent = "Open Repo";
          repoLink.href = repo.html_url;
          links.appendChild(repoLink);

          if (repo.has_pages) {
            const pageLink = document.createElement("a");
            pageLink.textContent = "Open Page";
            pageLink.href = `https://${username.toLowerCase()}.github.io/${repo.name}/`;
            links.appendChild(pageLink);
          }

          card.append(title, desc, links);
          listElement.appendChild(card);
        });
    })
    .catch((error) => {
      listElement.textContent = "Couldn't load projects right now. Try again later.";
      console.error(error);
    });
});