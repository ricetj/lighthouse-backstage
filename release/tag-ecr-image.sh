#!/usr/bin/env bash
# Updates ecr image with tags

# REPONAME=$1
# NEWRELEASECOMMITHASH=$2
# NEWRELEASEVERSION=$3

# fail if less than 3 arguments provided
if [[ $# -lt 3 ]]; then
    echo "Usage: $( basename "$0" ) <repository> <SHA1> <version tag>"
    exit 1
fi

# create manifest of images needed for release
# image tags are set in .circleci/config.yml
FRONTENDMANIFEST=$(aws ecr batch-get-image --repository-name="$1" --image-ids=imageTag="frontend-$2" --query 'images[].imageManifest' --output text)

if [[ $? == 0 ]]; then
  aws ecr put-image --repository-name="$1" --image-tag="frontend-v$3" --image-manifest "$FRONTENDMANIFEST"
  echo "tagged $1:frontend-$2 with frontend-$3"
else
  echo "failed to tag $1:$2 with $3"
  exit 1
fi

BACKENDMANIFEST=$(aws ecr batch-get-image --repository-name="$1" --image-ids=imageTag="backend-$2" --query 'images[].imageManifest' --output text)

if [[ $? == 0 ]]; then
  aws ecr put-image --repository-name="$1" --image-tag="backend-v$3" --image-manifest "$BACKENDMANIFEST"
  echo "tagged $1:backend-$2 with backend-$3"
else
  echo "failed to tag $1:$2 with $3"
  exit 1
fi