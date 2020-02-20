
import React, { Component, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Tesseract from 'tesseract.js';


class CarouselDetails extends Component {
  state = {
    isProcessing: false,
    processStatus: {},
    tesseractText: ''
  }
  componentDidMount() {
    console.log(Tesseract);
  }

  onScanNow = (url) => {
    this.setState ({ isProcessing: true, tesseractText: '', processStatus: {} });
    Tesseract.recognize(url, 'eng', { 
        logger: m => {
          console.log(m);
          this.setState({ processStatus: m })
        } 
    }).then(({ data: { text } }) => {
      this.setState ({ isProcessing: false, tesseractText: text });
      console.log(text);
    })
  }

  render() {
    const { isProcessing, tesseractText, processStatus } = this.state;
    const { itemDetails } = this.props;
    const { features } = itemDetails;
    return (
      <Fragment>
        <Card className="card-details">
        <Card.Img variant="top" src={itemDetails.url} />
        <Card.Body>
            <Card.Title>{itemDetails.title} ({itemDetails.quantity})</Card.Title>
            <Card.Text>{itemDetails.description}</Card.Text>
            <div>
                <ul>
                    {features && features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className="btn-wrp">
                <Button onClick={()=>{this.onScanNow(itemDetails.url)}}>Scan Now</Button>
            </div>
            <Card.Title className="scanned-text">
              {isProcessing && <span className="status">{processStatus.status}...</span>}
              {(!isProcessing && tesseractText) && <span className="tesseract-text">{tesseractText}</span>}
            </Card.Title>
        </Card.Body>
        </Card>      
    </Fragment>
    );
  }
}
export default CarouselDetails;
