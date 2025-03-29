<?php

// Define subreddit and URL for the Reddit page
$subreddit = 'BuyFromEU';
$url = "https://www.reddit.com/r/$subreddit/top.json?limit=50&t=all";  // Use the 'top' endpoint with a limit of 50 posts

// Set the user-agent header to avoid a 403 block (this is necessary)
$options = [
    "http" => [
        "header" => "User-Agent: php-script by /u/your-reddit-username"
    ]
];
$context = stream_context_create($options);

// Fetch the data from Reddit
$response = file_get_contents($url, false, $context);

// Check if the response was successful
if ($response === FALSE) {
    die('Error occurred while fetching data.');
}

// Decode the response
$data = json_decode($response, true);

// Check if the data is valid
if (isset($data['data']['children'])) {
    $urls = [];
    foreach ($data['data']['children'] as $post) {
        // Construct the full URL using the permalink
        $postUrl = "https://www.reddit.com" . $post['data']['permalink'];

        // Only include unique URLs (no duplicates)
        if (!in_array($postUrl, $urls)) {
            $urls[] = $postUrl;
        }
    }

    // Save the result as a JSON file
    file_put_contents('posts.json', json_encode($urls, JSON_PRETTY_PRINT));

    echo "Data saved to posts.json\n";
} else {
    echo "Error: Failed to retrieve posts.\n";
}
?>
