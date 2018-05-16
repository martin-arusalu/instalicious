import React from 'react';
import ReactLoading from 'react-loading';
import OffersList from '../OffersList/OffersList';
import { orderByPercentage, getPage } from '../../services/OffersListService/OffersListService';
import './OffersListController.css';

class OffersListController extends React.Component {
  constructor(props) {
    super(props);
    this.getOffers = this.getOffers.bind(this);
    this.state = { loading: true, offers: [] };
    this.PAGES_TO_RENDER = 2;
  }

  componentDidMount() {
    this.getOffers();
  }

  async getOffers() {
    let offers = [];
    offers.push(...this.state.offers);
    
    const queryPages = async page => {
      if (page <= this.PAGES_TO_RENDER) {
        await getPage(page).then(json => offers.push(...json));
        await queryPages(page + 1);
      }
    }
    
    await queryPages(1);
    offers = offers.filter(offer => parseFloat(offer.discount_percent.slice(0, offer.discount_percent.length - 1)) > 0);
    offers = orderByPercentage(offers, true);
    this.setState({ offers, loading: false });
    console.log('offers', offers);
  }

  render() {
    return (
      <div>
        {this.state.loading && <ReactLoading className="loadingScreen" type={'spinningBubbles'} color={'#3c0078'} />}
        <OffersList offers={this.state.offers} />
      </div>
    );
  }
}

export default OffersListController;
