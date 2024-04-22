import {Button, Container, Row, Col } from 'react-bootstrap';


function Landing() {
  return (
    <div className="landing-page-background">
        <Container className="landing-page-content d-flex align-items-center justify-content-center mt-10 text-white">
          <Row className="mt-5 w-100 ">
            <Col md={6} style={{paddingTop:'10rem'}}>
              <h1>Welcome to Our E-Commerce Store</h1>
              <p>Find the best deals on your favorite products!</p>
              <Button variant="primary" href="/shop">Shop Now</Button>
            </Col>
            <Col md={6}>
              <img src={require('../../../Assets/pic2-removebg-preview.png')} alt="Product" className="img-fluid custom-img"/>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default Landing