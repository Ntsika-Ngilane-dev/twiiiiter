# Twiiiiter

Twiiiiter is a polished social-feed-style React app built with Vite, React Router, and local browser storage. It includes a home timeline, explore, notifications, messages, bookmarks, profile, sign-up/login, post creation, image uploads, and a responsive sidebar.

## Features
- Responsive timeline-style layout inspired by modern social apps
- Multi-page navigation for Home, Explore, Notifications, Messages, Bookmarks, and Profile
- Sign-up and login flow with saved account data
- Create posts with optional image attachments
- Auto-save for draft text and the signed-in user
- Collapsible sidebar and profile photo support

## How to use
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app locally:
   ```bash
   npm run dev
   ```
3. Open the local URL shown by Vite in your browser.
4. Sign up or log in, then:
   - create a post from the home feed
   - upload an image with your post
   - view your profile and photo
   - explore the other pages from the sidebar

## Development commands
- Run locally:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Run tests:
  ```bash
  npm test
  ```

## Host on Netlify
This is a Vite React app, so Netlify deployment is straightforward.

### Option 1: Deploy from the Netlify website
1. Push the project to GitHub.
2. Open Netlify and choose New site from Git.
3. Select your GitHub repository.
4. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click Deploy Site.

### Option 2: Deploy with Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify login
netlify deploy --prod --dir=dist
```

### Important note for React Router
Because this app uses client-side routing, Netlify needs a redirect rule so pages like `/profile` or `/notifications` work when refreshed.
A redirect file has been added at `public/_redirects` with:
```text
/* /index.html 200
```

## Project structure
- `src/` — app components, pages, and styles
- `public/` — static files and Netlify redirect rules
- `dist/` — generated production build output
