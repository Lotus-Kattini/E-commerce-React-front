import { Button, Col, Container, Row } from 'react-bootstrap'

function Sepratesection() {
  return (
    <div className="bg-black my-4">
        <Container className="landing-page-content d-flex align-items-center justify-content-center mt-10 text-white">
          <div className="my-5 w-100 d-flex align-items-center justify-content-around gap-10">
            <div  >
              <h1>See all of out products!</h1>
              <Button variant="primary" href="/shop">Shop Now</Button>
            </div>
            <div >
              <img src={require('../../../Assets/pic2-removebg-preview.png')} alt="Product" style={{
                width:'15rem',
                
              }} className="img-fluid"/>
            </div>
          </div>
        </Container>
      </div>
  )
}

export default Sepratesection