import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "./searchbar";
import Video from './video';
import loaderGif from '../assets/loader.gif';
class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  };
  
  renderMedia = () => {
    if (!this.props.media) 
      return ( 
        <div style = { styles.loadingDiv }>
          <img src = {loaderGif}  height = "150px" width = "150px"/> 
          Loading Media
        </div>
      );
    
    return <Video {...this.props} searchText = { this.state.searchText } />
  };

  searchCallback  = (event) => {
    this.setState({ searchText: event.target.value });
  };
  
  render() {
    return (
      <div style = { styles.container }>
        <div>
          <SearchBar search={ this.searchCallback } style = {styles.searchBarStyles}/>
        </div>
        
        <div style = {styles.mediaObjects}>
          { this.renderMedia () }
        </div>
      </div>
    );
  };
}

function mapStateToProps ({ mediaReducer }) {
  return {
    media: mediaReducer.media
  };
}

export default connect(mapStateToProps, {})(Media);

const styles = {
  container: {
    flex: 7,
    display: 'flex',
    flexDirection: 'column'
  },
  loadingDiv: {
    marginTop: '85px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mediaObjects: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};
