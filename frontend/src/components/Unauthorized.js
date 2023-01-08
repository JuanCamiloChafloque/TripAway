import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => --current);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default Unauthorized;
