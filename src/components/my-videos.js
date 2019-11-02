import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './video'
class MyVideos extends Component {
    render() {
        const { media, user }  = this.props;
        let videos = Object.keys(media).filter(key => {
            return media[key].userId === user.uid;
        });
        videos = videos.map(key => {
            media[key].key = key;
            return media[key]
        });
        return (
            <div style = {styles.mediaObjects}>
                <Video  {...this.props} media={videos} userId = {this.props.user.uid } showPublishButton = {true}/>
            </div>
        );  
    };
};

function mapStateToProps({ mediaReducer, socialSignIn }) {
    return {
        user: socialSignIn,
        media: mediaReducer.media
    };
}
export default connect(mapStateToProps, {})(MyVideos);

const styles = {
    mediaObjects: {
        flex: 7,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }  
};