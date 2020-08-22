// Getting Elements
const searchForm = document.getElementById('searchForm');
const container = document.getElementById('output');
const serchInp = document.getElementById('search')

// Loading HTML
const loadingHTML = `<div class="text-center"><div class="spinner-border" style="width:4rem; height:4rem;" role="status"><span class="sr-only">Loading...</span?</div></div>`;
// Alert HTML
const alertHTML = `<div class="alert alert-danger" role="alert"><strong>404 Not found! Please check your zip code.</strong></div>`;
// alertHTML2
const alertHTML2 = `<div class="alert alert-danger" role="alert"><strong>Zip code must be a number of 6-digit.</strong></div>`;


// Listening for form submission
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  container.innerHTML = loadingHTML;
  serchInp.blur();
  // Get input Value
  let searchText = serchInp.value;
  let regEx = /^([0-9]){6}$/;
  if (!regEx.test(searchText)) {
    container.innerHTML = alertHTML2;
    return false;
  }
  axios.get(`https://api.zippopotam.us/IN/${searchText}`).then(res=> {
    console.log(res)
    if (res.status != 200) {
      return false;
    }
    let HTML = genHTML(res.data);
    container.innerHTML = HTML;
  }).catch(err=> {
    container.innerHTML = alertHTML;
    console.error(err);
  });
});





function genHTML(data) {
  let html =
  `
  <div class="card">
  <div class="card-body">
  <h5 class="card-title">${data.places[0]['place name']} , ${data.places[0].state} (${data.places[0]['state abbreviation']})</h5>
  <div class="table-responsive">
  <table class="table table-bordered">
  <thead>
  <tr>
  <th scope="col">Key</th>
  <th scope="col">Value</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td scope="row">Country</td>
  <td>${data.country} (${data['country abbreviation']})</td>
  </tr>
  <tr>
  <td scope="row">State</td>
  <td>${data.places[0].state} (${data.places[0]['state abbreviation']})</td>
  </tr>
  <tr>
  <td scope="row">City/village</td>
  <td>${data.places[0]['place name']}</td>
  </tr>
  <tr>
  <td scope="row">Postal code</td>
  <td>${data['post code']}</td>
  </tr>
  <tr>
  <td scope="row">Longitude</td>
  <td>${data.places[0].longitude}</td>
  </tr>
  <tr>
  <td scope="row">Latitude</td>
  <td>${data.places[0].latitude}</td>
  </tr>
  <tr>
  <td scope="row">Google map</td>
  <td><a class='btn btn-primary' href='https://www.google.co.in/maps/search/${data['post code']}' target='_blank'>Go</a></td>
  </tr>
  </tbody>
  </table>
  </div>
  </div>
  </div>
  `;

  return  html;
}
