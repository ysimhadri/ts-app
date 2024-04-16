import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent: React.FC = () => {
  const [dataFromChild, setDataFromChild] = useState<string | null>(null);

  // Define the callback function to handle data from the child
  const handleChildData = (data: string) => {
    // Set the data received from the child component
    setDataFromChild(data);
  };

  // Define the initial data to be sent to the child component
  const initialData = "Initial Data from Parent";

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent callback={handleChildData} initialData={initialData} />
      {dataFromChild && (
        <p>Data received from child: {dataFromChild}</p>
      )}
    </div>
  );
};

export default ParentComponent;
