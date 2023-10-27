fetch('./data.json')
  .then(response => response.json())
  .then(cars => {
    const featuredCarsContainer = document.getElementById('featured-cars');
    
    cars.forEach(car => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-lg-4');
      
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      
      const img = document.createElement('img');
      img.src = car.image;
      img.alt = '';
      img.classList.add('img-fluid');
      
      const nameP = document.createElement('p');
      nameP.classList.add('pt-3');
      const nameA = document.createElement('a');
      nameA.href = '#';
      nameA.textContent = car.name;
      nameP.appendChild(nameA);
      
      const costSpan = document.createElement('span');
      costSpan.id = 'cost';
      costSpan.textContent = '$' + car.cost.toLocaleString();
      
      const typeSpan = document.createElement('span');
      typeSpan.id = 'name';
      typeSpan.textContent = car.type;
      
      const small = document.createElement('small');
      const yearA = document.createElement('a');
      yearA.href = '#';
      yearA.textContent = car.year;
      const transA = document.createElement('a');
      transA.href = '#';
      transA.textContent = car.transmission;
      const hpA = document.createElement('a');
      hpA.href = '#';
      hpA.textContent = car.horsepower + 'hp';
      small.appendChild(yearA);
      small.appendChild(document.createTextNode(' | '));
      small.appendChild(transA);
      small.appendChild(document.createTextNode(' | '));
      small.appendChild(hpA);
      
      cardDiv.appendChild(img);
      cardDiv.appendChild(nameP);
      cardDiv.appendChild(costSpan);
      cardDiv.appendChild(typeSpan);
      cardDiv.appendChild(small);
      
      colDiv.appendChild(cardDiv);
      featuredCarsContainer.appendChild(colDiv);
    });
  })
  .catch(error => console.error(error));