#! /bin/bash

curl -X POST http://localhost:8080/graphql -s -H "Content-Type: application/json" \
  -d '{ "query": "query { getUser(email: \"test@test.com\") { firstname } } "}' | jq

echo ""
