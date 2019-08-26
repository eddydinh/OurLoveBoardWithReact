import {
    APIKey
} from './APIKey';
import app from 'firebase/app';
import 'firebase/auth';
const config = APIKey;
class Firebase {
    constructor() {
        app.initializeApp(config);
        //Initialize authorization
        this.auth = app.auth();
    }
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => {
        this.auth.signOut();

    }
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}
export default Firebase;