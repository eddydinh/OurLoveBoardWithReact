import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './App';
import Firebase, { FirebaseContext } from '../components/Firebase';

export default class Root extends Component {



  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
          <FirebaseContext.Provider value={new Firebase()}>
        <App />
        </FirebaseContext.Provider>
      </Provider>
    );
  }
}

Root.propTypes ={
    store: PropTypes.object.isRequired
  }
