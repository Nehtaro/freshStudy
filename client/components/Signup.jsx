import React, { useState } from 'react';
import Oauth from './Oauth';

const Signup = ({
  register,
  handleToggle,
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && username && password) register({ email, username, password });
  };
  return (
    <>
      <div>
        <form id="register" onSubmit={handleSubmit}>
          <label>
            <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
      <div style={{ marginTop: '20px',
                    width: '100%',
                    textAlign: 'center'
                    }}>Or,
        <Oauth />
      </div>
      <div style={{ marginTop: '40px',
                    width: '100%',
                    textAlign: 'center'
                    }}>Already have an account?
        <button type="button" onClick={handleToggle}>Login Here!</button>
      </div>
    </>
  );
};

export default Signup;
