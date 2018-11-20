import React from 'react';
import moment from 'moment';
const Video = ({media, userId, searchText,...props}) => {
    return (
        renderMediaObjects(media, userId, searchText, props)
    )
}

function renderMediaObjects (media, userId = null, searchText = null, props) {
    if (!media) return (<div>Media not found</div>)
    const videos =  media.map (media => {
      console.log('renderMediaObjects', media)
      if ( searchText === media.description || userId === media.userId || searchText === "") {
          return (
              <div
                className="col-md-4 transparent mediaBox"
                key={media.key}
                style={styles.mediaDiv}
              >
                <div className="card border-0" key={media.key}
                onClick={event => loadMediaDetails(media.key, props)}>
                <div className="card-header bg-transparent border-0">{media.description}</div>
                  <div className="container">
                    <video style = {styles.imageStyle} className = "card-img-top mediaBox">
                    <source src={media.mediaURL}/>
                    </video>
                    <div style = {styles.iconBackground}>
                    <span>
                      <i className="far fa-thumbs-up" style =  {styles.iconStyle}></i>
                      { media.likes? Object.keys(media.likes).length : 0}
                      
                    </span>
                    <span>
                      <i className="far fa-comments" style = {styles.iconStyle}></i>
                      { media.comments? Object.keys(media.comments).length : 0}
                    </span>
                    <span>
                      <i className="fas fa-eye" style = {styles.iconStyle}></i>
                      { media.views? Object.keys(media.views).length : 0}
                    </span>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                  <small className="text-muted">Status: {media.published? "Published": "Not Published"}</small> 
                  <br/>
                    <small className="text-muted">{moment(media.uploadedTime).fromNow()}</small>
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
  iconStyle: {
    marginRight: '5px',
    marginLeft: '5px'
  },
  iconBackground: {
    backgroundColor: '#EEEEEE'
  },
  imageStyle:{
    backgroundColor: 'black',
    paddingTop: '3px',
    paddingLeft: '3px',
    height: '280px'
  }
};

export default Video;
  