#!/bin/bash

payload='{
  "host": "https://7mza.github.io",
  "key": "3fd55ec42859409fbf60049834211e28",
  "urlList": [
    "https://7mza.github.io",
    "https://7mza.github.io/"
  ]
}'

for endpoint in 'https://api.indexnow.org/indexnow' 'https://bing.com/indexnow'; do
  curl -v "$endpoint" \
    -H 'Content-Type: application/json; charset=utf-8' \
    -d "$payload"
done
