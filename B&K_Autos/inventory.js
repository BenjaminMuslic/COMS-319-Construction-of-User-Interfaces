const container = document.getElementById('container');

fetch("./inventory.json")
  .then(response => response.json())
  .then(data => {
    let rowHtml = ''; // create a variable to hold the row's HTML
    data.cars.forEach((car, index) => {
      const html = `
        <div class="col-lg-4 wow bounceIn" data-wow-delay="0.3s">
          <div class="card">
            <img src="${car.img}" alt="" class="img-fluid">
            <p class="pt-3"><a href="#">${car.name}</a></p>
            <span id="cost"> ${car.cost}</span>
            <span id="name">${car.type}</span>
            <small>
              <a href="#">${car.features[0]}</a>
              <a href="#">${car.features[1]}</a>
              <a href="#">${car.features[2]}</a>
            </small>
          </div>
        </div>
      `;
      if (index % 3 === 0) { // if it's the start of a new row
        rowHtml += '<div class="row">'; // add the row wrapper
      }
      rowHtml += html; // add the card's HTML to the row
      if ((index + 1) % 3 === 0 || index === data.cars.length - 1) { // if it's the end of a row or the end of the list
        rowHtml += '</div>'; // close the row wrapper
        container.innerHTML += rowHtml; // add the row to the container
        rowHtml = ''; // reset the row's HTML for the next row
      }
    });
  })
  .catch(error => console.error(error));
