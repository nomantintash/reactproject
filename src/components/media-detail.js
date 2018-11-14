import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mediaLikes, mediaView, postMediaComments} from '../actions/media-action';
import Comment from './comment'
class MediaDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        }
        this.viewsCount = 0
        this.likesCount = 0
    }
    componentDidMount() {
        this.incrementVideoView();
    }
    renderComments() {
        if(this.props.media) {
            const mediaKey = this.props.match.params.mediaKey;
            const media = this.props.media[mediaKey];
            return <Comment media = {media} mediaKey = {this.props.match.params.mediaKey} user = {this.props.user} />
        }
    }
    renderVideoView = () => {
        const mediaKey = this.props.match.params.mediaKey;
        if (this.props.media) {
            const media = this.props.media[mediaKey];
            if(media.likes) this.likesCount = Object.keys(media.likes).length || 0;
            if(media.views) this.viewsCount = Object.keys(media.views).length || 0;

            return (
                <video controls style = {styles} >
                    <source src= {media.mediaURL}/>
                </video>
            );
        }
    }
    incrementVideoView = () => {
        const videoId = this.props.match.params.mediaKey;
        const userId = this.props.user.uid;
        this.props.mediaView(videoId, userId)
    }
    incrementVideoLike = () => {
        const mediaKey = this.props.match.params.mediaKey;
        this.props.mediaLikes (mediaKey,  this.props.user.uid);
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-7" style = { styles.meidaColumn }>
                    { this.renderVideoView() }
                </div>
                <div className="col-md-5" style = { styles.commentsColumn }>
                  {  this.renderComments() }
                </div>
                </div>
                <div className="row" style = { styles.iconsDiv }>
                    <div className="col-md-4">
                    <button onClick = { this.incrementVideoLike } style = {styles.iconsDiv.buttons}><i className="fas fa-thumbs-up" style = {styles.iconsDiv.text}></i>{ this.likesCount }</button>
                    <button style = { styles.iconsDiv.buttons } ><i className="far fa-eye" style = {styles.iconsDiv.text}></i>{ this.viewsCount }</button>
            
                </div>
                </div>
            </div>
        );
    };
};

const styles = {
    width: '100%',
    backgroundColor: 'black',
    meidaColumn: {
        paddingTop: '30px',
        paddingLeft: '30px',
    },
    commentsColumn: {
        paddingTop: '30px',
        height: '500px',
        userName: {
            fontSize: '15px',
            fontFamily: 'sans-serif'
        },
        comment: {
            fontSize: '12px',
            fontFamily: 'sans-serif',
            paddingLeft: '10px'
        }
    },
    iconsDiv: {
        paddingLeft: '15px',
        buttons: {
            border: 'none'
        },
        text: {
            paddingRight: '7px'
        }
    }
}

function mapStateToProps(state) {
    return {
        media: state.mediaReducer.media,
        user: state.socialSignIn
    }
} 

export default connect(mapStateToProps, { mediaLikes, mediaView, postMediaComments})(MediaDetail);

