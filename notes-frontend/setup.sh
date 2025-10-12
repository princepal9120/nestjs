#!/bin/bash

echo "🚀 Setting up Notes Frontend Application..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure your NestJS backend is running on http://localhost:3000"
echo "2. If your backend runs on a different port, update config/api.ts"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Open http://localhost:3001 in your browser"
echo ""
echo "🔐 Test Credentials:"
echo "   Email: (use your registered email)"
echo "   Password: (use your password)"
echo ""
