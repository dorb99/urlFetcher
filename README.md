# General:
  A simple full-stack application, where the users input a list of URLs, and the application fetch 
  metadata (title, description, and an image) for each URL, and display the results on the front-end.

 # Technologies:
   # Client - React with Vite
     - Axios: Making requests to the server

   # Server - Node.js 
     - Cors and Helmet: Security
     - Metascraper: Reciving the data from the html
     - express: Middleware
     - Axios: Making http requests from the web

  # Tests - Used Vitest 
     - Just entering the Client or Server directory and enter 
        npx vitest

# How to user the application?

cd /path/to/your/directory
git clone https://github.com/dorb99/urlFetcher.git

**First terminal
    cd urlFetcher/client
    npm install
    npm run dev

**Second terminal
    cd urlFetcher/server
    npm install
    node server.js

# 
