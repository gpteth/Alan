#!/bin/bash

# Check if an argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 {build|run|start|bash}"
    exit 1
fi

# Execute the corresponding command based on the argument
case "$1" in
    build)
        docker build --platform linux/amd64 -t alan .
        ;;
    run)
        # Ensure the container is not already running
        if [ "$(docker ps -q -f name=alan)" ]; then
            echo "Container 'alan' is already running. Stopping it first."
            docker stop alan
            docker rm alan
        fi

        # Define base directories to mount
        BASE_MOUNTS=(
            "characters:/app/characters"
            ".env:/app/.env"
            "agent:/app/agent"
            "docs:/app/docs"
            "scripts:/app/scripts"
        )

        # Define package directories to mount
        PACKAGES=(
            "core"
        )

        # Start building the docker run command
        CMD="docker run --platform linux/amd64 -p 3000:3000 -d"

        # Add base mounts
        for mount in "${BASE_MOUNTS[@]}"; do
            CMD="$CMD -v \"$(pwd)/$mount\""
        done

        # Add package mounts
        for package in "${PACKAGES[@]}"; do
            CMD="$CMD -v \"$(pwd)/packages/$package/src:/app/packages/$package/src\""
        done

        # Add core types mount separately (special case)
        CMD="$CMD -v \"$(pwd)/packages/core/types:/app/packages/core/types\""

        # Add container name and image
        CMD="$CMD --name alan alan"

        # Execute the command
        eval $CMD
        ;;
    start)
        docker start alan
        ;;
    bash)
        # Check if the container is running before executing bash
        if [ "$(docker ps -q -f name=alan)" ]; then
            docker exec -it alan bash
        else
            echo "Container 'alan' is not running. Please start it first."
            exit 1
        fi
        ;;
    *)
        echo "Invalid option: $1"
        echo "Usage: $0 {build|run|start|bash}"
        exit 1
        ;;
esac