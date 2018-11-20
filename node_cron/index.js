const admin = require('firebase-admin');
const moment = require('moment');
const cron = require("node-cron");
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://noman-tintash.firebaseio.com'
});

function publishVideos () {
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm")
    const media = admin.database().ref('/media');
    media.orderByChild("published").equalTo(false).once("value", function(snap) {
        const videos = snap.val()
        if(videos) {
            return Object.keys(videos).map(key => {
                if (videos[key].publishTime && now === videos[key].publishTime) {
                    updateMedia(key);
                }
            });
        } 
    });

}

function updateMedia(key) {
    console.log('updateMedia ', key)
    const mediaref = admin.database().ref(`/media/${key}`);
    mediaref.update({ 'published': true });
}

cron.schedule('*/10 * * * * *', function() {
    console.log('cron')
    publishVideos()
});