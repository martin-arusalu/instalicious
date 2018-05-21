import React from 'react';
import Header from './components/Header/Header';
import OffersListController from './components/OffersListController/OffersListController';
import offerTypes from './constants/offerTypes';
import FilterMenu from './components/FilterMenu/FilterMenu';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: '',
      orderBy: offerTypes.ORDER_BY_ID_DESC,
    }
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleOrderChange(event) {
    this.setState({ orderBy: event.target.value });
  }

  handleFilterChange(event) {
    this.setState({ filterBy: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Header title="Head pakkumised" description="Sooduse protsendi järgi järjestatud pakkumised" />
        <FilterMenu
          filterBy={this.state.filterBy}
          orderBy={this.state.orderBy}
          filterChange={this.handleFilterChange}
          orderChange={this.handleOrderChange}
        />
        <OffersListController orderBy={this.state.orderBy} filterBy={this.state.filterBy} />
      </div>
    );
  }
}

export default App;
