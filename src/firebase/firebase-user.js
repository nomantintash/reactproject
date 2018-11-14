import firebase from "firebase";
const fbdatabase = firebase.database();

export function findAndCreateUser (user) {
    const usersRef = fbdatabase.ref(`users/${user.uid}`);
    return usersRef.set(user);
}