---
title: "LoginPage"
---

Custom login form using `useLogin` and `react-hook-form`.

## Usage

Passed to `Admin` via `loginPage` prop. Shows email/password fields and sends values to `authProvider.login`.

## Behavior

- Calls `useLogin` promise; on error displays translated notification.
- Shows loading state disabling submit button.
