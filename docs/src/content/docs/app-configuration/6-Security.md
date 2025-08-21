---

title: Security & Auth Providers

---

Shadcn-Admin-Kit supports both authentication and authorization, allowing you to secure your admin app with your preferred authentication strategy. Since there are many strategies (e.g., OAuth, MFA, passwordless, magic link), shadcn-admin-kit delegates this logic to an authProvider.

This documentation will explain the following concepts:

- [The `authProvider` and its methods](#the-authprovider)
- [How to set up an `authProvider` in your application](#setup)
- [Available auth providers for popular authentication backends](#supported-auth-backends)
- [How to implement access control using the `authProvider`](#access-control)

## The `authProvider`

The `authProvider` acts as a bridge between shadcn-admin-kit and the authentication backend.

An Auth Provider must implement the following methods:

```jsx
const authProvider = {
    // Send username and password to the auth server and get back credentials
    async login(params) {/** ... **/},
    // Check if an error from the dataProvider indicates an authentication issue
    async checkError(error) {/** ... **/},
    // Verify that the user's credentials are still valid during navigation
    async checkAuth(params) {/** ... **/},
    // Remove local credentials and notify the auth server of the logout
    async logout() {/** ... **/},
    // Retrieve the user's profile
    async getIdentity() {/** ... **/},
    // (Optional) Check if the user has permission for a specific action on a resource
    async canAccess() {/** ... **/},
};
```

You can use an existing Auth Provider from the List of Available Auth Providers or create your own.

## Setup

Once you set an `<Admin authProvider>`, shadcn-admin-kit enables authentication automatically. For example, to use Auth0, you can set up the `authProvider` like this:

```js
import { BrowserRouter } from 'react-router';
import { Auth0AuthProvider } from 'ra-auth-auth0';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { Admin } from '@/components/admin';

const auth0 = new Auth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    cacheLocation: 'localstorage',
    authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
});

const authProvider = Auth0AuthProvider(auth0, {
    loginRedirectUri: import.meta.env.VITE_LOGIN_REDIRECT_URL,
    logoutRedirectUri: import.meta.env.VITE_LOGOUT_REDIRECT_URL,
});

const App = () => (
    <BrowserRouter>
        <Admin authProvider={authProvider}>
            ...
        </Admin>
    </BrowserRouter>
);
```

Now, every page that requires authentication will redirect the user to the login page if they are not authenticated. After successful login, the user will be redirected back to the page they were trying to access.

Check out the [Auth Provider Setup](https://marmelab.com/react-admin/Authentication.html) documentation for more details about sending credentials to the API, allowing anonymous access to certain pages, handling refresh tokens, and more. 

## Supported Auth Backends

The community has built a few open-source Auth Providers that may fit your need:

- <img src="/shadcn-admin-kit/docs/images/backend-logos/appwrite.svg" title="Appwrite Logo" style="width:16px;height:16px;"/> **[Appwrite](https://appwrite.io/)**: [marmelab/ra-appwrite](https://github.com/marmelab/ra-appwrite)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/auth0.svg" title="auth0 Logo" style="width:16px;height:16px;"/> **[Auth0 by Okta](https://auth0.com/)**: [marmelab/ra-auth-auth0](https://github.com/marmelab/ra-auth-auth0/blob/main/packages/ra-auth-auth0/Readme.md)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/amplify.svg" title="amplify Logo" style="width:16px;height:16px;"/> **[AWS Amplify](https://docs.amplify.aws)**: [MrHertal/react-admin-amplify](https://github.com/MrHertal/react-admin-amplify)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/aws.png" title="cognito Logo" style="width:16px;height:16px;"/> **[AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/setting-up-the-javascript-sdk.html)**: [marmelab/ra-auth-cognito](https://github.com/marmelab/ra-auth-cognito/blob/main/packages/ra-auth-cognito/Readme.md)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/microsoft.svg" title="azure Logo" style="width:16px;height:16px;"/> **[Microsoft Entra ID (using MSAL)](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser)**: [marmelab/ra-auth-msal](https://github.com/marmelab/ra-auth-msal/blob/main/packages/ra-auth-msal/Readme.md) ([Tutorial](https://marmelab.com/blog/2023/09/13/active-directory-integration-tutorial.html))
- <img src="/shadcn-admin-kit/docs/images/backend-logos/casdoor.svg" title="casdoor Logo" style="width:16px;height:16px;"/> **[Casdoor](https://casdoor.com/)**: [NMB-Lab/reactadmin-casdoor-authprovider](https://github.com/NMB-Lab/reactadmin-casdoor-authprovider)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/directus.svg" title="directus Logo" style="width:16px;height:16px;"/> **[Directus](https://directus.io/)**: [marmelab/ra-directus](https://github.com/marmelab/ra-directus/blob/main/packages/ra-directus/Readme.md)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/firebase.png" title="firebase Logo" style="width:16px;height:16px;"/> **[Firebase Auth (Google, Facebook, GitHub, etc.)](https://firebase.google.com/docs/auth/web/firebaseui)**: [benwinding/react-admin-firebase](https://github.com/benwinding/react-admin-firebase#auth-provider)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/google.svg" title="google Logo" style="width:16px;height:16px;"/> **[Google Identity & Google Workspace](https://developers.google.com/identity/gsi/web/guides/overview)**: [marmelab/ra-auth-google](https://github.com/marmelab/ra-auth-google/blob/main/packages/ra-auth-google/Readme.md)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/keycloak.svg" title="keycloak Logo" style="width:16px;height:16px;"/> **[Keycloak](https://www.keycloak.org/)**: [marmelab/ra-keycloak](https://github.com/marmelab/ra-keycloak/blob/main/packages/ra-keycloak/Readme.md)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/loopback4.svg" title="loopback Logo" style="width:16px;height:16px;"/> **[Loopback](https://loopback.io/doc/en/lb4/Authentication-overview.html)**: [appsmith dev.to tutorial](https://dev.to/appsmith/building-an-admin-dashboard-with-react-admin-86i#adding-authentication-to-reactadmin)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/openid.svg" title="openid Logo" style="width:16px;height:16px;"/> **[OpenID Connect (OIDC)](https://openid.net/connect/)**: [marmelab/ra-example-oauth](https://github.com/marmelab/ra-example-oauth)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/supabase.svg" title="supabase Logo" style="width:16px;height:16px;"/> **[Supabase](https://supabase.io/)**: [marmelab/ra-supabase](https://github.com/marmelab/ra-supabase/blob/main/packages/ra-supabase/README.md)
- <img src="/shadcn-admin-kit/docs/images/backend-logos/surrealdb.svg" title="surrealdb Logo" style="width:16px;height:16px;"/> **[SurrealDB](https://surrealdb.com/)**: [djedi23/ra-surrealdb](https://github.com/djedi23/ra-surrealdb)

If you need to use an auth backend that isn't listed here, you can create your own authProvider by implementing the methods described above. Check out the [Writing an Auth Provider](https://marmelab.com/react-admin/AuthProviderWriting.html) guide for more details.

## Access Control

Once a user is authenticated, your application may need to check if the user has the right to access a specific resource or perform a particular action.

With Access Control, the `authProvider` is responsible for checking if the user can access a specific resource or perform a particular action. This flexibility allows you to implement various authorization strategies, such as:

- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Access Control List (ACL).

Use the `authProvider` to integrate shadcn-admin-kit with popular authorization solutions like Okta, Casbin, Cerbos, and more.

To use Access Control, the `authProvider` must implement a `canAccess` method with the following signature:

```jsx
type CanAccessParams = {
    action: string;
    resource: string;
    record?: any;
};

async function canAccess(params: CanAccessParams): Promise<boolean>;
```

React components will use this method to determine if the current user can perform an action (e.g., “read”, “update”, “delete”) on a particular resource (e.g., “posts”, “posts.title”, etc.) and optionally on a specific record (to implement record-level permissions).

For example, let’s assume that the application receives a list of authorized resources on login. The `authProvider` would look like this:

```jsx
const authProvider = {
    async login({ username, password }) {
        // ...
        const permissions = await fetchPermissions();
        // permissions look like 
        // ['posts', 'comments', 'users']
        localStorage.setItem('permissions', JSON.stringify(permissions));
    },
    async logout() {
        // ...
        localStorage.removeItem('permissions');
    },
    async canAccess({ resource }) {
        const permissions = JSON.parse(localStorage.getItem('permissions'));
        return permissions.some(p => p.resource === resource);
    },
};
```

`canAccess` can be asynchronous, so if the `authProvider` needs to fetch the permissions from a server or refresh a token, it can return a promise.

**Tip**: Shadcn-admin-kit calls `dataProvider.canAccess()` before rendering all page components, so if the call is slow, user navigation may be delayed. If you can, fetch user permissions on login and store them locally to keep access control fast.

The page components (`<List>`, `<Create>`, `<Edit>`, and `<Show>`) have built-in access control. Before rendering them, shadcn-admin-kit calls `authProvider.canAccess()` with the appropriate action and resource parameters.

```jsx
<Resource
    name="posts"
    // available if canAccess({ action: 'list', resource: 'posts' }) returns true
    list={PostList}
    // available if canAccess({ action: 'create', resource: 'posts' }) returns true
    create={PostCreate}
    // available if canAccess({ action: 'edit', resource: 'posts' }) returns true
    edit={PostEdit}
    // available if canAccess({ action: 'show', resource: 'posts' }) returns true
    show={PostShow}
/>
```

If the `authProvider` doesn’t implement the `canAccess` method, shadcn-admin-kit assumes the user can access all pages.

To learn more about implementing access control, check out the [Access Control Guide](https://marmelab.com/react-admin/Permissions.html).