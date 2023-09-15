#!/bin/bash

docker run -i -t \
  -p 3030:80 \
  -e OPENAI_API_KEY="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" \
  -e ALLOWED_HOSTS="localhost:3030" \
  -v /c/DEVELOPMENT/Afrineuron/docker \
  silvanmelchior/incognito-pilot:latest
