import React from 'react';
import PropTypes from 'prop-types';
import './OffersList.css';
import Offer from '../Offer/Offer';

const OffersList = props => (
  <div className="offers">
    {props.offers.map(offer => <Offer key={offer.id} offer={offer} />)}
  </div>
);

OffersList.propTypes = {
  offers: PropTypes.array.isRequired
};

export default OffersList;
