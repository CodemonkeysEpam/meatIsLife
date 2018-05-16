import React from 'react';
import SimpleMap from '../GoogleMap/GoogleMap';
import './FindLocationTab.scss';
import { RestaurantItem, RestaurantItemMap } from '../RestaurantItem/RestaurantItem';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

export default class FindLocationTabNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlacesList: this.props.list,
            searchPlaceQuery: "",
            currentPlace: null,
            hoverPlace: null,
            currentView: 'grid',
            currentFilter: "all"
        }
        if(this.props.type === "meal"){
            this.state.url = "restaurant"
        } else if (this.props.type === "meat"){
            this.state.url = "meat-shop"
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            currentPlacesList: nextProps.list
        };
    }

    renderPlacesList = () => {
        if(this.state.currentView === 'map') {
            return this.state.currentPlacesList.map((place, i) => {
                return (
                    <div>
                        <Link to={`/${this.state.url}/${place.id}`} className="restaurant-item-map" key={i}
                            onMouseEnter={() => this.onPlaceHover(place)}
                            onMouseLeave={() => this.onPlaceHover(null)}
                        >
                            <RestaurantItemMap
                                id={place.id}
                                place={place}
                                logo={place.logo}
                                name={place.name}
                                address={place.address}
                            />
                        </Link>
                        <hr/>
                    </div>
                )
            })
        } else {
            return this.state.currentPlacesList.map((place, i) => {
                return (
                    <div className="restaurant-item" key={i}>
                        <RestaurantItem
                            id={place.id}
                            logo={place.logo}
                            name={place.name}
                            address={place.address}
                            detailsClick={() => this.detailsClick(place)}
                            showOnMapClick={() => this.showOnMapClick(place)}
                            type={this.props.type}
                        />
                    </div>
                )
            })
        }
    }

    handlePlaceInputChange = () => {
        let pattern = new RegExp(this.searchPlaceInput.value, 'i');
        let filtered = this.props.list.filter((place) => {
            return pattern.test(place.name)
        });
        this.setState({
            searchplaceQuery: this.searchPlaceInput.value,
            currentPlacesList: filtered,
            currentPlace: filtered[0] || {}
        });
    }

    onPlaceClick = (place) => {
        this.setState({
            currentPlace: place
        });
    }

    onPlaceHover = (place) => {
        this.setState({
            hoverPlace: place
        });
    }

    detailsClick = (place) => {

    }

    showOnMapClick = (place) => {
        this.setState({
            currentView: 'map',
            currentPlace: place
        })
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        });
    }

    onIconClick = (icon) => {
        let current = [];
        if (icon === "all") {
            current = this.props.list.slice();
        } else {
            current = this.props.list.filter(item => {
                return item.assortment.indexOf(icon) !== -1;
            })
        };
        this.setState({
            currentPlacesList: current.slice(),
            currentFilter: icon
        })
    }

    renderMeatIcons = () => {
        return  <div className="meat-icons">
                        <div className="item">
                            <div className={this.state.currentFilter === "all" ? "item-icon active": "item-icon"} onClick={() => this.onIconClick("all")}></div>
                            <div className="item-name">All</div>
                        </div>
                    <div className="item">
                        <div className={this.state.currentFilter === "beef" ? "item-icon active": "item-icon"} onClick={() => this.onIconClick("beef")}>
                            <img src="img/meat_icons/beef.png" alt="Beef" />
                        </div>
                        <div className="item-name">Beef</div>
                    </div>
                    <div className="item">
                        <div className={this.state.currentFilter === "pork" ? "item-icon active": "item-icon"} onClick={() => this.onIconClick("pork")}>
                            <img src="img/meat_icons/pork.png" alt="Pork" />
                        </div>
                        <div className="item-name">Pork</div>
                    </div>
                    <div className="item">
                        <div className={this.state.currentFilter === "lamb" ? "item-icon active": "item-icon"} onClick={() => this.onIconClick("lamb")}>
                            <img src="img/meat_icons/lamb.png" alt="Lamb" />
                        </div>
                        <div className="item-name">Lamb</div>
                    </div>
                    <div className="item">
                        <div className={this.state.currentFilter === "chicken" ? "item-icon active": "item-icon"} onClick={() => this.onIconClick("chicken")}>
                            <img src="img/meat_icons/chicken.png" alt="Chicken" />
                        </div>
                        <div className="item-name">Chicken</div>
                    </div>
                    <div className="item">
                        <div className={this.state.currentFilter === "sea food" ? "item-icon active": "item-icon"} onClick={() => this.onIconClick("sea food")}>
                            <img src="img/meat_icons/sea_food.png" alt="Sea food" />
                        </div>
                        <div className="item-name">Sea food</div>
                    </div>
                </div>
    }

    renderSlider = () => {
        let arr = this.props.list.map((place, i) => {
            return (
                <React.Fragment key={i}>
                    <div className="myitem">
                        <RestaurantItem
                            logo={place.logo}
                            name={place.name}
                            address={place.address}
                            detailsClick={() => this.detailsClick(place)}
                            showOnMapClick={() => this.showOnMapClick(place)}
                            type={this.props.type}
                        />
                    </div>
                </React.Fragment>
            )
        })
        return arr.slice(Math.max(arr.length - 7, 1));
    }

    render () {
        console.log(this.props.type);
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1250,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 950,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 1
                    }
                }
              ]
          };
        return (
            <React.Fragment>
                {this.props.type === "meat" && this.renderMeatIcons()}
                <div className="mySlider-container">
                    <Slider {...settings}>
                        {this.renderSlider()}
                    </Slider>
                </div>
                <div className="find-location-heading">
                    <h3>All Restaurants</h3>
                </div>
                <div className="view-buttons-container">
                    <div className="search-input-container">
                        <input type="text" placeholder="Search by name" className="search-input" ref={input => this.searchPlaceInput = input} onChange={this.handlePlaceInputChange} />
                        <i className="fa fa-search"></i>
                    </div>
                    <button className="view-button" onClick={()=>{this.changeView("grid")}}>Grid</button>
                    <button className="view-button" onClick={()=>{this.changeView("map")}}>Map</button>
                </div>
                {this.state.currentView === "map" ?
                    <div className="container-map">
                        <div className='list-container-map'>
                            {this.renderPlacesList()}
                        </div>
                        <div className="map-container">
                            <SimpleMap
                            places={this.state.currentPlacesList}
                            currentPlace={this.state.currentPlace}
                            hoverPlace={this.state.hoverPlace}
                            />
                        </div>
                    </div>
                    :
                    <div className='list-container-grid'>
                        <div>
                            {this.renderPlacesList()}
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }
}
