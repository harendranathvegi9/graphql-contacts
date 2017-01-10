import React from 'react';

const emptyData = (Component) => (props) => (
  <Component data={{}} {...props}/>
);

export default emptyData;
