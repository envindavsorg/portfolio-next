#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "master"  ]] ; then
    # Don't build
    echo "🛑 - Build cancelled for 'my-portfolio'"
    exit 0;
else
    # Proceed with the build
    echo "✅ - Build can proceed for 'my-portfolio'"
    exit 1;
fi
