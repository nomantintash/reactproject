import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './video'
class MyVideos extends Component {
    render() {
        return (
            <div style = {styles.mediaObjects}>
                <Video {...this.props} userId = {this.props.user.uid }/>
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