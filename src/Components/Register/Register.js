import React from 'react';
import maintenance from '../../assets/maintenance.png';

const Register = () => {
  return (
    <div className="maintenance-page">
      <img src={maintenance} alt="page under maintenance"></img>
      <p>
        🚧 Under maintenance
        <br />
        🖐 We should be back shortly
      </p>
    </div>
  );
};

export default Register;
