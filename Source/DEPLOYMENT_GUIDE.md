# How to Publish "Aura Interiors" 🚀

Your website is built with **Next.js**, which means the best and easiest way to make it public is using **Vercel** (the creators of Next.js).

Since your application passed the build check, it is ready to go!

## Step 1: Push to GitHub
You need to push your local code to a GitHub repository.

1.  **Create a new Repository** on [GitHub.com](https://github.com/new). Name it `aura-interiors`.
2.  **Open your terminal** (in VS Code or separately) and run these commands to push your code:

```bash
# 1. Add all your changes
git add .

# 2. Commit them
git commit -m "Ready for deployment"

# 3. Rename branch to main (if not already)
git branch -M main

# 4. Link to your new GitHub repo (Replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aura-interiors.git

# 5. Push the code
git push -u origin main
```

## Step 2: Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and **Sign Up / Log In** (you can use your GitHub account).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Import"** next to your `aura-interiors` repository.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (Should be auto-detected)
    *   **Root Directory**: `./` (Default)
    *   **Environment Variables**:
        *   If you want the "Contact Us" emails to actually work, you will need to add your SMTP details here (`SMTP_HOST`, `SMTP_USER`, etc.). If you skip this, the form will log to the console (Mock Mode).
5.  Click **Deploy**.

## Step 3: Success! 🎉
Vercel will build your site and give you a live URL (e.g., `aura-interiors.vercel.app`).
You can share this link with anyone!

---

### NOTE: Data Persistence
Since this is a demo app using **local JSON files** (`data/users.json`, etc.) for a database:
*   **On Vercel**, any changes made (like registering a new user) **will reset** whenever the app redeploys.
*   The file system on serverless platforms is ephemeral (temporary).
*   **For a real production app**, you would essentially swap the `lib/db.js` logic to use a real database like **MongoDB** or **PostgreSQL** (via Supabase or Neon).

But for showing off the design and functionality, this deployment will work perfectly!
