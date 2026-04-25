@echo off
echo ============================================
echo   SiteER — Vercel Deploy Script
echo   Chaotically Organized AI, LLC
echo ============================================
echo.

REM Step 1: Install Vercel CLI if not present
where vercel >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [1/4] Installing Vercel CLI...
    npm install -g vercel
) ELSE (
    echo [1/4] Vercel CLI already installed. OK.
)

REM Step 2: Login
echo.
echo [2/4] Logging into Vercel (browser will open)...
vercel login

REM Step 3: Link + deploy
echo.
echo [3/4] Deploying SiteER to Vercel...
vercel --prod --yes

REM Step 4: Set env vars (will prompt for values)
echo.
echo [4/4] Setting environment variables...
echo.
echo --- Enter your Supabase service_role key when prompted ---
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production

echo.
echo ============================================
echo   DONE. Redeploy to apply env vars:
echo   vercel --prod --yes
echo ============================================
pause
