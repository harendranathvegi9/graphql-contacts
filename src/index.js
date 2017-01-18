import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MasterDetail from './master-detail';
import ContactsList from './contacts-list';
import { CreateContactForm, UpdateContactForm } from './contact-form';
import './style.css';

injectTapEventPlugin();

const client = new ApolloClient({
  dataIdFromObject: obj => {
    return obj.__typename + ':' + obj.id;
  }
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
  })
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <MuiThemeProvider>
      <div>
        <AppBar title="GraphQL Contacts" showMenuIconButton={false}/>
        <MasterDetail Master={ContactsList}
          CreateDetail={CreateContactForm} UpdateDetail={UpdateContactForm}/>
      </div>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
