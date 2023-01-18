<h1 align="center">Next Password Safe</h1>
<h3 align="center">A secure safe for your passwords</h3>
<p align="center">
  Made with<br>
  <img align="center" src="https://camo.githubusercontent.com/8552f38715af0ea9f364801b055f7a2448812b49075860983d53a81414349623/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4e6578742e6a7326636f6c6f723d303030303030266c6f676f3d4e6578742e6a73266c6f676f436f6c6f723d464646464646266c6162656c3d">
  <img align="center" src="https://img.shields.io/static/v1?style=for-the-badge&message=Playwright&color=2EAD33&logo=Playwright&logoColor=FFFFFF&label=">
  <img align="center" src="https://camo.githubusercontent.com/eb3676422a9e186ce18237e6c1ffee703068f7850c2a513b9a261f33ee335ed6/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4d6f6e676f444226636f6c6f723d343741323438266c6f676f3d4d6f6e676f4442266c6f676f436f6c6f723d464646464646266c6162656c3d">
  <img align="center" src="https://img.shields.io/static/v1?style=for-the-badge&message=Vercel&color=000000&logo=Vercel&logoColor=FFFFFF&label=">
</p>

## Description

<p>Our application for the school assignment, to make a password safe.

### Deployments
[![.github/workflows/playwright.yml](https://github.com/four-man-army/nextjs_password_safe/actions/workflows/playwright.yml/badge.svg)](https://github.com/four-man-army/nextjs_password_safe/actions/workflows/playwright.yml)
<p>
<ol>
  <li><a href="https://nextjs-password-safe.vercel.app/">Main production deployment</a></li>
  <li><a href="https://nextjs-password-safe-git-beta-four-man-army.vercel.app/">Beta preview deployment</a></li>
</ol>
</p>
<br>
Or just follow the instructions below to run your preferred branch.

## Getting Started

### Executing program
1. `npm install`
2. `npm run dev`


## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Documentation
### Folder structure
```bash
├── pages
│   ├── api
│   │   ├── auth
│   │   │   ├── [..nextauth].ts => NextAuth.js
│   │   ├── getVault.ts => Get vault from database
│   │   ├── setVault.ts => Post vault to database
│   │   ├── signup.ts => Signup user
│   ├── auth
│   │   ├── register.tsx => Register page
│   │   ├── signin.tsx => signin page
│   ├── _document.tsx
│   ├── _app.tsx
│   ├── index.tsx => Home page
│   ├── generate.tsx => Generate password page
│   ├── safe.tsx => Safe page

```

### Database
We use MongoDB as our database, and we use the Mongoose ODM to interact with it.

### Authentication
We use NextAuth.js for authentication, and we use MongoDB as our database for it.

### Testing
We use Playwright for testing, and we use Vercel for deployment.

### Reflexion

#### What went well
- We managed to get a working product in time
- We managed to get a working product with all the features we wanted
- We managed to get a working product with a good design
- We managed to get a working product with a good user experience
- We managed to get a working product with a good user interface

#### What went wrong
- We had some issues with the database, but we managed to fix it
- We had some issues with the authentication, but we managed to fix it
- We had some issues with the testing, but we managed to fix it
- We had some issues with the deployment, but we managed to fix it

#### What we learned
- We learned how to use Next.js
- We learned how to use NextAuth.js
- We learned how to use MongoDB







