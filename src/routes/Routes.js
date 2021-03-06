/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cryptr from 'cryptr';
import SpotifyWebApi from 'spotify-web-api-js';

import { fetchTokenFromURI } from '../ContextAPI/spotify';
import { useStateProvider } from '../ContextAPI/Provider';
import { actionTypes } from '../ContextAPI/reducer';
import LoginPage from '../components/loginPage/LoginPage';
import PlayerPage from '../components/userPage/PlayerPage';


// Without 'new', it won't work. We've to make it run time.
const spotify = new SpotifyWebApi();

function Routes() {
	const [{}, dispatch] = useStateProvider();

	const [token, setToken] = useState('');
	const _hash = fetchTokenFromURI();

	// Created an instance to encrypt access token coming from spotify # value.
	const cryptr = new Cryptr('accessToken');

	useEffect(() => {
		if (_hash) {
			console.log('_hash', _hash);
			localStorage.setItem('access_token', cryptr.encrypt((_hash.access_token).toString()));
		}
		console.log('sportify ', spotify);
		if(localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== undefined){
			spotify.setAccessToken(cryptr.decrypt(localStorage.getItem('access_token')));
			spotify.getMe().then(user => dispatch({
				type: actionTypes.SET_USER,
				user: user
			}));
		}
		setToken(localStorage.getItem('access_token'));
	}, []);


	return (
		<Switch>
			{token === undefined || token === null ? (
				<>
					{/* Can't do redirect because if I do this, it will clear the URI which will result in*/}
					{/* no hash value at first place. This will end up a person redirect to "/" path and  */}
					{/*  the local storage will forever be empty as item (from spotify.js) will always be "". */}
					{/* <Redirect to="/" component={PlayerPage} /> */}

					{/* Now I am depending this redirect URL on the _hash value which I fetched from  */}
					{/* the URL of spotify. This will ensure clean redirection only when localStorage "access_token" */}
					{/* and  _hash from here (which WILL be null on page reload) are null */}
					{!_hash && <Redirect to="/" component={LoginPage} />}

					<Route exact path="/" component={LoginPage} />
				</>
			) : (
				<>
					<Redirect to="/user" component={PlayerPage} />
					<Route path="/user" component={PlayerPage} />
				</>
			)}
		</Switch>
	);
}

export default Routes;
