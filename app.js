const searchField = document.querySelector('.search');
const sForm = document.querySelector('.search-form');
const hintsList = document.querySelector('.hints');
const resultsList = document.querySelector('.results');

const requestData = (q) => {
  const requestURL = `https://api.github.com/search/repositories?q=${q.replaceAll(/[\s]+/g, '+')}&per_page=5`;
  console.log(requestURL);

  fetch(requestURL)
    .then( response => response.json() )
    .then( data => { renderData(data.items) } )
    .catch( error => console.log(error) );

};

function debounce(fn, delay) {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => fn.apply(context, args), delay);
  };
};

const debRequest = debounce(requestData, 300);

const renderData = (items) => {
  const struct = {hints: [], results: []};
  items.forEach(item => {
    let [hint, result] = parseItem(item);
    struct.hints.push(hint);
    struct.results.push(result);
  });
  // prepare hints
  renderHints(struct.hints);
  // prepare results
  renderResults(struct.results);
};

const renderHints = (hints) => {
  clearList(hintsList);

  let fragment = new DocumentFragment();
  for(let h of hints) {
    let li = document.createElement('li');
    li.classList.add('hints__item')
    li.append(h);
    fragment.append(li);
  }
  hintsList.append(fragment);
};

const renderResults = (results) => {
 clearList(resultsList);
  
  let fragment = new DocumentFragment();
  for(let r of results) {
    let li = document.createElement('li');
    li.classList.add('results__item');
    li.insertAdjacentHTML('afterbegin', `<ul><li><a href="${r.html_url}"><span>Name:</span> ${r.name}</a></li><li><span>Owner:</span> ${r.owner}</li><li><span>Stars:</span> ${r.stars}</li></ul>`);
    li.insertAdjacentHTML('beforeend', `<button type="button" class="x" tabindex="1" />`);
    fragment.append(li);
  }
  resultsList.append(fragment);
};

const parseItem = (item) => {
  let {full_name, html_url, stargazers_count: stars} = item;
  let [owner, name] = full_name.split('/');
  return [name, {name, owner, html_url, stars}];
};

searchField.addEventListener('input', function() {
  if (this.value === '') {
    clearList(hintsList);
    clearList(resultsList);
  } else {
    debRequest(this.value);
  }
});

searchField.addEventListener('change', function() {
  //console.log('change', this.value);
  //debRequest(this.value);
});

searchField.addEventListener('keyup', function(evt) {
  if (evt.keyCode === '13') {
    //console.log('key ENTER');
  }
});

sForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  //console.log('submit');
});

resultsList.addEventListener('click', function(evt) {
  let hit = evt.target;
  if (hit.tagName === 'BUTTON') {
    const resultsItem = hit.closest('.results__item');
    //resultsItem.classList.add('hidden');
    resultsItem.closest('.results').removeChild(resultsItem);
  }
});

hintsList.addEventListener('click', function(evt) {
  let hit = evt.target;
  if (hit.tagName === 'LI') {
    searchField.value = hit.textContent;
    debRequest(searchField.value);
  }
});

const clearList = (list) => {
  while (list.firstChild) list.removeChild(list.firstChild);
}
