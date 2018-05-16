import React from 'react';
import OffersList from '../OffersList/OffersList';
import { orderByPercentage, getPage } from '../../services/OffersListService/OffersListService';

class OffersListController extends React.Component {
  constructor(props) {
    super(props);
    this.getOffers = this.getOffers.bind(this);
    this.state = { offers: [] };
  }

  componentDidMount() {
    this.getOffers();
  }

  async getOffers() {
    let offers = [];
    offers.push(...this.state.offers);
    
    const queryPages = async page => {
      if (page < 3) {
        await getPage(page).then(json => offers.push(...json));
        await queryPages(page + 1);
      }
    }
    
    await queryPages(1);
    offers = offers.filter(offer => parseFloat(offer.discount_percent.slice(0, offer.discount_percent.length - 1)) > 0);
    offers = orderByPercentage(offers, true);
    this.setState({ offers });
    console.log('offers', offers);
  }

  render() {
    return <OffersList offers={this.state.offers} />
  }
}

export default OffersListController;
