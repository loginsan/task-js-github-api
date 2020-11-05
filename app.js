const searchField = document.querySelector(".search");
const hintsList = document.querySelector(".hints");
const resultsList = document.querySelector(".results");

async function getRepositories(request) {
    const qParam = 'loginsan'; //request.split(` `).join(`+`);
    const url = `https://api.github.com/search/repositories?q=${qParam}&per_page=5`;
    const response = await fetch(url);
    const obj = await response.json();
    return obj.items;
}

async function render(request = '') {
  const repositories = await getRepositories(request);
  repositories.forEach(repository => {
      console.log(repository);
  });
}

const requestGitHub = (q) => {
  const requestURL = `https://api.github.com/search/repositories?q=${q}&per_page=5`;
  console.log(requestURL);

  fetch(requestURL)
    .then(response => console.log(response))
    .catch(error => console.log(error));

};

requestGitHub("loginsan");
