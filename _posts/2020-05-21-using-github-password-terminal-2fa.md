---
layout: post
title: Using GitHub password in terminal when 2FA is ON
image: /cdn/github-password-2fa.png
categories: [GitHub]
---

If you're using GitHub repository's web URL as its remote and if you've [two-factor authentication](https://help.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa) turned on for your account, you're going to face an issue in authenticating your account while doing certain git actions such as `git push`.

For instance, for my project [Pomolectron](https://github.com/amitmerchant1990/pomolectron), I'm using its web URL (*https://github.com/amitmerchant1990/pomolectron.git*) as its remote. And now if I want to push something to the repository, I'd be asked to enter my username and password to do so. 

But upon entering my GitHub password, I get the following error where it states *"remote: Invalid username or password."*.

![](/images/github-authentication-error.png)

That is because I've two-factor authentication enabled for my account. So, I can not use my GitHub account's master password alone to authenticate my account.

### Authentication using Personal Access Tokens

To authenticate in this kind of scenario, you'll need to use a Personal Access Token which you can generate from your account's settings.

- Goto your [Account Settings](https://github.com/settings/profile).
- Then click [Developer settings](https://github.com/settings/apps).
- In the left sidebar, click [Personal access tokens](https://github.com/settings/tokens).
- Click **Generate new token**.
  
![](/images/generate_new_token.png)

- Give your token a descriptive name.
  
![](/images/token_description.png)

- Select the scopes, or permissions, you'd like to grant this token. To use your token to access repositories from the command line, select repo.
![](/images/token_scopes.gif)

- Click **Generate token**.

- Copy the generated token. For security reasons, after you navigate off the page, you will not be able to see the token again.

![](/images/personal_access_tokens.png)

Now, you can use this Personal Access Token as your password in the terminal by pasting it on the password prompt and you'll be authenticated successfully!

