import { uploadMedia, mediaLike, mediaViews, addMediaComments} from '../firebase/firebase-media';
import firebase from 'firebase';

/* exporting constants */
export const UPLOAD_SUCCESFULL = 'UPLOAD_SUCCESFULL';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';
export const UPLOADING_MEDIA = 'UPLOADING_MEDIA';
export const ALL_MEDIA = 'ALL_MEDIA';
export const MEDIA_LIKED = 'MEDIA_LIKED';
export const LOADING_MEDIA = 'LOADING_MEDIA'
export const MEDIA_VIWED = 'MEDIA_VIWED';
export const COMMENT_ADDED = 'COMMENT_ADDED'
/* intialization of firebase */
const fbdatabase = firebase.database();
const mediaRef = fbdatabase.ref('media');

export function firebaseMediaUpload (media, description, userId) {
    return (dispatch) => {
        dispatch({
            type: UPLOADING_MEDIA,
            payload: null
        });
        uploadMedia(media, description, userId).then((results) => {
            dispatch ({
                type: UPLOAD_SUCCESFULL,
                payload: null
            });
        }).catch (err => {
            dispatch ({
                type: UPLOAD_FAILED,
                error: err
            });
        });
    };
};

export function getMediaFromFirebase () {
    return (dispatch) => {
        dispatch({
            type: LOADING_MEDIA,
            payload: null
        });
        mediaRef.on("value", (mediaSnapshots) => {
            return dispatch ({
                type: ALL_MEDIA,
                payload: mediaSnapshots.val()
            });
        });
    }
};

export function postMediaComments (comment, videoId, userObject) {
    return (dispatch) => {
        addMediaComments(comment, videoId, userObject).then( dispatch ({
            type: COMMENT_ADDED,
            payload: null
        }));
    };
};

export function mediaLikes (videoId, userId) {
    return (dispatch) => {
        mediaLike(videoId, userId).then( dispatch ({
            type: MEDIA_LIKED,
            payload: null
        }));
    };
};

export function mediaView (videoId, userId) {
    return (dispatch) => {
        mediaViews(videoId, userId).then( dispatch ({
            type: MEDIA_VIWED,
            payload: null
        }));
    };
};