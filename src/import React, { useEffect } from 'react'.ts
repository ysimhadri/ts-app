import React, { useEffect } from 'react';

interface ChildProps {
  callback: (data: string) => void;
  initialData: string;
}

const ChildComponent: React.FC<ChildProps> = ({ callback, initialData }) => {
  useEffect(() => {
    // Simulating asynchronous operation (e.g., processing data)
    const processData = async () => {
      // Assuming some asynchronous operation
      const processedData = await processDataLocally(initialData);

      // Call the callback function with the processed data
      callback(processedData);
    };

    // Call the processData function when the component mounts
    processData();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, [callback, initialData]); // Dependency array to ensure the effect runs when the callback or initialData changes

  return (
    <div>
      <h2>Child Component</h2>
      {/* Child component content */}
    </div>
  );
};

// Dummy function to simulate processing data
const processDataLocally = async (data: string): Promise<string> => {
  // Simulate some data processing
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Processed: ${data}`);
    }, 1000);
  });
};

export default ChildComponent;
