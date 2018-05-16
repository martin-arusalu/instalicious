import React from 'react';
import Header from './components/Header/Header';
import OffersListController from './components/OffersListController/OffersListController';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header title="Head pakkumised" />
        <OffersListController />
      </div>
    );
  }
}

export default App;
