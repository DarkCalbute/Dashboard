import axios from 'axios';
import { BASE_URL } from '../index.js';

export const authentificationService = {
    register,
    login,
    logout,
    unregister,
    isConnected
};

function register(email, username, password) {
    return axios.post(BASE_URL + '/account/signup', { email, username, password })
    .then(res => {
        if (res.status === 200) {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            window.location = '/home';
        }
    })
}

function login(user, password) {
    return axios.post(BASE_URL + '/account/signin', { user, password })
    .then(res => {
        if (res.status === 200) {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            window.location = '/home';
        }
    })
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location = '/signin';
}

function unregister() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    return axios.post(BASE_URL + '/account/delete', user)
    .then(res => {
        logout();
    })
}

function isConnected() {
    if (getCookie('user') !== '') {
        var data = {
            id: '0',
            username: getCookie('user'),
            email: 'ko',
            password: 'ko'
        }
        localStorage.setItem('currentUser', JSON.stringify(data));
    }
    if (getCookie('AuthentificationWith') !== '') {
        localStorage.setItem('AuthentificationWith', getCookie('AuthentificationWith'));
    }
    if (!localStorage.getItem('currentUser')) {
        window.location = '/signin';
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}