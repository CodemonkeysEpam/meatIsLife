import React from 'react';
import base from '../../services/base';
import ImageGallery from 'react-image-gallery';

import { RestaurantItem } from '../RestaurantItem/RestaurantItem';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { MealItem } from '../MealItem/MealItem';
import Product from '../Shop/Product';
import TopSlider from './TopSlider';

import './Home.scss';

export default class Home extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      advertising: [],
      placesList: [],
      mealsList: [],
      meatList: [],
      specialMeatList: [],
      specialList: [],
      shopsList: [],
      productsList: [],
      orders: []
    }
  }

  componentDidMount() {
    this.refAdvertising = base.bindToState('advertising', {
      context: this,
      state: 'advertising',
      asArray: true
    });
    this.refPlaces = base.bindToState(`meals/places`, {
      context: this,
      state: 'placesList',
      asArray: true
    });
    this.refMeals = base.bindToState(`meals/meals`, {
      context: this,
      state: 'mealsList',
      asArray: true
    });
    this.refSpecial = base.bindToState(`meals/special`, {
      context: this,
      state: 'specialList',
      asArray: true
    });
    this.refShops = base.syncState(`meat/shops`, {
      context: this,
      state: 'shopsList',
      asArray: true
    });
    this.refMeat = base.syncState(`meat/meat`, {
      context: this,
      state: 'meatList',
      asArray: true
    });
    this.refMeat = base.syncState(`meat/special`, {
      context: this,
      state: 'specialMeatList',
      asArray: true
    });
    this.refProducts = base.bindToState('shop/products', {
      context: this,
      state: 'productsList',
      asArray: true
    });
    this.refOrders = base.bindToState(`orders`, {
      context: this,
      state: 'orders',
      asArray: true,
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.refAdvertising);
  }

  renderSpecialOffer = () => {
    let specialArray = [];
    this.state.specialList.forEach(item => {
      let newItem = {
        meal: this.state.mealsList[item.mealId],
        place: this.state.placesList[item.placeId],
        price: item.price
      };
      specialArray.push(newItem);
    });

    if(specialArray.length > 7){
      let shuffleArray = this.shuffle(specialArray);
      specialArray = specialArray.slice(0, 7);
    }

    return specialArray.map((item, i) => {
        return (
            <React.Fragment key={i}>
                <MealItem 
                    meal={item.meal} 
                    place={item.place} 
                    price={item.price}
                    addToCartButton={true}
                />
            </React.Fragment>
        )
    })
  }

  renderSpecialMeat = () => {
    let meatArray = [];
    this.state.specialMeatList.forEach(item => {
      let newItem = {
        meal: this.state.meatList[item.mealId],
        place: this.state.shopsList[item.placeId],
        price: item.price
      };
      meatArray.push(newItem);
    });

    if(meatArray.length > 7){
      let shuffleArray = this.shuffle(meatArray);
      meatArray = meatArray.slice(0, 7);
    }
    return meatArray.map((item, i) => {
        return (
            <React.Fragment key={i}>
                <MealItem 
                    meal={item.meal} 
                    place={item.place} 
                    price={item.price}
                    addToCartButton={true}
                />
            </React.Fragment>
        );
    })
  }

  renderShopList = () => {
    let shopArray = [];
    if( this.state.productsList.length > 7 ){
      let shuffleArray = this.shuffle(this.state.productsList);
      shopArray = shopArray.slice(0, 7);
    } else {
      shopArray = this.state.productsList;
    }
    return(
      shopArray.map( el => 
        <Product key={el.id} el={el} addToShoppingCart={this.props.addToShoppingCart}/>
      )
    );
  }

  shuffle(array) {
    let newArray = array;
    var currentIndex = newArray.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }
  return newArray;
}

  formTop7Places(type){
    let list = [];
    const orders = this.state.orders;
    if( type === 'store' ){
      list = this.state.shopsList;
    } else {
      list = this.state.placesList;
    }
    var topPlaces = [];
    for(var key in list) {
      var placeItem = {};
      placeItem.id = list[key].id;
      placeItem.name = list[key].name;
      placeItem.location = list[key].location;
      placeItem.address = list[key].address;
      placeItem.description = list[key].description;
      placeItem.status = list[key].status;
      placeItem.countOrder = 0;
      
      for(var key2 in orders) {
        if(orders[key2].placeId === placeItem.id) {
          placeItem.countOrder++;
        }
      }
      topPlaces.push(placeItem);
    }
    topPlaces.sort(this.orderByCountOrder);
    var top7Places = [];
    
    for(var i=0; i< 7;i++) {
      if(i === topPlaces.length) break;
      top7Places.push(topPlaces[i])
    }
    return top7Places;
  }

  render () {

    let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 5000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1550,
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
    let settingsForShop = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 5000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1550,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1200,
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
        <div className='banner'>
          <ImageGallery 
            items={this.state.advertising}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
            autoPlay={false}
            slideDuration={3000} />
        </div>

        <div className='slider-places'>
          <div className='slider-places-header'>
            <p>Popular Places</p>
          </div>
          <div className="mySlider-container">
            <TopSlider list={this.state.placesList} orders={this.state.orders} />
          </div>
        </div>

        <div className='slider-places'>
          <div className='slider-places-header'>
            <p>Special Offers</p>
          </div>
          <div className="mySlider-container">
            <Slider {...settings}>
              {this.renderSpecialOffer()}
            </Slider>
          </div>
        </div>

        <div className='slider-places'>
          <div className='slider-places-header'>
            <p>Best Stores</p>
          </div>
          <div className="mySlider-container">
            <TopSlider list={this.state.shopsList} orders={this.state.orders} />
          </div>
        </div>

        <div className='slider-places'>
          <div className='slider-places-header'>
            <p>Special Meat</p>
          </div>
          <div className="mySlider-container">
            <Slider {...settings}>
              {this.renderSpecialMeat()}
            </Slider>
          </div>
        </div>

        <div className='slider-places'>
          <div className='slider-places-header'>
            <p>Our Shop</p>
          </div>
          <div className="mySlider-container">
            <Slider {...settingsForShop}>
              {this.renderShopList()}
            </Slider>
          </div>
        </div>

        
      </React.Fragment>
    );
  }
}