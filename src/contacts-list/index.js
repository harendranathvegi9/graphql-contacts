import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ContactsList from './contacts-list';
import spinnable from '../utils/spinnable';

const ContactsListHoc = graphql(gql`
  query ContactsListQuery {
    contacts {
      id,
      name,
      city
    }
  }
`)(spinnable(ContactsList));

export default ContactsListHoc;
