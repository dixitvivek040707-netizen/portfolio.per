# Vivek Dixit — Portfolio

A responsive, single-page developer portfolio built with semantic HTML, CSS, and vanilla JavaScript. It has no build step and is ready to import into Vercel as a static site.

## Project structure

```text
.
├── index.html
├── style.css
├── theme.css
├── script.js
├── assets/
│   ├── icons/favicon.svg
│   ├── images/IMG_3189.HEIC
│   ├── images/vivek-dixit.jpg
│   └── resume.pdf
└── README.md
```

## Personalize the site

1. **Profile photo:** The supplied `IMG_3189.HEIC` is in `assets/images/` and is used where the browser supports HEIC. `assets/images/vivek-dixit.jpg` is the web-compatible fallback. Both are displayed in black and white by the `.portrait-frame img` rule in `style.css`. Replace the files and update the alt text in the `.portrait-frame` in `index.html` if you choose another photo.
2. **Resume:** Replace `assets/resume.pdf` with the final PDF, keeping that filename so both resume links continue to work.
3. **Projects:** Open `script.js` and add verified project objects to the `projects` array. Each object can contain `title`, `description`, `technologies` (array), `contribution`, `image`, `imageAlt`, `demo`, and `source`. Keep `demo` and `source` blank until those URLs work. The empty portfolio state is intentional until actual projects are ready.
4. **Skills and biography:** Edit the About and Skills sections in `index.html`; only list skills and current learning that you can verify.
5. **Social URLs and email:** Search `index.html` for the existing GitHub, LinkedIn, Instagram, and email links and update them together if they change. External links already open safely in a new tab.
6. **Experience and education:** Add those sections to `index.html` only when you have details to publish.
7. **Brand colors and sizing:** Change the CSS custom properties at the top of `style.css`.
8. **Visual style:** `theme.css` contains the warm black, ivory, and orange editorial theme and responsive hero styling; `style.css` contains the base layout, components, and accessibility styles.
9. **SEO:** Add your live site's canonical URL after a domain is chosen. Update the page description and Open Graph metadata in `index.html` if you revise the site's positioning.

## EmailJS contact form

The site uses EmailJS in the browser, so it does not need a backend. The Service ID, Template ID, and Public Key supplied for this site are set in `script.js`. A Public Key is intended for browser use; never place a private key, Gmail password, or OAuth token in this repository. EmailJS should be connected to Gmail using its supported account connection flow.

1. Create an account at [EmailJS](https://www.emailjs.com/) and verify your account.
2. In **Email Services**, add a service and connect Gmail through EmailJS's provider flow. Complete Google's authorization screen yourself. Never share a Gmail password or OAuth credential.
3. In **Email Templates**, create a contact template. Set **To Email** to `dixitvivek040707@gmail.com`, **From Name** to `{{name}}`, **Reply-To** to `{{email}}`, and **Subject** to `Portfolio contact: {{subject}}`.
4. Use this template body (or equivalent):

   ```text
   New portfolio message

   From: {{name}}
   Email: {{email}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```

5. Save the template and use its Template ID. In the connected service's settings, copy the Service ID. Find the Public Key on the EmailJS Account page.
6. In `script.js`, edit `EMAILJS_CONFIG` if you replace any of the IDs. The current values are the IDs supplied for this portfolio. In `index.html`, the contact form field names (`name`, `email`, `subject`, `message`) must match the template variables.
7. Publish the site, then send one successful test using an email address you can access. Confirm the email arrives in Gmail and that Reply replies to the sender. Also test invalid required fields, an invalid email, and a temporary EmailJS failure; the page should show validation or error feedback and must not show its success message. Check spam if a confirmed submission is missing.

The form displays success only when the EmailJS request resolves successfully. This source has not been connected to or tested against your EmailJS account yet, so delivery depends on the service and template configuration above.

References: [EmailJS contact form tutorial](https://www.emailjs.com/docs/tutorial/creating-contact-form/), [sendForm SDK reference](https://www.emailjs.com/docs/sdk/send-form/), [template variables](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/).

## Deploy to GitHub and Vercel

1. Create an empty GitHub repository. In a terminal opened in this project folder, run:

   ```sh
   git init -b main
   git add index.html style.css theme.css script.js README.md assets
   git commit -m "Build Vivek Dixit portfolio"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

   Replace the remote URL with the repository URL GitHub gives you. If this folder already has a Git repository, skip `git init` and use its existing remote/branch workflow. Do not commit private credentials; the current EmailJS Public Key is designed for client use.
2. Sign in to [Vercel](https://vercel.com/), choose **Add New → Project**, import the GitHub repository, and deploy. For this plain static site, use the project root, no build command, and `.` as the output directory (or leave the framework preset as Other and let Vercel serve the root `index.html`).
3. After deployment, open the Vercel URL and check the desktop and mobile layout, links, resume download, and form behavior.
4. To use a GoDaddy domain, add the domain under the Vercel project's **Settings → Domains**. Use the DNS records Vercel shows for that exact domain and configure them in GoDaddy DNS. Remove conflicting records only after comparing the current records with Vercel's instructions. Wait for DNS verification; Vercel provisions HTTPS after the domain is configured.
5. A backend is not used, so no server environment variables are needed. The EmailJS browser configuration is in `script.js`.
6. Repeat the contact form delivery and failure tests against the deployed domain, since EmailJS account restrictions or allowed-origin settings can differ from local preview.

## Before sharing

- Replace the illustrated portrait with your actual photo if you want a photograph.
- Review the resume PDF and verify the provided contact and social details.
- Add only real project cards, live demo/source links, learning goals, experience, and education.
- Test keyboard navigation, reduced-motion mode, narrow mobile widths, all external links, and the PDF download.
- Configure the EmailJS template and verify delivery and Reply-To from the deployed domain. This repository alone does not confirm Gmail delivery.
