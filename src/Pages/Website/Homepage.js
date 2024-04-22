import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import svg from '../../Assets/undraw_web_shopping_re_owap.svg'
import './../../App.css'
import animation from '../../Assets/Animation - 1702459143857.json'
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom'

function Homepage() {

  const nav=useNavigate();
  
  return (
    <div style={{position:'relative'}}>
      {/* <h1>HOME PAGE</h1>       */}
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">LK store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
          <Nav>
            <Nav.Link href="/register">Sign UP</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div style={{background:'#0000'}}>
    <Lottie animationData={animation} className='animation'/>
    </div>
    <div className='container custom-content' >
    <div className='d-flex align-items-center justify-content-evenly container custom-flex' style={{marginTop:'8rem'}}>
      <div >
      <h1 style={{color:'#fff'}}>Welcom to Our Store..!</h1>
      <p style={{width:'15rem',color:'#fff'}}>to view all of uor products and serveces please sign up if you dont have an account.</p>
      <Button variant='primary' onClick={()=>nav('/register')} style={{cursor:'pointer'}}>View Products</Button>
      </div>
      <div>
        <img className='Himg' src={svg} alt='' />
      </div>
    </div>
    </div>
    </div>

  )
}

export default Homepage