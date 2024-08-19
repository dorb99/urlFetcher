# URL Metadata Fetcher

A fullstack application that allows users to input a list of URLs and fetch metadata (title, description, and image) for each URL.
The application displays the results on the front-end, providing a user-friendly interface for viewing the collected metadata.

## Features

- **URL Metadata Fetching:** Extracts metadata such as title, description, and image from the provided URLs.
- **Responsive Design:** Optimized for both desktop and mobile views.
- **Rate Limiting:** Ensures server stability by limiting the number of requests per second.
- **Security:** Implements CORS and Helmet for enhanced security.

## Technologies

### Client (React with Vite)
- **React:** For building the user interface.
- **Vite:** A fast and modern build tool.
- **Axios:** For making HTTP requests to the server.

### Server (Node.js with Express)
- **Express:** A minimal and flexible Node.js web application framework.
- **Axios:** For making HTTP requests to external sites.
- **Metascraper:** To scrape metadata from the HTML of URLs.
- **Cors and Helmet:** For securing the application with appropriate headers.
- **Rate Limit:** To prevent excessive requests and ensure server reliability.

### Testing
- **Vitest:** A fast unit test framework used for both client and server testing.

## How to Install and Run the Application

1. **Clone the repository:**
    ```bash
    git clone https://github.com/dorb99/urlFetcher.git
    ```

2. **Navigate to the client directory, install dependencies, and start the client:**
    ```bash
    cd urlFetcher/client
    npm install
    npm run dev
    ```

3. **Open a second terminal, navigate to the server directory, install dependencies, and start the server:**
    ```bash
    cd ../server
    npm install
    node index.js
    ```

4. **Running Tests:**
    - To run tests for both client and server, use the following command in the respective directories:
      ```bash
      npx vitest
      ```

