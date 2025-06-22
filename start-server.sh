#!/bin/bash

# Define log file
LOGFILE="server.log"

# Timestamp
echo "📅 Starting server at $(date)" | tee -a $LOGFILE

# Run server and capture output + errors
node server.js >> $LOGFILE 2>&1 &

# Get PID of last background process
PID=$!

# Show where logs are stored and PID
echo "🚀 Server running in background with PID $PID"
echo "📄 Logs saved to $LOGFILE"
