import firebase from 'firebase';
const storageUrl = 'media/';
const fbdatabase = firebase.database();
const mediaRef = fbdatabase.ref('media');

export function uploadMedia (file, description, userId) {
    const randomFileName = Date.now()
    const storageRef = firebase.storage().ref(`${storageUrl}/${randomFileName}`);

    return storageRef.put(file).then(async snapshot => {
        const uploadedURL = await snapshot.ref.getDownloadURL();
        await addMediaRecord({ 'mediaURL': uploadedURL, 'userId': userId, description: description });
        return snapshot;
    }).catch (err => {
       return err.message;
    });
};

export function getAllMedia () {
    mediaRef.on("value", (mediaSnapshots) => {
        return Promise.resolve (mediaSnapshots.val());
    });
};

export function addMediaComments (comment, videoId, userObject) {
    const mediaCommentRef = fbdatabase.ref(`media/${videoId}/comments/`);
    return mediaCommentRef.push({
        'userName': userObject.displayName,
        'userImage': userObject.photoURL,
        'userId': userObject.uid,
        'comment': comment,
        'createdAt': Date.now()
    });
} 

export function mediaLike (videoId, userId) {
    const mediaLikeRef = fbdatabase.ref(`media/${videoId}/likes/${userId}`);
    return mediaLikeRef.set('true');
}

export function mediaViews (videoId, userId) {
    const mediaViewsRef = fbdatabase.ref(`media/${videoId}/views/${userId}`);
    return mediaViewsRef.set('true');
}

function addMediaRecord (mediaObject) {
    mediaObject.uploadedTime = Date.now();
    return mediaRef.push(mediaObject)
}