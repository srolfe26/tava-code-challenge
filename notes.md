2025-03-24
 - Added git to help me track changes for myself along with gitignore
 - Separated into frontend and backend folders
 - Frontend npm build has several things out of date, look into this
    - Ran `npm audit fix` and things got worse. May re-roll frontend
 - Built backend in node/express
    - AI Prompt: In the @backend folder, create a typescript on Node project. Setup a basic Nest.js server with a basic health check endpoint for now
        - GET http://localhost:3000/health
 - Added a common folder to put types common to both packages
 - Will add docker compose file to make it all run

2025-03-25
 - Yep. Let's re-roll the frontend with Vite. Why? There's not a lot existing and it'll be a better foundation
 -
