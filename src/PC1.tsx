import React, { useState } from 'react';
//import ChildComponent from './CC1';
import CC1 from './CC1';

const PC1: React.FC = () => {
  const [dataFromChild, setDataFromChild] = useState<string | null>(null);

  // Define the callback function to handle data from the child
  const handleChildData = (data: string) => {
    // Set the data received from the child component
    setDataFromChild(data);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <CC1 callback={handleChildData} />
      {dataFromChild && (
        <p>Data received from child: {dataFromChild}</p>
      )}
    </div>
  );
};

export default PC1;
