import React from 'react';
import { Link } from 'react-router-dom';
import base from '../../services/base';
import FindFoodTab from '../FindFoodTab/FindFoodTab';
import FindLocationTab from '../FindLocationTab/FindLocationTab';
import './MealsSection.scss';

export default class MainSection extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
            currentTab: 'findyourmeal',
            placesList: [],
            mealsList: [],
            menusList: [],
            specialList: [],
            orders: []
      }
  }

  componentDidMount() {
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
    this.refMenus = base.bindToState(`meals/menus`, {
        context: this,
        state: 'menusList',
        asArray: true,
      });
    this.refOrders = base.bindToState(`orders`, {
        context: this,
        state: 'orders',
        asArray: true,
    });
    this.refSpecial = base.bindToState(`meals/special`, {
        context: this,
        state: 'specialList',
        asArray: true
      });
  }

  componentWillUnmount() {
      base.removeBinding(this.refPlaces);
      base.removeBinding(this.refMeals);
      base.removeBinding(this.refMenus);
      base.removeBinding(this.refOrders);
      base.removeBinding(this.refSpecial);
  }

displayTab () {
    if (this.state.currentTab === 'findyourplace') {
        return (
        <React.Fragment>
            {this.state.placesList.length > 0 ?
            <FindLocationTab list={this.state.placesList} orders={this.state.orders} type={"meal"}/>
            :
            <div>...</div>
            }
        </React.Fragment>
        )
    } else {
        return (
        <React.Fragment>
            {this.state.mealsList.length > 0 && this.state.placesList.length > 0 && this.state.menusList.length > 0  && this.state.specialList.length > 0 ?
            <FindFoodTab
                itemsList={this.state.mealsList}
                placesList={this.state.placesList}
                menusList={this.state.menusList}
                specialOffers = {true}
                specialList={this.state.specialList}
                mealsPage = {true}
                addToShoppingCart={this.props.addToShoppingCart}
            />
            :
            <div>...</div>
            }
        </React.Fragment>
        )
    }
}

static getDerivedStateFromProps(nextProps, prevState) {
    return {
        currentTab: nextProps.location.search === "?findyourplace" ? "findyourplace" : "findyourmeal"
    };
  }

  render () {
    return (
        <div className="main-section">
        <div className="page-heading">Meal delivery</div>
            <div className="find-tabs">
                <div className="container">
                    <div className="flex-tabs">
                    <Link to="/meals?findyourplace" className={this.state.currentTab === 'findyourplace' ? "find-tab tab-red active": "find-tab tab-red"}>Find your place</Link>
                    <Link to="/meals?findyourmeal" className={this.state.currentTab === 'findyourmeal' ? "find-tab tab-yellow active": "find-tab tab-yellow"}>Find your meal</Link>
                    </div>
                </div>
            </div>
            <div className="find-tab-body">
                <div className="container">
                    {this.displayTab()}
                </div>
            </div>
        </div>
    );
  }
}
