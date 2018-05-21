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
    this.orderFilterOffers = this.orderFilterOffers.bind(this);
    this.state = {
      loading: true,
      allOffers: [],
      filteredOffers: []
    };
    this.PAGES_TO_RENDER = 10;
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getOffers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderBy !== this.props.orderBy
      || nextProps.filterBy !== this.props.filterBy) {
      this.setState({ loading: true });
      this.orderFilterOffers(nextProps);
    }
  }

  async getOffers() {
    let offers = [];
    const queryPages = async page => {
      if (page <= this.PAGES_TO_RENDER) {
        await getPage(page).then(json => offers.push(...json));
        await queryPages(page + 1);
      }
    }

    await queryPages(1);
    this.setState({ allOffers: offers });
    this.orderFilterOffers();
  }

  orderFilterOffers(props = this.props) {
    let filteredOffers = this.state.allOffers;

    filteredOffers = filteredOffers.filter(offer => parseFloat(offer.discount_percent.slice(0, offer.discount_percent.length - 1)) > 0);
    if (props.filterBy.length > 0) {
      filteredOffers = filteredOffers.filter(offer => offer.full_title.toLowerCase().indexOf(props.filterBy.toLowerCase()) >= 0);
    }

    if (props.orderBy === offerTypes.ORDER_BY_ID_DESC) {
      filteredOffers = orderById(filteredOffers, true);
    } else if (props.orderBy === offerTypes.ORDER_BY_ID_ASC) {
      filteredOffers = orderById(filteredOffers, false);
    } else {
      filteredOffers = orderByPercentage(filteredOffers, true);
    }
    
    this.setState({ filteredOffers, loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading && <ReactLoading className="loadingScreen" type={'spinningBubbles'} color={'#3c0078'} />}
        <OffersList offers={this.state.filteredOffers} />
      </div>
    );
  }
}

OffersListController.propTypes = {
  orderBy: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
};


export default OffersListController;
