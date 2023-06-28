import jwtDecode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const API_URL = process.env.REACT_APP_BASE_URL;

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getUser = () => {
	const token = getAccessToken();
	if (!token) {
		return null;
	}
	return getUserFromToken(token);
};

export const login = async (username, password) => {
	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	});
	if (response.ok) {
		const { token } = await response.json();
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
		return username;
	}
	return null;
};

export const logout = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
};

const getUserFromToken = (token) => {
	const jwtPayload = jwtDecode(token);
	return jwtPayload.sub;
};
