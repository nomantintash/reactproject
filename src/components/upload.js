import React, { Component } from "react";
import { firebaseMediaUpload } from '../actions/media-action';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import loaderGif from '../assets/loader.gif';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

class MediaUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            publish: false,
            publishTime: null
        };
    }
    onMediaDrop (files) {
        const file = files[0];
        if(!this.state.description) {
            alert ('Video description is required');
            return;
        }
        console.log('this.state.publishTime', this.state.publishTime)
        if (this.state.publish && !this.state.publishTime) {
            alert('Publish time is required');
            return;
        }
        const metadata = {
            description: this.state.description,
            publish: this.state.publish,
            publishTime: this.state.publishTime
        }
        this.setState ({description: '', publish: false, publishTime: null});
        this.uploadMediaToFirebase (file, metadata);
    };

    uploadMediaToFirebase (media, metadata) {
        metadata.userId = this.props.user.uid;
        this.props.firebaseMediaUpload (media, metadata);
    };
    descriptionChangeHandler=(event) => {
        this.setState ({description: event.target.value});
    }
    setPublishFlag = () => {
        this.setState({publish: true});
    }
    onChange = (value) => {
        const currentData  = moment().format("YYYY-MM-DD")
        this.setState ({publishTime: currentData + " " + value.format(str)});
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
                <div className="checkbox">
                <label><input type="checkbox" onChange = {this.setPublishFlag}/>Publish</label>
                <TimePicker
                style={{ width: 100 }}
                showSecond={showSecond}
                defaultValue={moment()}
                className="xxx"
                onChange={this.onChange}
                />
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
