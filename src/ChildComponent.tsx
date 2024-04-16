import React, { useEffect } from 'react';

interface Props {
  callback: () => void;
}

const ChildComponent: React.FC<Props> = ({ callback }) => {
  useEffect(() => {
    // Call the callback function when the component mounts
    callback();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, []); // Dependency array to ensure the effect runs when the callback changes

  return (
    <div>
      <h2>Child Component</h2>
      {/* Child component content */}
    </div>
  );
};

export default ChildComponent;
