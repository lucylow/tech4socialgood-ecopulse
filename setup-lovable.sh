#!/bin/bash

# EcoPulse Lovable Setup Script
# This script helps you set up Lovable AI integration for your project

echo "🌍 EcoPulse Lovable AI Setup"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "nextjs-app/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Setting up Lovable AI integration..."
echo ""

# Create .env.local if it doesn't exist
if [ ! -f "nextjs-app/.env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > nextjs-app/.env.local << 'EOF'
# Lovable AI Configuration
LOVABLE_API_KEY=your_lovable_api_key_here
LOVABLE_PROJECT_ID=your_project_id_here

# Ollama Configuration (for AI features)
OLLAMA_BASE_URL=http://127.0.0.1:11434
DEFAULT_MODEL=llama3.2:1b

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=EcoPulse
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_DESCRIPTION=Educational climate simulation platform

# Optional: Analytics and Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Development Configuration
NODE_ENV=development
NEXT_PUBLIC_DEV_MODE=true
EOF
    echo "✅ Created .env.local file"
else
    echo "⚠️  .env.local already exists - skipping creation"
fi

echo ""
echo "🔧 Next steps to complete Lovable setup:"
echo ""
echo "1. 🌐 Visit https://lovable.dev and sign up/login"
echo "2. 🔑 Get your API key from the Lovable dashboard"
echo "3. 📁 Create a new project in Lovable"
echo "4. 📝 Edit nextjs-app/.env.local and add:"
echo "   - LOVABLE_API_KEY=your_actual_api_key"
echo "   - LOVABLE_PROJECT_ID=your_project_id"
echo ""
echo "5. 🚀 Start the development server:"
echo "   cd nextjs-app && npm run dev"
echo ""
echo "6. 🎛️  Use the Lovable Admin panel in the app to test connection"
echo ""

# Check if Node.js and npm are installed
if command -v node &> /dev/null && command -v npm &> /dev/null; then
    echo "✅ Node.js and npm are installed"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "nextjs-app/node_modules" ]; then
        echo "📦 Installing dependencies..."
        cd nextjs-app && npm install && cd ..
        echo "✅ Dependencies installed"
    else
        echo "✅ Dependencies already installed"
    fi
else
    echo "❌ Node.js and npm are required but not installed"
    echo "   Please install Node.js from https://nodejs.org"
fi

echo ""
echo "🎉 Setup complete! Follow the steps above to configure your Lovable API keys."
echo ""
echo "📚 For more help, visit:"
echo "   - Lovable Documentation: https://docs.lovable.dev"
echo "   - Project README: ./README.md"
echo ""
