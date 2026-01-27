<?php
header("Content-Type: application/xml");

$url = "https://simotoivanen-fi-backend.onrender.com/sitemap.xml";
$logFile = __DIR__ . "/sitemap_error.log";
$maxLines = 100;

function logError($message) {
    global $logFile, $maxLines;
    $timestamp = date("[Y-m-d H:i:s]");
    $newLine = "$timestamp $message\n";

    if (file_exists($logFile)) {
        $lines = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    } else {
        $lines = [];
    }

    $lines[] = trim($newLine);
    $lines = array_slice($lines, -$maxLines);
    file_put_contents($logFile, implode("\n", $lines) . "\n");
}

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error = curl_error($ch);
    http_response_code(500);
    logError("cURL error: $error");
    echo "<!-- cURL error: $error -->";
} elseif ($httpCode !== 200) {
    http_response_code($httpCode);
    logError("HTTP error: $httpCode");
    echo "<!-- HTTP error: $httpCode -->";
} else {
    echo $response;
}

curl_close($ch);