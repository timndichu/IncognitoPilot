#!/bin/bash

docker run -i -t \
  -p 3030:80 \
  -e OPENAI_API_KEY="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" \
  -e ALLOWED_HOSTS="localhost:3030" \
  -v /c/DEVELOPMENT/Afrineuron/docker \
  silvanmelchior/incognito-pilot:latest
