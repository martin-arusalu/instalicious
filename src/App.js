import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acc: 'justinbieber',
      images: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.setImages = this.setImages.bind(this);
  }

  handleChange(event) {
    this.setState({
      acc: event.target.value
    });
    this.setImages(event.target.value);
  }

  componentDidMount() {
    this.setImages(this.state.acc);
    this.interval = setInterval(() => {
      this.setImages(this.state.acc);
    }, 5000);
  }

  setImages(acc) {
    const oldId = this.state.images.length ? this.state.images[0].node.id : 0;
    fetch(`https://www.instagram.com/${acc}/`)
      .then(response => response.text()
        .then(text => {
          const start = text.indexOf('<script type="text/javascript">window._sharedData') + 52;
          const fromStart = text.slice(start, text.length);
          const end = fromStart.indexOf('</script>') - 1;
          const data = JSON.parse(fromStart.slice(0, end));
          const profile = data.entry_data.ProfilePage[0].graphql.user;
          const images = profile.edge_owner_to_timeline_media.edges;
          if (oldId !== images[0].node.id) {
            this.setState({ images });
          }
        })
      );
  }

  // TODO: Query all images.
  /* setImages(acc = 'justinbieber') {
    const getQueryHash = async htmlText => {
      const start = htmlText.indexOf('/static/bundles/base/ProfilePageContainer.js');
      const fromStart = htmlText.slice(start, htmlText.length);
      const end = fromStart.indexOf('" as="script" type="text/javascript" crossorigin="anonymous" />');
      const url = fromStart.slice(0, end);
      const queryHash = await fetch('https://www.instagram.com' + url)
        .then(response => response.text()
          .then(text => {
            const start = text.indexOf('o},queryId:"') + 12;
            const fromStart = text.slice(start, text.length);
            const end = fromStart.indexOf('"');
            return fromStart.slice(0, end);
          }));
      return queryHash;
    }

    fetch(`https://www.instagram.com/${acc}/`)
      .then(response => response.text()
        .then(text => {
          getQueryHash(text)
            .then(queryHash => {
              const start = text.indexOf('<script type="text/javascript">window._sharedData') + 52;
              const fromStart = text.slice(start, text.length);
              const end = fromStart.indexOf('</script>') - 1;
              const data = JSON.parse(fromStart.slice(0, end));
              const profile = data.entry_data.ProfilePage[0].graphql.user;
              const images = profile.edge_owner_to_timeline_media.edges;
              let hasNextPage = profile.edge_owner_to_timeline_media.page_info.has_next_page;
              if (hasNextPage) {
                const variables = {
                  id: profile.id,
                  first: 12,
                  after: profile.edge_owner_to_timeline_media.page_info.end_cursor
                }
                const url = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables=${encodeURI(JSON.stringify(variables))}`;
                const rhxGis = data.rhx_gis;
                const signature = crypto.createHash('md5').update(`${rhxGis}:${variables}`, 'utf8').digest("hex");
                let headers = new Headers();
                headers.append('X-Instagram-GIS', signature);
                fetch(url, {
                  mode: 'no-cors',
                  credentials: 'include',
                  headers
                }).then(response => console.log(response));
              }
            });
        }));
  } */

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Instalicious</h1>
          <label>
            Username:
          <input type="text" value={this.state.acc} onChange={this.handleChange} />
          </label>
        </header>
        <div className="images">
          {this.state.images.map(image => {
            let alt = 'Image';
            if (image.node.edge_media_to_caption.edges.length > 0) {
              alt = image.node.edge_media_to_caption.edges[0].node.text;
            }
            return (
              <div key={image.node.id} className="instaImg">
                <ModalImage
                  small={image.node.thumbnail_resources[2].src}
                  large={image.node.display_url}
                  alt={alt} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
