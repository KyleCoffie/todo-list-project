import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
type Auth0ProviderWithNavigateProps = {
  children: any;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const domain = "dev-2psy3rgmsg2mpa0v.us.auth0.com";
  const clientId = "SZNS8fk76SijVwE4wfftq6fHaNjfKQly";
  const redirectUri = "http://localhost:5173/callback"; // make sure the port matches your server

  console.log("Auth0ProviderWithNavigate rendering");
  console.log("Domain:", domain);
  console.log("ClientId:", clientId);
  console.log("RedirectUri:", redirectUri);

  const onRedirectCallback = (appState: any) => {
    console.log("onRedirectCallback called", appState);
    console.log("appState:", appState);
    navigate("/"); // Always redirect to the root route after login
    console.log("Navigating to: /");
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
        audience: "https://dev-2psy3rgmsg2mpa0v.us.auth0.com/api/v2/",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

console.log("Auth0ProviderWithNavigate rendered");

export default Auth0ProviderWithNavigate;

// 1. Imports:

// import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// React: React is imported to work with JSX and create functional components.
// Auth0Provider: This is the primary Auth0 provider that gives access to the authentication context. It provides the necessary context for managing authentication and user sessions.
// useNavigate from react-router-dom: This hook is used to navigate programmatically in React Router. In this case, it's used for handling redirects after authentication.


// 2. Auth0ProviderWithNavigateProps Type Definition:

// type Auth0ProviderWithNavigateProps = {
//   children: any;
// };
// This type defines the expected props for the Auth0ProviderWithNavigate component.
// children is expected to be any React element (components wrapped inside this provider).

// 3. Auth0ProviderWithNavigate Component:

// const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
//   children,
// }) => {
//   const navigate = useNavigate();
//   const domain = "your_domain_from_auth0_application_dashboard";
//   const clientId = "client_id_from_auto0_application_dashboard";
//   const redirectUri = "http://localhost:5173/callback"; // ensure this matches your server port and protocol
// useNavigate: A hook from react-router-dom that gives the ability to navigate programmatically.
// It's used here to redirect users after they successfully log in or log out.
// domain: This is the Auth0 domain that identifies your application (e.g., dev-abc123.auth0.com). You get this from your Auth0 dashboard.
// clientId: The client ID is a unique identifier for your Auth0 application, also available in the Auth0 dashboard.
// redirectUri: After authentication, users are redirected to this URL. It must match the URL configured in the Auth0 application settings to prevent errors.  Make sure the port and protocol match up to your React server


// 4. Redirect Callback Function:

// const onRedirectCallback = (appState: any) => {
//     navigate((appState && appState.returnTo) || window.location.pathname);
// };
// This function handles the redirect after a successful login. Auth0 uses onRedirectCallback to define what happens once the user returns from the Auth0 login page.
// appState.returnTo: After a successful login, the app may redirect the user to a specific page (e.g., a protected resource). If appState.returnTo is not available, it falls back to the current URL (window.location.pathname).


// 5. Conditional Rendering for Missing Config:

// if (!(domain && clientId && redirectUri)) {
//     return null;
// }
// This checks if the domain, clientId, and redirectUri are defined. If any of them are missing, it returns null, meaning the component won't render the Auth0Provider without proper configuration. It's a safeguard to prevent rendering the provider with incomplete Auth0 setup.


// 6. Rendering Auth0Provider:

// return (
//   <Auth0Provider
//     domain={domain}
//     clientId={clientId}
//     authorizationParams={{
//       redirect_uri: redirectUri,
//       scope: "openid profile email",
//     }}
//     onRedirectCallback={onRedirectCallback}
//     cacheLocation="localstorage"
//   >
//     {children}
//   </Auth0Provider>
// );
// <Auth0Provider>: This component is the key provider that integrates Auth0 into the React application.
// domain: The Auth0 domain for the application.
// clientId: The client ID of the Auth0 application.
// authorizationParams: These parameters define what information is requested from Auth0 during the authentication process. The redirect_uri is the URL where users will be redirected after login.
// scope: Specifies which user data the app wants. In this case, it's requesting openid (basic authentication), profile (user profile), and email (email information).
// onRedirectCallback: The callback function triggered after a successful redirect (used for navigation after login).
// cacheLocation="localstorage": This setting tells Auth0 where to store the authentication tokens. localstorage ensures that tokens persist across page reloads.

// 7. Returning the Wrapped Components:

// {children}
// {children}: This renders the child components passed to Auth0ProviderWithNavigate. This allows you to wrap the entire app with the Auth0 context, providing authentication features to any component within the app.


// DOUBLE CHECK: Make sure to put in your information from the Auth0 website:

// domain - found under the settings tab in the Auto0 dashboard
// clientId - found under the settings tab in the Auto0 dashboard
// redirectUri - this will be: http://localhost:5173/callback - make sure the port and protocol match up with your server
