import React from 'react';

const responseType = 'code';
const OAUTH_CLIENT_ID = '711651127971-t90e5r7504tvdgf2mh17bp7a9a46dnff.apps.googleusercontent.com';
const redirectUri = 'http://localhost:3000/oauthcallback';
const scope = 'profile email openid';
const consentLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline&include_granted_scopes=true`;

const Oauth = () => {
  return (
    <a href={consentLink}><button>Sign Up with your Google Account!</button></a>
  )
};

export default Oauth;
