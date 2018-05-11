import React from 'react';
import './Restaurant.scss';
import ImageGallery from 'react-image-gallery';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker,} from "react-google-maps";
import MealItem from '../MealItem/MealItem.js';
import base from "../../services/base.js";

const MyMap = compose(
withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{lat: 49.8426, lng: 23.9997}}
  >
    <Marker
      position={{lat: 49.8426, lng: 23.9997}}
    />
  </GoogleMap>
  );

export default class Restaurant extends React.Component{

    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            searchValue: '',
            name: "McDonalds",
            workingTime: "11:00 - 23:00",
            phoneNumber: "0 800 340 11 11",
            address: "Rynok Sq 23",
            meals: [
                {
                    'name': "Australian burger",
                    'ingredients': ["meat", "bread", "souse", "tomato"]
                },
                {
                    'name': "Californian burger",
                    'ingredients': ["meat", "bread", "souse", "tomato"]
                },
                {
                    'name': "Cheeseburger",
                    'ingredients': ["meat", "bread", "souse", "cheese"]
                }
            ]
        }
    }

    handleInputChange(event){
        this.setState({
            searchValue: event.target.value
        })
        console.log(this.state.searchValue);
    }

    componentDidMount() {
        this.refPlace = base.bindToState(`meals/places/${this.props.match.params.id - 1 }`, {
            context: this,
            state: 'place'
         });
    }

    componentWillUnmount() {
        base.removeBinding(this.refPlace);
    }

    render() {
        console.log(this.state.place);

        const images = [
            {
                original: 'https://static.dezeen.com/uploads/2016/07/Musling_SPACE-Copenhagen_Joachim-Wichmann_dezeen_1568_0.jpg'
            },
            {
                original: 'http://gritsandgrids.s3.amazonaws.com/media/2016/03/a0e0c332937443.569930725cd1c.jpg'
            },
            {
                original: 'http://gritsandgrids.s3.amazonaws.com/media/2016/03/e22b8326364947.5635482042182.jpg'
            }
        ]

        let filteredArray = this.state.meals.filter((el)=>{
            let index = el.name.toLowerCase().indexOf(this.state.searchValue);
            if(index !== -1){
                return true;
            } else return false;
        })

        return (
            <div className="container restaurant">
                <h2></h2>
                <hr/>
                <div className="carousel">
                    <ImageGallery
                        items={images}
                        showThumbnails={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showBullets={true}
                        showNav={false}
                    />
                </div>
                <div className="details">
                    <ul>
                        <li>{}</li>
                        <li>{this.state.workingTime}</li>
                        <li>{this.state.phoneNumber}</li>
                        <li><address>{this.state.address}</address></li>
                    </ul>
                </div>
                <div className="map">
                    <MyMap />
                </div>
                <hr/>
                <h3>Our products</h3>
                <div className="search-container">
                    <input type="text" className="searchInput" placeholder="Type the name here" onChange={this.handleInputChange} />
                </div>
                {
                    filteredArray.map((item, index) => {
                        return <MealItem meal={item} key={index}/>
                    })
                }
            </div>
        )
    }
}
