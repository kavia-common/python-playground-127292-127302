#!/bin/bash
cd /home/kavia/workspace/code-generation/python-playground-127292-127302/python_playground_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

