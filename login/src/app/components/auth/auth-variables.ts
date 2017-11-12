interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    clientID: '3dNEnLJEC32V2gruMtmUZuur2jhXo3v3',
    domain: 'appmean.eu.auth0.com',
    callbackURL: 'http://localhost:4200/clients'
  };
  