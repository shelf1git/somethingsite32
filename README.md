# Commerce Fest Registration

A polished, responsive school registration website for **Commerce Fest 2026**, built with React, Vite, TypeScript, and Tailwind CSS.

## Included

- Responsive editorial-style landing page and registration experience
- Required fields for school name, six editable category checkboxes, four short-answer details, one select question, and one team story question
- Required file upload with drag-and-drop support and a 10MB client-side size limit
- Accessible labels, visible focus states, keyboard-friendly controls, reduced-motion support, loading state, success state, and error toasts
- Optional `VITE_FORM_ENDPOINT` integration for a hosted form backend such as Formspree or a Vercel-compatible API endpoint
- Vercel configuration and GitHub-ready project structure

## Run locally

```bash
pnpm install
pnpm dev
```

Then open the local URL shown by Vite.

## Deploy to Vercel from GitHub

1. Create a GitHub repository and push this project.
2. In Vercel, choose **Add New → Project**, then import the GitHub repository.
3. Vercel should detect Vite automatically. Use the default settings:
   - Build command: `pnpm build`
   - Output directory: `dist/public`
   - Install command: `pnpm install`
4. Deploy.

## Form submissions and file uploads

This project is frontend-only by default. If `VITE_FORM_ENDPOINT` is not set, the form demonstrates the complete interaction locally and shows a success state, but it does not persist submissions.

For real submissions, set a Vercel environment variable named `VITE_FORM_ENDPOINT` to a multipart-capable endpoint. Formspree is a simple option: create a form, copy its endpoint, and add it in Vercel under **Project Settings → Environment Variables**. Redeploy after saving the variable.

```bash
# .env.local (local development only)
VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

The form sends `schoolName`, repeated `categories` values, `participants`, `coordinator`, `email`, `previousExperience`, `teamStory`, and `attachment` as multipart form data.

## Customize before launch

- Replace `Main auditorium · Your city` in `client/src/pages/Home.tsx` with the real venue.
- Replace `hello@commercefest.school` with the organizer email.
- Update the event date and any category names in the form copy.
- If you need submissions stored in your own database or cloud storage instead of a form provider, add a Vercel Function or upgrade the app to a backend-enabled stack.

## Build check

```bash
pnpm check
pnpm build
```

## License

MIT
