# Cocktail-Knight - Fullstack Application

- [Cocktail-Knight - Fullstack Application](#cocktail-knight---fullstack-application)
  - [Project Description](#project-description)
  - [Technology Stack](#technology-stack)
  - [Directory structure](#directory-structure)
  - [Files to add](#files-to-add)

## Project Description

**Cocktail-Knight** is a full-stack application designed to facilitate interactions among cocktail enthusiasts. Users can explore, share, and discuss cocktail recipes, enabling a vibrant community of like-minded individuals. This project aims to simplify recipe discovery and tailor user experiences by leveraging a responsive design and intuitive user interface.

## Technology Stack

- **Frontend**: React for dynamic user interfaces
- **Backend**: Node.js with Express for robust server management.
- **Database**: MongoDB for flexible document storage.
- **Deployment**: Initially deployed on Heroku, demonstrating cloud application management.

## Directory structure

```
.vscode/
frontend/
  build/
  public/
  src/
    components/
    styles/
  package.json
backend/
  bin/
  configs/
  models/
  passport/
  routes/
  app.js
  middlewares.js
  package.json
.gitignore
package.json
README.md
```

## Files to add

You should have a `backend/.env` file, with for example the following values:

```
PORT=5000
SESSION_SECRET=anyValue
MONGODB_URI=......
CLOUDINARY_CLOUD_NAME=......
CLOUDINARY_API_KEY=......
CLOUDINARY_API_SECRET=......
```
