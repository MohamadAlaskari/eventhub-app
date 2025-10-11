# EventHub - Event Discovery Platform

A modern, responsive web application built with React and TypeScript that helps users discover and explore events happening around them. From concerts and festivals to conferences and local gatherings, EventHub provides a comprehensive platform for event discovery and management.

## 🚀 Features

### Core Functionality
- **Event Discovery**: Browse events by country with real-time search and filtering
- **Event Details**: Comprehensive event information including dates, venues, pricing, and descriptions
- **User Authentication**: Secure registration and login system
- **Favorites System**: Save and manage favorite events
- **Interactive Maps**: Location-based event discovery using Mapbox
- **Responsive Design**: Mobile-first design that works across all devices

### Advanced Features
- **Smart Filtering**: Filter events by country, category, and search terms
- **Pagination**: Efficient browsing through large event catalogs
- **Real-time Data**: Live event data with loading states and error handling
- **Modern UI**: Beautiful, accessible interface with smooth animations
- **User Profiles**: Personalized user accounts with favorite event management
- **Search**: Real-time search functionality across event names and descriptions

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Maps**: Mapbox GL
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eventhub-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── EventCard.tsx   # Event display component
│   ├── Layout.tsx      # Main layout wrapper
│   └── ...
├── pages/              # Page components
│   ├── Events.tsx      # Event listing page
│   ├── EventDetail.tsx # Event details page
│   ├── Favorites.tsx   # User favorites page
│   ├── Profile.tsx     # User profile page
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useEvents.ts    # Event data management
│   ├── useAuth.ts      # Authentication logic
│   └── ...
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── contexts/           # React contexts
└── utils/              # Utility functions
```

## 🎯 Key Pages

### Home Page (`/`)
- Hero section with call-to-action
- Quick access to event discovery
- User registration/login options

### Events Page (`/events`)
- Event grid with search and filtering
- Country and category filters
- Pagination for large event lists
- Real-time search functionality

### Event Details (`/events/:id`)
- Comprehensive event information
- Interactive maps
- Event images and descriptions
- Add to favorites functionality

### Favorites (`/favorites`)
- User's saved events
- Remove from favorites
- Authentication required

### User Profile (`/profile`)
- User account management
- Personal information
- Account settings

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

The project uses a custom design system built on top of Radix UI primitives and Tailwind CSS:

- **Cards**: Event cards with hover effects and animations
- **Forms**: Accessible form components with validation
- **Navigation**: Responsive navigation with mobile support
- **Modals**: Dialog components for user interactions
- **Loading States**: Skeleton loaders for better UX

## 🌍 Internationalization

The app supports multiple countries through the `CountryCode` enum and provides localized event data based on selected regions.

## 🔐 Authentication

- Secure user registration and login
- JWT token-based authentication
- Protected routes for user-specific features
- Context-based authentication state management

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

The app is built with Vite and can be deployed to any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service of choice

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Mapbox](https://www.mapbox.com/) - Mapping services
- [Lucide](https://lucide.dev/) - Icon library

---

**EventHub** - Discover amazing events near you! 🎉