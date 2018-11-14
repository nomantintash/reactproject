import * as FirebaseConfig from './firebase-config';

export function signInWithGoogle() {
    return FirebaseConfig.authProvider.signInWithPopup(FirebaseConfig.googleAuthProvider);
};

export function signInWithFaceBook() {
    return FirebaseConfig.authProvider.signInWithPopup(FirebaseConfig.facebookAuthProvider);
};

export function signout () {
    return FirebaseConfig.authProvider.signOut();
}