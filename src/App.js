import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/et';
import './App.css';

class App extends Component {
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
    let page = 1;
    while (page < 5) {
      await fetch(`http://www.pakkumised.ee/acts/offers/js_load.php?act=offers.js_load&category_id=0&page=${page}`)
        .then(response => response.json()
          .then(json => {
            offers.push(...json);
          })
        );
      page++;
    }
    offers = offers.sort((prevOffer, nextOffer) => {
      const prevDisc = prevOffer.discount_percent.slice(0, prevOffer.discount_percent.length - 1);
      const nextDisc = nextOffer.discount_percent.slice(0, nextOffer.discount_percent.length - 1);
      if (parseFloat(prevDisc) < parseFloat(nextDisc)) return 1;
      else if (parseFloat(prevDisc) > parseFloat(nextDisc)) return -1;
      else return 0;
    });
    this.setState({ offers });
    console.log(offers);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sooduspakkumised</h1>
        </header>
        <div className="offers">
          {this.state.offers.map(offer => {
            moment.locale('et');
            const startTime = moment(offer.start_time);
            const endTime = moment(offer.end_time);
            return (
              <div key={offer.id} className="offer">
                <div className="titleContainer">
                  <h2 className="title">{offer.full_title.replace(/&amp;/g, '&')}</h2>
                </div>
                <h4 className="discountPercent">-{offer.discount_percent}</h4>
                <div className="middleContent">
                  <img className="offerImg" alt={offer.full_title} src={`//pakkumised.ee${offer.img_src}`} />
                  <div className="prices">
                    <del className="regularPrice">{offer.regular_price}</del>
                    <span className="bargain">{offer.bargain_price}</span>
                    <span className="startTime">Algus: {startTime.format('lll')}</span>
                    <span className="endTime">Lõpp: {endTime.format('lll')}</span>
                  </div>
                </div>
                <div className="refLink" onClick={() => window.open(offer.url, '_blank')}>
                  <span>Pakkumise lehele</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
