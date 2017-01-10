import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import ContactForm from './ContactForm';
import spinnable from '../utils/spinnable';
import emptyData from '../utils/emptyData';

const readQuery = graphql(gql`
  query ContactQuery($id: String!) {
    contact(id: $id) {
      id
      name,
      company,
      email,
      phone,
      street,
      city,
      state,
      zip,
      dob,
      notes
    }
  }
`);

const mutation = (type, options) => graphql(gql`
  mutation ${type}Contact(
    $id: String!,
    $name: String!,
    $company: String,
    $email: String,
    $phone: String,
    $street: String,
    $city: String,
    $state: String,
    $zip: String,
    $dob: Date,
    $notes: String
  ) {
    ${type.toLowerCase()}Contact(
      id: $id,
      name: $name,
      company: $company,
      email: $email,
      phone: $phone,
      street: $street,
      city: $city,
      state: $state,
      zip: $zip,
      dob: $dob,
      notes: $notes
    ) {
      id
      name,
      company,
      email,
      phone,
      street,
      city,
      state,
      zip,
      dob,
      notes
    }
  }
`, options);

const mutationOptions = (updateQueries) => ({
  props: ({ mutate }) => ({
    saveContact(contact) {
      return mutate({
        variables: contact,
        updateQueries
      });
    }
  })
});

// NOTE: not working because update is silently ignored (likely related to
// <https://github.com/apollostack/apollo-client/issues/1123>)
const updateContactsList = {
  ContactsListQuery: (prev, { mutationResult }) => ({
    ...prev,
    contacts: [
      ...prev.contacts,
      mutationResult.data.createContact
    ]
  })
};

const SpinnableContactForm = spinnable(ContactForm);

export const CreateContactForm = compose(
  emptyData,
  mutation('Create', mutationOptions(updateContactsList)),
)(SpinnableContactForm);

export const UpdateContactForm = compose(
  readQuery,
  mutation('Update', mutationOptions()),
)(SpinnableContactForm);
