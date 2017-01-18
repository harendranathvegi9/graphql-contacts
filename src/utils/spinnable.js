import React from 'react';
import Spinner from './spinner';

const spinnable = (Component) => (props) => {
  if (props.data.loading) {
    return (<Spinner/>);
  }
  else if (props.data.error) {
    console.error(props.data.error.message);
    return (<div/>);
  }

  return (<Component {...props}/>);
};

export default spinnable;
