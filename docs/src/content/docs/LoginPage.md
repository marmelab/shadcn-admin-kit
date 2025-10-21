---
title: "LoginPage"
---

When [Authentication](./Authentication.md) is enabled, users must log in to access the admin interface. The login page is displayed automatically when an unauthenticated user tries to access a protected route.

![Login page](./images/login.jpg)

## Usage

The default login page displays a form with an email and a password field. You can customize it by editing the `@/components/admin/login-page.tsx` file.

Here is an example of a simple custom login page:

```tsx title=@/components/admin/login-page.tsx
import { useState } from "react";
import { Form, required, useLogin, useNotify } from "ra-core";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/admin/text-input";

export const LoginPage = (props: { redirectTo?: string }) => {
  const { redirectTo } = props;
  const login = useLogin();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    login(values, redirectTo)
      .catch((error) =>
        setError(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message
        )
      );
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <TextInput source="email" type="email" validate={required()} />
            <TextInput source="password" type="password" validate={required()} >
            <Button type="submit" className="cursor-pointer">
                Sign in
            </Button>
        </Form>
    </div>
  );
};
```

`useLogin` calls `authProvider.login()`, which automatically handles redirection on success. On error, the error message is displayed above the form.

Alternatively, you can create your own login page component and pass it to the `<Admin>` component using the `loginPage` prop:

```tsx
import { Admin } from "@/components/admin";
import { LoginPage } from "@/components/login-page"; // Your custom login page    
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        ...
    </Admin>
);
```
