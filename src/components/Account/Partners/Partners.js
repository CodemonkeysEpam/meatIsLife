import React from 'react';
import base from '../../../services/base';
import AddPartners from "./AddPartners/AddPartners";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

class Partners extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            currentTab: 'Partners',
            placesList: [],
            shopsList: []
        }
    }
  
    handleClick (tab) {
      this.setState({
          currentTab: tab
      });
    }

    componentDidMount() {
        this.refPlaces = base.bindToState(`meals/places`, {
            context: this,
            state: 'placesList',
            asArray: true,
            queries: {
                orderByChild: 'userId',
                equalTo: this.props.uid
            }
          });
          this.refShops = base.bindToState(`meat/places`, {
            context: this,
            state: 'shopsList',
            asArray: true,
            queries: {
                orderByChild: 'userId',
                equalTo: this.props.uid
            }
          });
      }
    
      componentWillUnmount() {
          base.removeBinding(this.refPlaces);
          base.removeBinding(this.refShops);
      }

      static getDerivedStateFromProps(nextProps, prevState) {
        var currentTab;
        if(nextProps.location.pathname === "/account/partners/add") {
            currentTab = "AddPartners"
        }
        else if(nextProps.location.pathname.includes("/account/partners/")) {
            currentTab = "PartnersItem"
        }
        else {
            currentTab = "Partners"
        }
        return {
            currentTab
        };
    }
    
    displayTab () {
        if(this.state.currentTab === "Partners") {
            return (
                <React.Fragment>
                    <div className="type-container">
                        <div className="header">
                            <div className="title">Places:</div>
                            <Link to="account/partners/add" className="add-button">Add new item</Link>
                        </div>
                        
                        {this.state.placesList.length > 0 ?
                        this.state.placesList.map((place, index) => (
                            <div className="item" key={place.id}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/meatislifeepam.appspot.com/o/default%2Fprofile.jpg?alt=media&token=d26705f2-7d77-4c1e-b628-9cc1bd1a69e2" alt="logo"/>
                                <div className="body">
                                    <div className="title">{place.name}</div>
                                    <div className="address">{place.address}</div>
                                    <div className="verified">Verified: {place.verified.toString()}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div>No data</div>
                        }
                    </div>

                    <div className="type-container">
                        <div className="header">
                            <div className="title">Shops:</div>
                            <Link to="account/partners/add" className="add-button">Add new item</Link>
                        </div>
                        
                        {this.state.shopsList.length > 0 ?
                        this.state.shopsList.map((place, index) => (
                            <div className="item" key={place.id}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/meatislifeepam.appspot.com/o/default%2Fprofile.jpg?alt=media&token=d26705f2-7d77-4c1e-b628-9cc1bd1a69e2" alt="logo"/>
                                <div className="body">
                                    <div className="title">{place.name}</div>
                                    <div className="address">{place.address}</div>
                                    <div className="verified">Verified: {place.verified.toString()}</div>
                                </div>
                            </div>
                        ))
                        :
                        <div>No data</div>
                        }
                    </div>
                </React.Fragment>
            )
        } else {
            return (        
                <AddPartners uid={this.props.uid}/>
            )     
        }

    }
    render() {
        return (
            <div className="partners">
                {this.displayTab()}
            </div>
        )
    }
}


export default withRouter(Partners);