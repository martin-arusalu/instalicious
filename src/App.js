import React from 'react';
import DebounceInput from 'react-debounce-input';
import Header from './components/Header/Header';
import OffersListController from './components/OffersListController/OffersListController';
import offerTypes from './constants/offerTypes';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: 'puhkus',
      orderBy: offerTypes.ORDER_BY_ID_DESC,
    }
  }

  render() {
    return (
      <div className="App">
        <Header title="Head pakkumised" description="Sooduse protsendi järgi järjestatud pakkumised" />
        <select value={this.state.orderBy} onChange={event => this.setState({ orderBy: event.target.value })} >
          <option value={offerTypes.ORDER_BY_ID_DESC}>Uuemad enne</option>
          <option value={offerTypes.ORDER_BY_ID_ASC}>Vanemad enne</option>
          <option value={offerTypes.ORDER_BY_PERCENTAGE_DESC}>Suurim soodusprotsent</option>
        </select>
        <DebounceInput
          debounceTimeout={300}
          type="text"
          onChange={event => this.setState({ filterBy: event.target.value })}
          placeholder="Otsi pealkirja järgi"
          className="filterSearch" />
        <OffersListController orderBy={this.state.orderBy} filterBy={this.state.filterBy} />
      </div>
    );
  }
}

export default App;
