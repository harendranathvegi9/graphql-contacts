import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn} from 'material-ui/Table';

const ContactsList = ({data, onSelectionChange}) => {
  const onRowSelection = (rows) => {
    if (rows.length > 0) {
      onSelectionChange(data.contacts[rows[0]].id);
    }
  };

  return (
    <Table onRowSelection={onRowSelection}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>City</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        {
          data.contacts.map(contact => (
            <TableRow key={contact.id}>
              <TableRowColumn>{contact.name}</TableRowColumn>
              <TableRowColumn>{contact.city}</TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default ContactsList;
