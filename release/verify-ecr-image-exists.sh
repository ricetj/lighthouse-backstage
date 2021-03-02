#  #!/usr/bin/env bash
# Verify that Docker image has been pushed to ECR
# Error 1: image is not found
# Example:
#    ./find-ecr-image.sh foo/bar mytag

if [[ $# -lt 2 ]]; then
    echo "Usage: $( basename $0 ) <repository-name> <image-tag>"
    exit 1
fi

echo "grabbing image info"
IMAGE_META="$( aws ecr describe-images --repository-name=$1 --image-ids=imageTag=$2 2> /dev/null )"

if [[ $? == 0 ]]; then
    IMAGE_TAGS="$( echo ${IMAGE_META} | jq '.imageDetails[0].imageTags[0]' -r )"
    echo "$1:$2 found"
else
    echo "$1:$2 not found. Did CI build and push a container with tag ${2}?"
    exit 1
fi