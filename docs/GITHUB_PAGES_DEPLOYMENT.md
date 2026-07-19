# GitHub Pages deployment and custom domain

## Create and push the repository

1. Create a new GitHub repository under `<YOUR_GITHUB_USERNAME>` without adding another README or template.
2. From this project, commit the verified files and add the repository remote:

   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY>.git
   git branch -M main
   git push -u origin main
   ```

3. Never commit `.env.local`, credentials, private keys or provider secrets.

## Enable Pages

Open the repository’s **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions**. Push to `main` or run **Actions → Deploy static site to GitHub Pages → Run workflow**.

The workflow installs with Node.js 20, lints, type-checks, builds the static export, verifies `out/index.html`, creates `out/.nojekyll`, uploads `out/` and deploys through the `github-pages` environment.

## Add the custom domain

In **Settings → Pages → Custom domain**, enter `buyfootball.store` and save. The Pages settings are authoritative. `public/CNAME` is included so the exported artifact also declares the domain.

After DNS is valid and GitHub confirms it, enable **Enforce HTTPS**. Do not force HTTPS prematurely if GitHub is still provisioning the certificate.

## DNS placeholders

Use the current values shown in GitHub’s official Pages custom-domain documentation and your repository settings. DNS records can change; verify them at setup time.

Typical structure:

- Apex `@`: GitHub Pages A records and, where supported, AAAA records provided by GitHub
- `www`: CNAME to `<YOUR_GITHUB_USERNAME>.github.io`
- Optional GitHub domain-verification TXT record: exact name/value issued in account or organization settings

Do not point the apex at a repository-path URL. Remove conflicting A, AAAA, ALIAS, ANAME, CNAME or forwarding records. A CNAME must not be placed directly at the apex unless the DNS provider implements supported flattening.

## Domain verification

Add `buyfootball.store` in GitHub account/organization **Settings → Pages → Verified domains**, then publish the exact TXT value GitHub provides. Verification helps prevent another repository under the same account scope from claiming a related domain. Retain the TXT record after success.

## Root-domain asset paths

This project intentionally has no `basePath` because the final URL is the root custom domain. Local assets use root paths such as `/images/...`. If deploying temporarily under `https://<YOUR_GITHUB_USERNAME>.github.io/<REPOSITORY>/`, those paths will not work correctly. Configure the custom root domain or add a repository-aware base-path strategy for that temporary environment.

## Troubleshooting

### Assets are 404

- Confirm the custom domain is attached and DNS resolves to GitHub Pages.
- Check filename case; GitHub Pages is case-sensitive.
- Confirm the asset exists in `out/images/` after build.
- Do not add a repository `basePath` for the final root domain.
- Inspect the latest workflow artifact rather than the source folder alone.

### A route is 404

- Confirm trailing-slash links are used.
- Verify `out/<route>/index.html` exists.
- For products/blog posts, ensure the slug exists and `generateStaticParams()` includes it.
- Rebuild after data changes.
- GitHub Pages cannot serve runtime routes or framework rewrites.

### Workflow fails

Open **Actions**, select the failed workflow and expand the first failing step. Fix lint/type/build errors locally with the same npm commands. Confirm `package-lock.json` is committed so `npm ci` can run.

### Custom domain or HTTPS remains pending

Check public DNS from multiple resolvers, remove conflicts, confirm the domain in Pages settings, verify no restrictive CAA record blocks certificate issuance and allow propagation time. Keep the repository public or confirm the plan supports private-repository Pages.
