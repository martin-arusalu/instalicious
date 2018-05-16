export const orderByPercentage = (offers, descending) => {
  return offers.sort((prevOffer, nextOffer) => {
    const prevDisc = prevOffer.discount_percent.slice(0, prevOffer.discount_percent.length - 1);
    const nextDisc = nextOffer.discount_percent.slice(0, nextOffer.discount_percent.length - 1);
    if (parseFloat(prevDisc) < parseFloat(nextDisc)) return descending ? 1 : -1;
    else if (parseFloat(prevDisc) > parseFloat(nextDisc)) return descending ? -1 : 1;
    else return 0;
  });
}

export const getPage = async page => {
  return fetch(`https://cryptic-headland-94862.herokuapp.com/http://www.pakkumised.ee/acts/offers/js_load.php?act=offers.js_load&category_id=0&page=${page}`)
    .then(response => response.json()
      .then(json => json)
    );
}