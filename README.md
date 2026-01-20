# Pokémon App


## Technologies Used

### Frontend Framework
- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework

### Data Fetching
- **TanStack Query (React Query)** - Powerful data fetching and caching

### Code Quality
- **ESLint** - Linting and code quality
- **Prettier** - Code formatting

## API

This app uses the [PokéAPI](https://pokeapi.co) - a free and open RESTful API for Pokémon data.

- **Base URL:** `https://pokeapi.co/api/v2`
- **Endpoints used:**
  - `/pokemon/{name}` - Get detailed Pokémon information
  - `/pokemon?limit=1000` - Get list of all Pokémon for autocomplete

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-appp
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Other Scripts

- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting






## Development Notes

- **Query Caching:** Pokémon data is cached to minimize API calls
- **Retry Logic:** Failed requests retry once before showing an error

## License

This project is open source and available under the MIT License.
