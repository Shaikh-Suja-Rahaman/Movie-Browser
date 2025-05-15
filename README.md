# IMDB App (React + Vite)

A modern movie browser and watchlist app built with React, Vite, and Tailwind CSS. It uses the [TMDB API](https://www.themoviedb.org/documentation/api) to fetch movie data, allowing users to search, browse, and manage a personal watchlist.

## Features

- **Browse Movies:** View popular, top-rated, upcoming, and now playing movies.
- **Search:** Search for movies by title using the TMDB API.
- **Movie Details:** View detailed information about each movie, including cast, genres, ratings, and production companies.
- **Watchlist:** Add or remove movies from your personal watchlist, which is saved in local storage.
- **Responsive UI:** Built with Tailwind CSS for a modern, responsive design.
- **Animations:** Includes custom animations for enhanced user experience.

## Project Structure

```
vite-project/
  ├── public/
  ├── src/
  │   ├── animations/      # Custom animation components
  │   ├── assets/          # Static images and SVGs
  │   ├── components/      # React UI components
  │   ├── context/         # React Context for global state
  │   ├── utilities/       # Utility files (e.g., genre mapping)
  │   ├── App.jsx          # Main app component
  │   ├── main.jsx         # Entry point
  │   └── Tabs.jsx         # Tab navigation for movie categories
  ├── index.html
  ├── package.json
  ├── tailwind.config.js
  └── vite.config.js
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd vite-project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Configuration

- The TMDB API key is currently hardcoded in the codebase. For production, consider moving it to an environment variable.

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router DOM](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/)
- [Font Awesome](https://fontawesome.com/)

## Folder Highlights

- [`src/components`](src/components): Main UI components like `MovieCard`, `Watchlist`, `Navbar`, etc.
- [`src/context/MovieContext.jsx`](src/context/MovieContext.jsx): Global state management for watchlist and search.
- [`src/animations`](src/animations): Custom animation components.
- [`src/utilities/genreids.js`](src/utilities/genreids.js): Genre ID to name mapping.

## License

This project is for educational purposes.

---

**Note:** This project uses the TMDB API but is not endorsed or certified by TMDB.
