import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/et';
import './Offer.css';

const Offer = props => {
  moment.locale('et');
  const startTime = moment(props.offer.start_time);
  const endTime = moment(props.offer.end_time);
  let title = props.offer.full_title.replace(/&amp;/g, '&');
  title = title.replace(/&quot;/g, '"');

  return (
    <div className="offer">
      <div className="titleContainer">
        <h2 className="title">{title}</h2>
      </div>
      <h4 className="discountPercent">-{props.offer.discount_percent}</h4>
      <div className="middleContent">
        <img className="offerImg" alt={props.offer.full_title} src={`http://pakkumised.ee${props.offer.img_src}`} />
        <div className="prices">
          <del className="regularPrice">{props.offer.regular_price}</del>
          <span className="bargain">{props.offer.bargain_price}</span>
          <span className="startTime">Algus: {startTime.format('lll')}</span>
          <span className="endTime">Lõpp: {endTime.format('lll')}</span>
        </div>
      </div>
      <div className="refLink" onClick={() => window.open(props.offer.url, '_blank')}>
        <span>Pakkumise lehele</span>
      </div>
    </div>
  );
}

Offer.propTypes = {
  offer: PropTypes.object.isRequired
};

export default Offer;