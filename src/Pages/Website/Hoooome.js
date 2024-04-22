import './Home.css'
import Producthome from './product/Producthome';
import Landing from './landing/Landing';
import Latestsaleproducts from './product/Latestsaleproducts';
import Showtorated from './product/Showtoprated';
import Sepratesection from './product/Sepratesection';
import Showlatestproducts from './product/Showlatestproducts';
import { Container } from 'react-bootstrap';

function Hoooome() {
  return (
    <div style={{backgroundColor:'#35435e'}}>
        <Landing/>
        <Latestsaleproducts/>
        <Sepratesection/>
        <Container>
          <div className='d-flex align-items-start flex-wrap mt-3'>
            <Showtorated/>
            <Showlatestproducts/>
          </div>
        </Container>
    </div>
  )
}

export default Hoooome