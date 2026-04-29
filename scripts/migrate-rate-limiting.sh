#!/bin/bash
# SiteER Rate Limiting Migration Script
# Upgrades from in-memory rate limiter to persistent Vercel KV (Redis)

echo "🔄 SiteER Rate Limiting Migration"
echo "=================================="
echo ""

# Step 1: Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ ERROR: Vercel CLI not found"
    echo "   Install with: npm i -g vercel"
    exit 1
fi

# Step 2: Install Vercel KV client
echo "📦 Installing @vercel/kv..."
npm install @vercel/kv

if [ $? -ne 0 ]; then
    echo "❌ Failed to install @vercel/kv"
    exit 1
fi

echo "✅ @vercel/kv installed"
echo ""

# Step 3: Create Vercel KV database (if not exists)
echo "🔐 Vercel KV Setup"
echo "   You now need to:"
echo "   1. Go to: https://vercel.com/dashboard/storage"
echo "   2. Click 'Create Database' → Select 'KV (Redis)'"
echo "   3. Name it 'siteer-rate-limits' or similar"
echo "   4. After creation, vercel env pull will fetch the connection string"
echo ""

# Step 4: Pull environment variables from Vercel
echo "📥 Pulling environment variables from Vercel..."
vercel env pull .env.production.local

if [ $? -ne 0 ]; then
    echo "❌ Failed to pull Vercel environment"
    echo "   Make sure you're logged in: vercel login"
    exit 1
fi

echo "✅ Environment variables pulled"
echo ""

# Step 5: Update lib/rateLimit.ts
echo "📝 Next steps:"
echo "   1. Update lib/rateLimit.ts to use Vercel KV instead of in-memory Map"
echo "   2. See implementation guide below:"
echo ""
echo "   import { kv } from '@vercel/kv';"
echo ""
echo "   export async function consumeRateLimit("
echo "       key: string,"
echo "       limit: number,"
echo "       windowMs: number"
echo "   ) {"
echo "       const current = await kv.incr(key);"
echo "       if (current === 1) {"
echo "           await kv.expire(key, Math.ceil(windowMs / 1000));"
echo "       }"
echo "       return { ok: current <= limit };"
echo "   }"
echo ""

echo "✅ Migration ready!"
echo ""
echo "Final steps:"
echo "  1. Update lib/rateLimit.ts with KV implementation"
echo "  2. Run: npm run build"
echo "  3. Run: vercel deploy --prod"
echo ""
