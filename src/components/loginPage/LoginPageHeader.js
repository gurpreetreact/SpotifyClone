import React from 'react';
import styled from 'styled-components';
import SpotifyLogo from '../assets/images/svg/logo.svg';
import {loginURI} from '../../ContextAPI/spotify';


function LoginPageHeader() {
	return (
		<LoginPageHeaderContainer>
			<InsideContainer style={{ flex: 2 }} />
			<InsideContainer>
				<LeftHeaderContainer>
					<HeaderLogo src={SpotifyLogo} />
				</LeftHeaderContainer>
				<RightHeaderContainer>
					<HyperLinks>Premium</HyperLinks>
					<HyperLinks>Support</HyperLinks>
					<HyperLinks style={{margin: '21px 0 21px 12px'}}>Download</HyperLinks>
					<Separator />
					<SpotifyLoginLink href={loginURI}>Login with Spotify </SpotifyLoginLink>
				</RightHeaderContainer>
			</InsideContainer>
			<InsideContainer style={{ flex: 2 }} />
		</LoginPageHeaderContainer>
	);
}

const LoginPageHeaderContainer = styled.div`
	display: flex;
  background-color: #000;
	text-align: center;
`;
const HeaderLogo = styled.img`
  height: 65px;
`;
const InsideContainer = styled.div`
	flex: 6;
	height: 75px;
	align-items: center;
	display: flex;
	justify-content: space-between;
`;
const LeftHeaderContainer = styled.div`
`;
const RightHeaderContainer = styled.div`
	color: white;
	display: flex;
	align-items: center;
`;

const HyperLinks = styled.a`
	margin: 21px 12px;
	font-weight: 500;

	&:hover {
		color: #1ED760;
		cursor: pointer;
	}
`;
const Separator = styled.div`
height: 16px;
width: 1px;
background-color: white;
margin: 22px;	
`;
const SpotifyLoginLink = styled.a`
	padding: 16px 18px;
	background-color: #1ED760;
	border-radius: 99px;
	height: 14px;	
	color: inherit;
	text-transform: uppercase;
	text-decoration: none;
	font-size: 14px;
  font-weight: 800;

	&:hover {
		cursor: pointer;
		text-decoration: none;
	}
`;

export default LoginPageHeader;