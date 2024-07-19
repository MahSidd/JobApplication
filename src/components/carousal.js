import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Carousal1 from '../assests/car1.jpg';
import Carousal2 from '../assests/car2.jpg';
import Carousal3 from '../assests/car3.jpg';

const Carousalimg = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousal1}
          alt="First slide"
          style={{height:"600px"}}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousal2}
          alt="Second slide"
          style={{height:"600px"}}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Carousal3}
          alt="Third slide"
          style={{height:"600px"}}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousalimg;
