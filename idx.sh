#!/bin/bash

curl --fail-with-body -sS 'https://api.indexnow.org/indexnow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "host": "7mza.github.io",
  "key": "3fd55ec42859409fbf60049834211e28",
  "urlList": [
    "https://7mza.github.io/"
  ]
}'
