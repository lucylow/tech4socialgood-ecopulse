# 🌍 EcoPulse - Lovable AI Integration Guide

This guide will help you set up and troubleshoot Lovable AI integration for your EcoPulse project.

## 🚀 Quick Setup

### 1. Run the Setup Script
```bash
./setup-lovable.sh
```

### 2. Manual Configuration

#### Step 1: Get Lovable API Credentials
1. Visit [Lovable.dev](https://lovable.dev)
2. Sign up or log in to your account
3. Create a new project or use an existing one
4. Navigate to your project settings
5. Copy your API key and Project ID

#### Step 2: Configure Environment Variables
Create or edit `nextjs-app/.env.local`:

```env
# Lovable AI Configuration
LOVABLE_API_KEY=your_actual_api_key_here
LOVABLE_PROJECT_ID=your_actual_project_id_here

# Ollama Configuration (for AI features)
OLLAMA_BASE_URL=http://127.0.0.1:11434
DEFAULT_MODEL=llama3.2:1b

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=EcoPulse
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_DESCRIPTION=Educational climate simulation platform
```

#### Step 3: Start Development Server
```bash
cd nextjs-app
npm run dev
```

## 🎛️ Using the Lovable Admin Panel

Once your development server is running:

1. Open your browser to `http://localhost:3000`
2. Scroll down to find the "Lovable AI Integration" panel
3. Click "Refresh" to test your connection
4. If configured correctly, you should see:
   - ✅ API Connection: Connected
   - ✅ Project Access: Accessible
5. Use the "Deploy to Lovable" button to deploy your project

## 🔧 Troubleshooting

### Common Issues

#### ❌ "API Connection: Disconnected"
**Possible causes:**
- Invalid or missing `LOVABLE_API_KEY`
- Network connectivity issues
- Lovable service is down

**Solutions:**
1. Verify your API key in `.env.local`
2. Check [Lovable Status Page](https://status.lovable.dev/)
3. Ensure you're connected to the internet
4. Try regenerating your API key

#### ❌ "Project Access: No Access"
**Possible causes:**
- Invalid or missing `LOVABLE_PROJECT_ID`
- API key doesn't have access to the project
- Project doesn't exist

**Solutions:**
1. Verify your Project ID in `.env.local`
2. Ensure your API key has access to the project
3. Check that the project exists in your Lovable dashboard

#### ❌ "Error: HTTP 401 Unauthorized"
**Possible causes:**
- Invalid API key
- Expired API key
- Incorrect API key format

**Solutions:**
1. Regenerate your API key in Lovable dashboard
2. Update `.env.local` with the new key
3. Restart your development server

#### ❌ "Error: HTTP 404 Not Found"
**Possible causes:**
- Invalid Project ID
- Project doesn't exist
- Wrong API endpoint

**Solutions:**
1. Verify your Project ID is correct
2. Check that the project exists in your dashboard
3. Ensure you're using the correct project URL

### Lovable Service Issues

If Lovable is experiencing service issues:

1. Check [Lovable Status Page](https://status.lovable.dev/)
2. Visit [Lovable Feedback](https://feedback.lovable.dev/) for community updates
3. Contact Lovable support if issues persist

## 📁 File Structure

The Lovable integration includes these files:

```
ecopulse/
├── .lovable.json                    # Lovable configuration
├── setup-lovable.sh                 # Setup script
├── LOVABLE_SETUP.md                 # This guide
└── nextjs-app/
    ├── .env.local                   # Environment variables (create this)
    ├── lib/
    │   └── lovable.ts              # Lovable client library
    ├── app/
    │   └── api/
    │       └── lovable/
    │           └── route.ts        # API endpoints
    └── components/
        └── LovableAdmin.tsx        # Admin panel component
```

## 🔌 API Endpoints

The integration provides these API endpoints:

- `GET /api/lovable?action=test` - Test API connection
- `GET /api/lovable?action=project` - Get project information
- `GET /api/lovable?action=status` - Get deployment status
- `POST /api/lovable` - Deploy project (action: "deploy")

## 🚀 Deployment

### Automatic Deployment
Use the Lovable Admin panel in your app to deploy with one click.

### Manual Deployment
```bash
# Using the API directly
curl -X POST http://localhost:3000/api/lovable \
  -H "Content-Type: application/json" \
  -d '{"action": "deploy"}'
```

### Environment Variables for Production
Make sure to set these in your production environment:

```env
LOVABLE_API_KEY=your_production_api_key
LOVABLE_PROJECT_ID=your_production_project_id
NODE_ENV=production
```

## 🆘 Getting Help

1. **Check Status**: [Lovable Status Page](https://status.lovable.dev/)
2. **Community**: [Lovable Feedback](https://feedback.lovable.dev/)
3. **Documentation**: [Lovable Docs](https://docs.lovable.dev)
4. **Support**: Contact Lovable support through their website

## 📊 Monitoring

The Lovable Admin panel provides real-time monitoring of:
- API connection status
- Project access status
- Deployment status
- Error messages and troubleshooting info

## 🔄 Updates

To update the Lovable integration:

1. Pull the latest changes from your repository
2. Run `./setup-lovable.sh` again if needed
3. Restart your development server
4. Test the connection using the admin panel

---

**Note**: Lovable is a rapidly evolving platform. If you encounter issues not covered in this guide, check the [Lovable Status Page](https://status.lovable.dev/) for service updates and known issues.
