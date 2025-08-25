#!/bin/bash

# Local Development Server
# Serves the website locally for testing

PORT=8000

echo "🚀 Starting local development server..."
echo "📍 Portfolio: http://localhost:$PORT"
echo "📄 Resume: http://localhost:$PORT/resume.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    python -m http.server $PORT
else
    echo "❌ Python not found. Please install Python to run local server."
    echo "Alternative: Open resume.html directly in your browser"
fi