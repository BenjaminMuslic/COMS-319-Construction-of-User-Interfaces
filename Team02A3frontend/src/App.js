/*
Kareem Eljaam & Benjamin Muslic
Professor Aldaco
COMS/SE319
Spring 2023
*/

// Import necessary React-Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Import useState and useEffect hooks from React
import { useState, useEffect } from "react";

// Define the main App function component
function App() {

  // Declare state variables
  const [product, setProduct] = useState([]);  // Array of products
  const [viewer1, setViewer1] = useState(false);  // Boolean flag to display all products
  const [oneProduct, setOneProduct] = useState([]); // Array to store a single product
  const [viewer2, setViewer2] = useState(false); // Boolean flag to display one product
  const [viewer4, setViewer4] = useState(false); // Boolean flag to display one product at a time
  const [editedProduct, setEditedProduct] = useState({}); // Object to store updated product details
  const [checked4, setChecked4] = useState(false); // Boolean flag for checkbox to delete a product
  const [index, setIndex] = useState(0); // Index of the current product in the product array
  const [page, setPage] = useState('Products'); // State variable to control the current page

  // Declare an object for adding new products with default values
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });


  // Function to fetch all products from the backend
  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  // Call getAllProducts() when the component mounts
  useEffect(() => {
    getAllProducts();
  }, []);

  // Render all products
  const showAllItems = (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {product.map((el) => (
        <Card style={{ width: '18rem', margin: '10px', display: 'flex', flexDirection: 'column' }}>
          <Card.Img variant="top" src={el.image} style={{ width: '150px', height: '150px', margin: '0 auto', justifyContent: 'center', alignItems: 'center' }} />
          <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Text>
              <div key={el._id}>
                <div style={{ textAlign: 'center' }}>
                  Title: {el.title}
                </div>
                <br />
                Category: {el.category}
                <br />
                Price: {el.price}
              
                <br />
                Rate :{el.rating.rate} and Count:{el.rating.count}
                <br />
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  // Function to handle and update products
  function handleUpdateProduct(e) {
    e.preventDefault(); // Prevent the default behavior of form submission

    // Send a PUT request to update the product with the given id
    fetch("http://localhost:4000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  // Function to get one product by id
  function getOneProduct(id) {

    // Get a single product by id
    console.log(id);

    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  // Render a single product's information in a card
  const showOneItem = oneProduct.map((el) => (
    <div className="text-center">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text>
            <div key={el._id}>
              <Card.Img variant="top" src={el.image} style={{ width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
              Title: {el.title} <br />
              Category: {el.category} <br />
              Price: {el.price} <br />
              Rate :{el.rating.rate} and Count:{el.rating.count} <br />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  // Add custom CSS styles to the page
  const style = document.createElement('style');
  style.innerHTML = `
  h1, h2, h3 {
    text-align: center;
    background-color: #333;
    color: #fff;
    padding: 10px;
    margin: 0;
  }
`;
  document.head.appendChild(style);


  // Handle changes in the form input fields
  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  // Submit the form to add a new product
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  // Show the next product in the array
  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  // Show the previous product in the array
  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  // Delete a product with the given id
  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  // Call getAllProducts when the component mounts or when checked4 state changes
  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  return (
    <>
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">B&K Auto Products</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => setPage('Products')}>Products</Nav.Link>
            <Nav.Link onClick={() => setPage('Modify Inventory')}>Modify Inventory</Nav.Link>
            <Nav.Link onClick={() => setPage('Contact Us')}>Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Products page */}
      {page === 'Products' && (
        <div>
          <h1>B&K Auto Products</h1>

          <div className="text-center">

            <Button variant="secondary" onClick={() => getAllProducts()}>Show All Parts</Button>
          </div>
          <div className="text-center">
            <Col>
              <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
            </Col>
            <br />
            {viewer2 && <div className="text-center"> <h4>Product:</h4> <br /> {showOneItem}</div>}
          </div>
          {viewer1 && <div className="text-center"> <h4>Products</h4> {showAllItems}</div>}
        </div>
      )}

      {/* Modify Inventory page */}
      {page === 'Modify Inventory' && (
        <div className="text-center">
          <h4>Update Part's Price:</h4>
          <form key={editedProduct._id} onSubmit={handleUpdateProduct}>
            <input type="text" name="_id" placeholder="ID" value={editedProduct._id || ''} onChange={(e) => setEditedProduct({ ...editedProduct, _id: e.target.value })} style={{ width: '10%', height: '30px' }} />
            <input type="number" name="price" placeholder="Price" value={editedProduct.price || ''} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} style={{ width: '10%', height: '30px' }} />
            <Button variant="primary" type="submit" onClick={handleUpdateProduct}>Update Price</Button>
          </form>
          <div>
            <h3>Add a new part :</h3>
            <br />
            <form action="">
              <div className="text-center">
                <Row>
                  <Col>
                    <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
                  </Col>
                  <Col>
                    <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
                  </Col>
                  <Col>
                    <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
                  </Col>
                  <Col>
                    <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
                  </Col>
                  <Col>
                    <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
                  </Col>
                  <Col>
                    <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
                  </Col>
                  <Col>
                    <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
                  </Col>
                </Row>
                <br />
                <Button variant="primary" type="submit" onClick={handleOnSubmit}>submit</Button>
              </div>
            </form>
          </div>
          <hr></hr>
          <div className="text-center">
            <h3>Delete one part:</h3>
            <br />
            <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
              onChange={(e) => setChecked4(!checked4)} />

            <ButtonGroup aria-label="Basic example">
              <Button variant="outline-primary" onClick={() => getOneByOneProductPrev()}>Previous</Button>
              <Button variant="outline-primary" onClick={() => getOneByOneProductNext()}>Next</Button>
              <Button variant="outline-danger" onClick={() => deleteOneProduct(product[index]._id)}>Delete</Button>
            </ButtonGroup>
            <br />

            <br />

            {checked4 && (
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Text>
                    <div key={product[index]._id}>
                      <Card.Img variant="top" src={product[index].image} style={{ width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                      Id:{product[index]._id} <br />
                      Title: {product[index].title} <br />
                      Category: {product[index].category} <br />
                      Price: {product[index].price} <br />
                      Rate :{product[index].rating.rate} and Count:
                      {product[index].rating.count} <br />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>

            )}
          </div>
        </div>
      )}

      {/* Contact Us page */}
      {page === 'Contact Us' && (
        <>
          <div className="text-center">
            <h3>Contact Us</h3>
            <CardGroup>
              <Card style={{ width: '18rem', margin: '10px', display: 'flex', flexDirection: 'column' }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      Kareem Eljaam
                    </div>
                    <br />
                    Email: kbeljaam@iastate.edu
                    <br />
                    Course: ComS/SE 319
                    <br />
                    Professor: Dr. Aldaco
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem', margin: '10px', display: 'flex', flexDirection: 'column' }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      Benjamin Muslic
                    </div>
                    <br />
                    Email: muslicb@iastate.edu
                    <br />
                    Course: ComS/SE 319
                    <br />
                    Professor: Dr.Aldaco
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </div><br /><br /></>
      )}
    </>
  );

} // App end


export default App;

