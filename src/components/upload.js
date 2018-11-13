import React, { Component } from "react";
import { firebaseMediaUpload } from '../actions/media-action';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import loaderGif from '../assets/loader.gif';

class MediaUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        };
    }
    onMediaDrop (files) {
        const file = files[0];
        if(!this.state.description) {
            alert ('Video description is required');
            return;
        }
        const description = this.state.description;
        this.setState ({description: ''});
        this.uploadMediaToFirebase (file, description);
    };

    uploadMediaToFirebase (media, description) {
        this.props.firebaseMediaUpload (media, description, this.props.user.uid);
    };
    descriptionChangeHandler=(event) => {
        this.setState ({description: event.target.value});
    }

    render () {
        return (
            <div style = { styles.container }>
                { this.props.media.uploading? <img src= { loaderGif } style = {styles.image} /> : null }
                <div style = { styles.div }>
                
                <div className="dropzone">
                    <Dropzone onDrop={ this.onMediaDrop.bind (this) } multiple= {false} style = { styles.uploadDiv }>
                        <div className="text-center">Drop an image or click to select a file to upload.</div>
                    </Dropzone>
                </div>
                </div>
                <div style = { Object.assign({}, styles.div, styles.inputDiv) }>
                    <input type= "text" placeholder = "Type video description" onChange = { this.descriptionChangeHandler } className="form-control" style = {styles.inputField}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps ({socialSignIn, mediaReducer}) {
    return {
        user: socialSignIn,
        media: mediaReducer
    };
};

const styles = {
    container: {
        paddingTop: '30px',
        alignItems: 'center',
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    image: {
        position: 'fixed',
        height: '150px'
    },
    div: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputDiv: {
        paddingTop: '20px'
    },
    inputField: {
        textAlign:'center',
        width: '400px'
    },
    uploadDiv: {
        'paddingTop': '50%',
        position: 'relative',
        width: '400px',
        border: 'dotted',
        borderRadius: '6%',
        height: '400px',
    }
}

export default connect(mapStateToProps, { firebaseMediaUpload })(MediaUpload);
