# 要は

# Build 
Run `npm run build`

## Development
Use `npm run test` to fire up a nodemon server for development
Use `npm run production` to fire up a server for production test

git 

## Project structure
```
root/
├─ client/
│  ├─ main.js
│  ├─ index.html
│  ├─ js/
│  │
│  ├─ src/
│  │  ├─ App.vue
│  │  │
│  │  ├─ store/
│  │  │  ├─ index.js
│  │  │
│  │  ├─ components/
│  │  │  ├─ ArticleSubItems.vue
│  │  │  ├─ ClauseItems.vue
│  │  │  ├─ ContractInput.vue
│  │  │  ├─ ContractStruct.vue
│  │  │  ├─ MarkedText.vue
│  │  │
│  │  ├─ utils/
│  │  │  ├─ converter.js
│  │  │  ├─ http.js
│
├─ server/
│  ├─ summarizer/
│  │  ├─ summarizer.py
│  │
│  ├─ serverless/
│  │  ├─ preprocess.py
│  │  ├─ contract-peg-parser-ruby-bundle
│
├─ dist/ ## Bundle built by webpack
│
├─ node_modules/
├─ server.js
├─ package.json
├─ package-lock
├─ webpack.config.js
├─ .gitignore
├─ README.md
```
