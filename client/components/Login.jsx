import React, { useState } from 'react';


const Login = ({
  login,
  handleToggle,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) login(username, password);
  };
  return (
    <>
      <div>
        <form id="login" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div style={{ marginTop: '40px',
                    width: '100%',
                    textAlign: 'center'
                    }}>Don't have an account?
        <button type="button" onClick={handleToggle}>Create Account Here!</button>
      </div>
      </>
  );
};

export default Login;
