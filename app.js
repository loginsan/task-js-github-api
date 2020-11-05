
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
  const APItoken = '2c7c5192fcc473d0275c5b75c60f4710bcc8696c';

  fetch(requestURL/*, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
        Origin: 'null'
      }
    }*/)
    .then(response => console.log(response))
    .catch(error => console.log(error));

  /*fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))*/
};

requestGitHub("loginsan");
//getRepositories("loginsan");
//render();
