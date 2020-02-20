
import React, { Component, Fragment } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselDetails from '../components/CarouselDetails';
import { getCarouselItems, getCarouselItemDetails } from '../services/api';

class CarouselComponent extends Component {
  state = {
    index: 1,
    direction: 'left',
    carouseItems: [],
    itemDetails: {},
    isLoading: false,
    isDetailsLoaded: false
  };

  componentDidMount() {
    this.initCarouselItems();
  }

  componentWillUnmount() {
  }

  initCarouselItems = () => {
    this.setState({ isLoading: true });
    getCarouselItems().then(response => {
        this.setState({ carouseItems: response.data, isLoading: false });
    }).catch(error => {
      console.log(error);
    });
  }

  caroselItemClick = (id) => {
    this.setState({ isDetailsLoaded: false });
    getCarouselItemDetails(id).then(response => {
      this.setState({ itemDetails: response.data, isDetailsLoaded: true });
    }).catch(error => {
      console.log(error);
    });
}

  render() {
    const { carouseItems, isLoading, itemDetails, isDetailsLoaded } = this.state;

    return (
      <Fragment>
        <Carousel>
          {
            isLoading && 
            <div className="loading">Loading...</div>
          }
          {carouseItems.map((carousel, index) => (
          <Carousel.Item key={index} onClick={()=>{this.caroselItemClick(carousel.id)}}>
            <img
              className="d-block w-100"
              src={carousel.url}
              alt={carousel.title}
            />
          </Carousel.Item>            
          ))}
        </Carousel>
        {
          isDetailsLoaded && 
          <CarouselDetails itemDetails={itemDetails}></CarouselDetails>
        }
      </Fragment>
    );
  }
}


export default CarouselComponent;
