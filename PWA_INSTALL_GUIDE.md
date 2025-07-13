# PWA Installation Guide - Cuzeac Florin

## What's Implemented

The portfolio site is now configured as a Progressive Web App (PWA) with the following features:

### 📱 App Configuration
- **App Name**: "Cuzeac Florin"
- **Icon**: `/icon.png` (1024x1024)
- **Display Mode**: Standalone (full-screen app experience)
- **Theme Colors**: Dynamic (white for light mode, black for dark mode)

### 🚀 Installation Features

#### For Android/Chrome:
- Automatic install prompt appears for eligible users
- Custom install button in the PWA prompt component
- "Add to Home Screen" option in browser menu

#### For iOS/Safari:
- Manual installation instructions in the prompt
- Optimized for iOS home screen with proper meta tags
- Status bar adapts to app theme

### 📋 Installation Instructions

#### Android (Chrome/Edge):
1. Visit the website
2. Look for the install prompt at the bottom of the screen
3. Tap "Install" or use browser menu → "Add to Home Screen"
4. App will appear on home screen as "Cuzeac Florin"

#### iOS (Safari):
1. Visit the website in Safari
2. Tap the Share button (square with arrow up)
3. Scroll down and tap "Add to Home Screen"
4. Confirm with "Add" - app appears as "Cuzeac Florin"

### 🛠 Technical Implementation

#### Manifest Features:
- Multiple icon sizes (192x192, 512x512, 1024x1024)
- Both `any` and `maskable` icon purposes
- Proper shortcuts for Blog and GitHub
- Screenshots for app stores
- French localization

#### PWA Requirements Met:
- ✅ HTTPS (required for PWA)
- ✅ Service Worker (`/sw.js`)
- ✅ Web App Manifest (`/manifest.webmanifest`)
- ✅ Responsive design
- ✅ Installable icon (512x512+)
- ✅ Fast loading
- ✅ Works offline (service worker caching)

#### Meta Tags Added:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Cuzeac Florin">
<link rel="apple-touch-icon" href="/icon.png">
```

### 🔧 Files Modified:
- `app/manifest.ts` - PWA manifest configuration
- `app/layout.tsx` - Added PWA meta tags and install prompt
- `lib/metadata.ts` - Updated Apple Web App settings
- `components/ui/PWAInstallPrompt.tsx` - Install prompt component
- `public/sw.js` - Updated service worker cache

### 🎯 User Experience:
- Install prompt appears automatically for new users
- Remembers user choice (won't re-prompt if dismissed)
- Different experience for iOS vs Android
- Icon and name properly display on home screen
- App launches in standalone mode (no browser chrome)
- Status bar matches app theme

The PWA is now ready for installation on both iOS and Android devices!