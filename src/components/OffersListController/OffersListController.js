import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import OffersList from '../OffersList/OffersList';
import { getPage, orderByPercentage, orderById } from '../../services/OffersListService/OffersListService';
import offerTypes from '../../constants/offerTypes';
import './OffersListController.css';

class OffersListController extends React.Component {
  constructor(props) {
    super(props);
    this.getOffers = this.getOffers.bind(this);
    this.state = {
      loading: true,
      offers: []
    };
    this.PAGES_TO_RENDER = 2;
  }

  componentDidMount() {
    this.getOffers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderBy !== this.props.orderBy
      || nextProps.filterBy !== this.props.filterBy) {
        this.getOffers();
    }
  }

  async getOffers() {
    let offers = [];
    this.setState({ offers: [], loading: true });
    const queryPages = async page => {
      if (page <= this.PAGES_TO_RENDER) {
        await getPage(page).then(json => offers.push(...json));
        await queryPages(page + 1);
      }
    }

    await queryPages(1);
    offers = await this.orderFilterOffers(offers);
    console.log('offers2', offers);
    this.setState({ offers, loading: false });
  }

  orderFilterOffers(offers) {
    let filteredOffers = offers;
    filteredOffers = filteredOffers.filter(offer => parseFloat(offer.discount_percent.slice(0, offer.discount_percent.length - 1)) > 0);
    if (this.props.filterBy.length > 0) {
      filteredOffers = filteredOffers.filter(offer => offer.full_title.toLowerCase().indexOf(this.props.filterBy.toLowerCase()) >= 0);
    }

    if (this.props.orderBy === offerTypes.ORDER_BY_ID_DESC) {
      filteredOffers = orderById(filteredOffers, true);
    } else if (this.props.orderBy === offerTypes.ORDER_BY_ID_ASC) {
      filteredOffers = orderById(filteredOffers, false);
    } else {
      filteredOffers = orderByPercentage(filteredOffers, true);
    }

    return filteredOffers;
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

OffersListController.propTypes = {
  orderBy: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
};


export default OffersListController;
