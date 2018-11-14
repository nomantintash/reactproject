import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMediaComments } from '../actions/media-action';
import moment from 'moment';
class Comment extends Component {
    constructor (props) {
        super(props);
        this.state = {
            comment: '',
        }
    }
    setCommentField = (event) => {
        this.setState ({comment: event.target.value});
    };

    postComment = () => {
        const mediaKey = this.props.mediaKey;
        const newComment = this.state.comment;
        this.setState({comment: ''});
        if (newComment)
            this.props.postMediaComments(newComment, mediaKey, this.props.user);
        
    };

    renderComments() {
        if(this.props.media && this.props.media.comments) {
            const renderedComments = Object.keys(this.props.media.comments).map (key => {
                return (
                    <li key = {key}>
                        <div className="commenterImage">
                            <img src= { this.props.media.comments[key].userImage } width = "50px" height = "50px" style = { styles.commentsColumn.usrImage }/>
                        </div>
                        <div className="commentText">
                            <p style = { styles.commentsColumn.userName }>{ this.props.media.comments[key].userName }</p>
                            <p style = { styles.commentsColumn.comment }>{ this.props.media.comments[key].comment }</p>
                            <span className="date sub-text">{ moment (this.props.media.comments[key].createdAt).fromNow() }</span>
                        </div>
                    </li>
                );
            });
            return renderedComments;
        }
    };
    render() {
        return (
            <div className="detailBox">
            <div className="titleBox">
                <label>Comment Box</label>
                    <button type="button" className="close" aria-hidden="true">&times;</button>
                </div>
                <div className="actionBox">
                    <ul className="commentList">
                    { this.renderComments () }
                </ul>
                <div style= {styles.commentBox}>
                    <input value = { this.state.comment } type="text" placeholder="Post Your comments" onChange = { this.setCommentField }  className="form-group text-center"/>
                    <button className="btn btn-primary" onClick = { this.postComment }>Add</button>
                </div>
            </div>
            </div>
        );
    };
};

const styles = {
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
        },
        usrImage: {
            borderRadius: '50%'
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
};


export default connect(null, { postMediaComments})(Comment);