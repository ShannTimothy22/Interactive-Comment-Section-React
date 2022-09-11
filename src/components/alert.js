import React from "react";
import { useEffect } from "react";

const Alert = ({ removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
      <p className="alert">Please Insert Value</p>
    </div>
  );
};

export default Alert;
