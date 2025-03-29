# Reddit Screenshot Capture
A simple tool for capturing screenshots of Reddit posts and their top comments. This tool can be useful for projects, research, or any academic work involving Reddit content. It automates the process of capturing Reddit posts along with the top 5 comments for further analysis or presentation.

## Features

- Captures screenshots of Reddit posts.
- Takes screenshots of the top 5 comments on each post.
- Easy to set up and use with Docker.
- Fully automated process for fetching posts and comments.

## Requirements

You need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [Git](https://git-scm.com/downloads) installed on your machine for this application to run. This will ensure the application works correctly. It may take 10-20 seconds for each post to process.


## How to Use
1. Open the `get_posts.php` file and select the subreddit you want by modifying this line: 
   ```php
   $subreddit = 'BuyFromEU';
   ```
   Save the file and close the editor.
2. Clone this repository to your local machine using the [Command line](https://en.wikipedia.org/wiki/Command-line_interface):
   ```bash
   git clone https://github.com/jstlwk/reddit-screenshot-capture.git
   ```

3. Build and run using Docker:
   ```bash
   docker build -t reddit-screenshot-capture .
   docker run -d --name reddit-screenshot-capture-container \
   -v ./:/var/www/html \
   reddit-screenshot-capture
   docker exec -it reddit-screenshot-capture-container /bin/bash

   ```

4. Run `get_posts.php` to fetch all the links:
   ```bash
   php get_posts.php
   ```

5. Run `screenshots.js` to capture the posts you want to keep:
    ```bash
   npm install && node screenshots.js -v
    ```

6. After the process is complete, you should have a full `screenshots` folder and a `posts.json` file to save for study or any other purpose.

## Need help?
You can contact me on all social media platforms, including [X](https://x.com/JSTLWK), [email](mailto:info@jasperstolwijk.nl), or find contact information on my website: [jstlwk.dev](https://jstlwk.dev).

## Donations
If you find this tool helpful and want to support the development of more open-source projects, consider donating through [Buy Me A Coffee](https://buymeacoffee.com/jstlwk).

## Contributions
Feel free to contribute to the project by submitting issues or pull requests. If you need help or have questions, don't hesitate to reach out through the issues tab or social media.

This project is licensed under the MIT License - see the LICENSE file for details.
