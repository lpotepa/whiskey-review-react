const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

const env = process.env.REACT_APP_ENV || "development"

const hosts = {
  "development": "http://localhost:4000",
  "production": "https://whiskey-review-rails.herokuapp.com"
}

let backendHost = hosts[env]

export const BASE_URL = `${backendHost}/api/${apiVersion}`;
