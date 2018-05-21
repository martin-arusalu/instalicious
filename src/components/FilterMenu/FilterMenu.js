import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import offerTypes from '../../constants/offerTypes';
import './FilterMenu.css';

const FilterMenu = props => (
  <div className="filterMenu">
    <DebounceInput
      debounceTimeout={300}
      type="text"
      onChange={props.filterChange}
      placeholder="Otsi pealkirjast"
      className="filterSearch" />
    <select className="orderSelect" value={props.orderBy} onChange={props.orderChange} >
      <option value={offerTypes.ORDER_BY_ID_DESC}>Uuemad enne</option>
      <option value={offerTypes.ORDER_BY_ID_ASC}>Vanemad enne</option>
      <option value={offerTypes.ORDER_BY_PERCENTAGE_DESC}>Suurim soodusprotsent</option>
    </select>
  </div>
);

FilterMenu.propTypes = {
  orderBy: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  orderChange: PropTypes.func.isRequired
};

export default FilterMenu;
