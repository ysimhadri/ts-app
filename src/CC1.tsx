import React, { useEffect } from 'react';

interface ChildProps {
  callback: (data: string) => void;
}

const CC1: React.FC<ChildProps> = ({ callback }) => {
  useEffect(() => {
    // Simulating asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      // Assuming some asynchronous operation
      const fetchedData = await fetchDataFromAPI();
      
      // Call the callback function with the fetched data
      callback(fetchedData);
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, [callback]); // Dependency array to ensure the effect runs when the callback changes

  return (
    <div>
      <h2>Child Component</h2>
      {/* Child component content */}
    </div>
  );
};

// Dummy function to simulate fetching data
const fetchDataFromAPI = async (): Promise<string> => {
  // Simulate fetching data from an API
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('Fetched data from API and it is working');
    }, 1000);
  });
};

export default CC1;
