# TinderP - Academic Paper Platform

A comprehensive academic paper platform that combines the best features from multiple platforms:

- **Paper Swiping**: Tinder-like interface for discovering and matching with papers
- **Discussions**: Stack Overflow-style commenting and Q&A on papers
- **Activity Feed**: See what people in your network are doing
- **Collaboration**: Find and collaborate with researchers
- **Smart Recommendations**: AI-powered paper recommendations based on your interests

## Features

### Core Features
- 🔥 **Paper Swiping**: Swipe through papers, like/dislike, and build your library
- 💬 **Discussions**: Comment on papers, ask questions, get answers
- 📊 **Activity Feed**: Real-time feed of activities from people you follow
- 🤝 **Collaborations**: Post collaboration opportunities and connect with researchers
- 🎯 **Recommendations**: Personalized paper recommendations using ML algorithms
- 👥 **Social Network**: Follow researchers, see their activity
- 📚 **Paper Library**: Save and organize your favorite papers

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with Lucide icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd tinderP
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

Edit `.env` and set:
- `DATABASE_URL="file:./dev.db"` (SQLite database)
- `NEXTAUTH_SECRET` - Generate a random string (you can use `openssl rand -base64 32` on Linux/Mac, or use an online generator)

4. Set up the database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. (Optional) Seed the database with papers from ArXiv
```bash
npm run seed
```
This will fetch ~100 recent papers from ArXiv (AI, Computer Vision, Machine Learning, NLP categories)

### Adding Sample Data

The application integrates with ArXiv API to fetch papers. You have several options:

1. **Seed Script** (Recommended for first-time setup):
   ```bash
   npm run seed
   ```
   This will automatically fetch ~100 recent papers from ArXiv (AI, CV, ML, NLP categories)

2. **Import via UI**:
   - Navigate to `/admin/import` in your browser
   - Select a category or enter a search query
   - Click "Import Papers"

3. **Automatic Fetching**:
   - When you run out of papers in the swipe interface, click "Fetch from ArXiv"
   - The app will automatically fetch more papers based on your interests

4. **API Endpoint**:
   ```bash
   POST /api/papers/import
   {
     "searchQuery": "transformer",
     "category": "cs.AI",
     "maxResults": 20
   }
   ```

6. Run the development server
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
tinderP/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Auth pages
│   ├── (main)/            # Main app pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── paper/            # Paper-related components
│   ├── discussion/       # Discussion components
│   └── collaboration/    # Collaboration components
├── lib/                  # Utilities and helpers
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # Auth configuration
│   └── recommendations.ts # Recommendation algorithm
├── prisma/               # Database schema
│   └── schema.prisma
└── types/                # TypeScript types
```

## Features in Detail

### ArXiv Integration
- **Automatic Paper Import**: Fetch papers directly from ArXiv API
- **Category-based Search**: Filter by ArXiv categories (cs.AI, cs.CV, cs.LG, etc.)
- **Keyword Search**: Search for specific topics
- **Auto-fetch**: Automatically fetches more papers when you run out
- **Import Page**: Use `/admin/import` to bulk import papers

### Paper Swiping
- Swipe left to pass, right to like
- View paper details before swiping
- Build your personalized paper library
- Automatically fetches more papers from ArXiv when needed

### Discussions
- Comment on any paper
- Reply to comments
- Upvote/downvote comments
- Markdown support for formatting

### Activity Feed
- See papers liked by people you follow
- View new comments and discussions
- Track collaboration opportunities
- Filter by activity type

### Collaborations
- Post collaboration opportunities
- Browse open collaborations
- Request to join projects
- Manage collaboration requests

### Recommendations
- Personalized recommendations based on:
  - Your liked papers
  - Your interests
  - Papers liked by similar users
  - Paper citations and keywords

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
