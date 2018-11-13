import React from 'react';
import moment from 'moment';
const Video = ({media, userId, searchText,...props}) => {
    return (
        renderMediaObjects(media, userId, searchText, props)
    )
}

function renderMediaObjects (media, userId = null, searchText = null, props) {
    if (!media) return (<div>Media not found</div>)
    const videos =  Object.keys(media).map (key => {
      if ( searchText === media[key].description || userId === media[key].userId || searchText === "") {
          return (
              <div
                className="col-md-4 transparent mediaBox"
                key={key}
                onClick={event => loadMediaDetails(key, props)}
                style={styles.mediaDiv}
              >
                <div className="card border-0">
                <div className="card-header bg-transparent border-0">{media[key].description}</div>
                  <div className="container">
                    <video style = {styles.imageStyle} className = "card-img-top mediaBox">
                    <source src={media[key].mediaURL}/>
                    </video>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <small className="text-muted">{moment(media[key].uploadedTime).fromNow()}</small>
                  </div>
                </div>
              </div>
          );
        }     
    });
    return videos;
  };

function loadMediaDetails (key, props) {
  props.history.push({
    pathname: `/home/media-detail/${key}`
  });
};

const styles = {
  mediaDiv: {
    paddingTop: "20px",
    paddingRight: "30px",
    paddingLeft: "30px",
  },
  cardStyle: {
    backgroundColor: '#f0f5f5'
  },
  imageStyle:{
    backgroundColor: 'black',
    paddingTop: '3px',
    paddingLeft: '3px',
    height: '280px'
  }
};

export default Video;
  