import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import isEmail from 'validator/lib/isEmail';
import style from './style.css';

const required = value => value ? undefined : 'Required';
const identifier = value => (value && !value.match(/^[a-zA-Z0-9-]+$/)) ?
  'Id can contain only alphanumeric characters and dashes (-)' : undefined;
const email = value => (value && !isEmail(value)) ? 'Invalid email' : undefined;
const street = value => (value && !value.match(/^[0-9]+ .+$/)) ?
  'The street must be a number followed by a name' : undefined;

const ContactForm = ({id, handleSubmit, onSave, saveContact, reset}) => {
  const doSave = (data) => {
    saveContact(data);
    onSave();
  };
  return (
    <form onSubmit={handleSubmit(doSave)}>
      <Field component={TextField} floatingLabelText="Contact Id" name="id"
        hintText="Unique identifier" fullWidth={true}
        validate={[required, identifier]} disabled={id !== undefined}/><br/>
      <Field component={TextField} floatingLabelText="Name" name="name"
        validate={[required]} hintText="Full name" fullWidth={true}/><br/>
      <Field component={TextField} floatingLabelText="Company" name="company"
        hintText="Company name" fullWidth={true}/><br/>
      <Field component={TextField} floatingLabelText="Email" name="email"
        hintText="Email address" fullWidth={true} validate={[email]}/><br/>
      <Field component={TextField} floatingLabelText="Phone" name="phone"
        hintText="Primary phone number" fullWidth={true}/><br/>
      <div className={style.addressFields}>
        <Field component={TextField} floatingLabelText="Street" name="street"
          hintText="Street name" fullWidth={true} style={{flex: 4}}
          validate={[street]}/><br/>
        <Field component={TextField} floatingLabelText="City" name="city"
          hintText="City or town" fullWidth={true} style={{flex: 2}}
          validate={[required]}/><br/>
        <Field component={TextField} floatingLabelText="State" name="state"
          hintText="State or region name" fullWidth={true} style={{flex: 2}}/><br/>
        <Field component={TextField} floatingLabelText="Zip" name="zip"
          hintText="Zip or post code" fullWidth={true} style={{flex: 1}}/><br/>
      </div>
      <Field component={DatePicker} name="dob" locale="en-US" format={null}
        hintText="Date of birth"/><br/>
      <Field component={TextField} floatingLabelText="Notes" name="notes"
        hintText="Any pertinent notes" fullWidth={true}/><br/>

      <RaisedButton label="Save" primary={true} type="submit"
        className={style.button}/>
      <RaisedButton label="Cancel" secondary={true} onClick={() => {reset()}}
        className={style.button}/>
    </form>
  );
};

const ContactFormHoc = reduxForm({
  form: 'contactForm',
  enableReinitialize: true
})(ContactForm);

// TODO: remove ad-hoc scalar handling once client-side support arrives in
// <https://github.com/apollostack/apollo-client/issues/585>
const typedContact = (contact) => ({
  ...contact,
  dob: (contact.dob) ? new Date(contact.dob) : null
});

export default connect(
  (state, ownProps) => ({
    initialValues: typedContact(ownProps.data.contact || {})
  })
)(ContactFormHoc);
