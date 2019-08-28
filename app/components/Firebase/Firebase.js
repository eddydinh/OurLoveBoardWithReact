import {
    APIKey
} from './APIKey';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = APIKey;
class Firebase {
    constructor() {
        app.initializeApp(config);
        //Initialize authorization
        this.auth = app.auth();
        this.db = app.database();
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


      // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  
}
export default Firebase;