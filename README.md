# Dave's Portfolio - Usage Guide

A modern, professional developer portfolio built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- Dark theme with navy-to-slate gradient and electric blue accents
- Fully responsive mobile-first design
- Dynamic project management via Supabase database
- Contact form with database integration
- Smooth animations and glassmorphism effects
- SEO optimized
- Category filtering for projects
- Dynamic routing for project details

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── Footer.tsx       # Site footer
│   ├── Button.tsx       # Reusable button component
│   ├── Card.tsx         # Card component with glassmorphism
│   └── Section.tsx      # Section wrapper with consistent spacing
├── pages/              # Page components
│   ├── Home.tsx        # Homepage with hero, services, projects
│   ├── Projects.tsx    # Projects listing with filters
│   ├── ProjectDetail.tsx # Individual project detail page
│   ├── Services.tsx    # Services overview
│   ├── About.tsx       # About page with bio and skills
│   └── Contact.tsx     # Contact form
├── lib/
│   └── supabase.ts     # Supabase client configuration
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## Adding New Projects

Projects are stored in the Supabase database. To add a new project:

### Via Admin Dashboard

1. Go to `/admin` on your deployed site (e.g., `https://your-portfolio-url.vercel.app/admin`).
2. Log in with your admin password (set in your environment variables as `VITE_ADMIN_PASSWORD`).
3. Fill out the project form:
   - **Title**: Name of your project
   - **Slug**: URL-friendly identifier (auto-generated from title, can be edited)
   - **Category**: Select a category (e.g., Web Applications)
   - **Summary**: Short description for cards
   - **Problem/Solution/Architecture/Results**: (Optional) Add details for the project detail page
   - **Tech Stack**: Comma-separated list (e.g., React, TypeScript, Supabase)
   - **Image URL**: Main image for the project card
   - **Screenshots**: Comma-separated URLs for screenshots
   - **Project URL**: (Optional) Link to the live project or repo
   - **Featured**: Check to show on homepage
   - **Display Order**: Lower numbers show first
4. Click **Add Project** (or **Update Project** if editing).
5. The project will appear in the Projects list and on the site automatically.

You can also edit or delete projects from this dashboard.

### Via API

Projects can be added using the Supabase API. See the [Supabase documentation](https://supabase.com/docs) for details.

## Customization

### Update Personal Information

**Contact Details** (`src/pages/Contact.tsx`):
- Email: Line 157
- WhatsApp: Line 175

**Footer Social Links** (`src/components/Footer.tsx`):
- GitHub, LinkedIn, Email: Lines 15-19

**About Page** (`src/pages/About.tsx`):
- Update the bio text: Lines 64-72
- Modify skills: Lines 7-24

### Change Colors

The color scheme uses Tailwind classes. Main colors:
- Primary: `blue-400`, `blue-500`, `blue-600`
- Background: `slate-900`, `slate-950`
- Text: `white`, `slate-300`, `slate-400`

To change the accent color from blue to another color, search and replace:
- `blue-400` → your color choice
- `blue-500` → your color choice
- `blue-600` → your color choice

### Update Services

Edit `src/pages/Services.tsx` starting at line 7 to modify service offerings.

### Update Tech Stack

Edit `src/pages/Home.tsx` starting at line 47 to modify the displayed tech stack.

## Database Schema

### Projects Table

- `id`: UUID (auto-generated)
- `title`: Text
- `slug`: Text (unique, URL-friendly)
- `category`: Text
- `summary`: Text
- `problem`: Text (optional)
- `solution`: Text (optional)
- `architecture`: Text (optional)
- `tech_stack`: Array of text
- `results`: Text (optional)
- `image_url`: Text (optional)
- `screenshots`: Array of text
- `featured`: Boolean
- `order_index`: Integer
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Contact Submissions Table

- `id`: UUID (auto-generated)
- `name`: Text
- `email`: Text
- `message`: Text
- `created_at`: Timestamp

## Adding a Blog (Future)

The structure is ready for a blog. To add one:

1. Create a migration for a `posts` table in Supabase
2. Create `src/pages/Blog.tsx` and `src/pages/BlogPost.tsx`
3. Add the routes to `src/App.tsx`
4. Add "Blog" link to navigation in `src/components/Navigation.tsx`

## Building and Deployment

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Image Recommendations

For best results, use images with these dimensions:
- Project cards: 1920x1080px (16:9 aspect ratio)
- Screenshots: 1920x1080px or larger

Use stock photos from [Pexels](https://pexels.com) for placeholder images.

## Support

For questions or issues, refer to:
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com)
