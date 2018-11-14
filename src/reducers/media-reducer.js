import { ALL_MEDIA, UPLOADING_MEDIA, UPLOAD_SUCCESFULL} from '../actions/media-action';

const INITIAL_STATE = { media: '', uploading: false};

export default function (state = {} , action) {
    switch (action.type) {
        case ALL_MEDIA:
            INITIAL_STATE.media = action.payload;
            return state = {...INITIAL_STATE};
        case UPLOADING_MEDIA:
            INITIAL_STATE.uploading = true;
            return state = {...INITIAL_STATE};
        case UPLOAD_SUCCESFULL:
            INITIAL_STATE.uploading = false;
            return state = {...INITIAL_STATE};
        default:
            return state;
    }
}