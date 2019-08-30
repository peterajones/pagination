// https://www.thatsoftwaredude.com/content/6125/how-to-paginate-through-a-collection-in-javascript
const url = 'https://jsonplaceholder.typicode.com/users';

var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 2;
var numberOfPages = 0;

function makeList() {
  // console.warn('FETCHING DATA...');
  async function fetchUsers(endpoint) {
    const res = await fetch(endpoint);
    let data = await res.json();

    data = data.map((user) => user);
    for (x = 0; x < data.length; x++) list.push(data[x]);
    loadList();
  }
  fetchUsers(url);
}

function getNumberOfPages() {
  // console.warn('GET NUMBER OF PAGES...');
  return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
  currentPage += 1;
  loadList();
}

function previousPage() {
  currentPage -= 1;
  loadList();
}

function firstPage() {
  currentPage = 1;
  loadList();
}

function lastPage() {
  currentPage = numberOfPages;
  loadList();
}

function loadList() {
  // console.warn('LOAD LIST');
  // console.log(`current page: ${currentPage}`);
  var begin = (currentPage - 1) * numberPerPage;
  // console.log(`begin: ${begin}`);
  var end = begin + numberPerPage;
  // console.log(`end: ${end}`);

  numberOfPages = getNumberOfPages();
  // console.log(`number of pages: ${numberOfPages}`);

  pageList = list.slice(begin, end);
  drawList();
  createMaps();
  check();
}

function drawList() {
  // console.warn('DRAW LIST');
  // console.log(`page list length: ${pageList.length}`);
  document.getElementById('currentPage').innerText = currentPage;
  document.getElementById('numberOfPages').innerText = numberOfPages;
  document.getElementById('list').innerHTML = '';
  for (var r = 0; r < pageList.length; r++) {
    document.getElementById('list').innerHTML += `<li class="card">
    <div class="info">
      <p>Name: ${pageList[r].name}</p>
      <p>Email: <a href="mailto:${pageList[r].email}">${pageList[r].email}</a></p>
      <p>Address:</p>
      <div class="address">
        <p>${pageList[r].address.street}</p>
        <p>${pageList[r].address.suite}</p>
        <p>${pageList[r].address.city}</p>
        <p>${pageList[r].address.zipcode}</p>
      </div>
      <p>Phone: ${pageList[r].phone}</p>
      <p>Website: <a href="${pageList[r].website}" target="_new">${pageList[r].website}</a></p>
    </div>
    <div id="map${pageList[r].id}" class="map"></div>
    </li>`;
  }
}

function createMaps() {
  for (var m = 0; m < pageList.length; m++) {
    // var latLng = `latLng$pageList[m].id`;
    var latLng = { lat: parseFloat(pageList[m].address.geo.lat), lng: parseFloat(pageList[m].address.geo.lng) };
    var map = new google.maps.Map(document.getElementById(`map${pageList[m].id}`), { zoom: 2, center: latLng });
    var marker = new google.maps.Marker({ position: latLng, map: map });
  }
}

function check() {
  // console.log('BUTTON CHECK');
  document.getElementById('next').disabled = currentPage == numberOfPages ? true : false;
  document.getElementById('previous').disabled = currentPage == 1 ? true : false;
  document.getElementById('first').disabled = currentPage == 1 ? true : false;
  document.getElementById('last').disabled = currentPage == numberOfPages ? true : false;
}

function load() {
  // console.error('LOAD makeList()...');
  makeList();
  // console.error('LOAD loadList()...');
  loadList();
}

load();
