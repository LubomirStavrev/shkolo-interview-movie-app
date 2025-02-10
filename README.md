# Shkolo Interview Movie App

A React Native Movie Mobile App developed as an interview task for Shkolo. The app features Facebook authentication, a movies list, detailed movie information, a user profile screen, and push notifications with deep linking. The backend is powered by Laravel with hardcoded data.

> **Note:** Some files that typically should not be included in the repository (e.g., environment files or configuration secrets) are present for the sake of simplifying the interview review process. I am fully aware of best practices regarding sensitive data handling and would exclude these files in a production environment.

## Environment Variables

### Backend (`.env`)

- `APP_URL`: Laravel application URL
- `APP_PORT`: Server port (default: 8000)
- `DB_*`: Database configuration
- `FACEBOOK_CLIENT_ID`: Facebook App ID
- `FACEBOOK_CLIENT_SECRET`: Facebook App Secret

### Frontend (`.env`)

- `EXPO_PUBLIC_API_URL`: Backend API URL

## Architecture Decisions

### Authentication

- Facebook SDK for authentication
- Laravel Sanctum for token-based authentication
- Secure token storage using AsyncStorage

### State Management

- Context API for global state management
- Custom hooks for data fetching
- Theme provider for consistent styling

### Styling

- Emotion for styled-components
- Theme-based styling system
- Responsive design patterns

### Navigation

- Expo Router for file-based routing
- Deep linking support
- Protected routes for authenticated users

## Push Notifications

The app leverages Expo's push notification system:

1. Register device token with the backend
2. Handle notification permissions
3. Enable deep linking to specific screens
4. Manage background notification handling

## Development Workflow

1. **Backend:**
   ```bash
   cd backend/
   php artisan migrate
   php artisan serve --host=0.0.0.0
   ```
2. **Frontend:**
   ```bash
   cd MovieApp/
   pnpm install
   cd ios && pod install && cd ..
   npx expo start
   ```
3. **Running on Devices:**
   - **iOS:**
     ```bash
     npx expo run:ios
     ```
   - **Android:**
     ```bash
     npx expo run:android
     ```

## Features Setup

### Facebook Authentication

1. Create a Facebook App in the Facebook Developers Console
2. Configure OAuth settings
3. Add test users for development
4. Update Facebook App ID and Secret in both backend and frontend `.env` files

### Push Notifications

1. Configure Expo Push Token
2. Set up notification handlers
3. Test deep linking functionality
4. Configure background notification handling

## Development Notes

### Backend (Laravel)

- Sanctum for authentication
- RESTful API endpoints
- MySQL database integration
- Facebook OAuth integration
- Push notification handling

### Frontend (React Native/Expo)

- Expo managed workflow
- Facebook SDK integration
- Theming support with Emotion
- Push notifications and deep linking
- Protected routes for authenticated screens

## Common Issues & Solutions

1. **Backend Connection:**
   - Ensure the correct IP in `.env`
   - Laravel should run on `0.0.0.0`
   - Verify port accessibility

2. **Database:**
   - Check MySQL connection settings
   - Run migrations:
     ```bash
     php artisan migrate
     ```
   - Clear Laravel cache:
     ```bash
     php artisan optimize:clear
     ```

3. **Facebook Authentication:**
   - Verify Facebook App settings
   - Check App ID and tokens
   - Ensure test user permissions are correctly set

4. **Push Notifications:**
   - Enable notifications in Expo
   - Check device permissions
   - Verify token registration with the backend

## Troubleshooting

### Backend Issues

```bash
# Clear all Laravel caches
php artisan optimize:clear

# Regenerate autoload files
composer dump-autoload

# Check Laravel logs
tail -f storage/logs/laravel.log
```

### Frontend Issues

```bash
# Clear Expo cache
expo start -c

# Reset Metro bundler
pnpm start -- --reset-cache

# Check Expo logs
expo doctor
```

