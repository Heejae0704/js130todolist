# TODO (JS130) Code Repository

## How to start a new code repository

1. create a project folder and cd into it
2. `git init`
3. `npm init -y`
4. create `.gitignore` file
5. create `readme.md` file
6. `git add .`
7. `git commit -m "first commit"`
8. create a remote repository in github
9. `git remote add origin [address]`
10. `git push -u origin master`

## Regarding ESLint configuration

Probably because I am using `nvm`, I had to install babel-eslint locally to make `eslint` to work. You don't need to worry about `eslint-cli` which is also not working...

```shell
npm install eslint --save-dev
npm install babel-eslint --save-dev
```

Also you need to copy `.eslintrc.yml` from JS101 folder and put it in the project root folder.
