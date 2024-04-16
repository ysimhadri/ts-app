import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent: React.FC = () => {
  // Define the callback function
  const myCallback = () => {
    console.log('Callback function called from ChildComponent');
    // Other callback logic
    alert('Call back from child');
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent callback={myCallback} />
    </div>
  );
};

export default ParentComponent;
