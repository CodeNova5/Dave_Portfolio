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

### Via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Table Editor > `projects`
3. Click "Insert row"
4. Fill in the fields:
   - **title**: Project name
   - **slug**: URL-friendly identifier (e.g., "my-new-project")
   - **category**: One of: "Web Applications", "Automation Systems", "Client Projects", "Experimental"
   - **summary**: Brief description for cards
   - **problem**: Problem statement (optional)
   - **solution**: Solution description (optional)
   - **architecture**: Technical details (optional)
   - **tech_stack**: Array of technologies, e.g., `["React", "Node.js", "PostgreSQL"]`
   - **results**: Impact and results (optional)
   - **image_url**: Main project image URL
   - **screenshots**: Array of screenshot URLs (optional)
   - **featured**: Set to `true` to show on homepage (limit to 3)
   - **order_index**: Number to control display order

### Via SQL

```sql
INSERT INTO projects (
  title, slug, category, summary, problem, solution, architecture,
  tech_stack, results, image_url, featured, order_index
) VALUES (
  'My New Project',
  'my-new-project',
  'Web Applications',
  'Brief description of the project',
  'The problem we solved',
  'How we solved it',
  'Technical architecture details',
  ARRAY['React', 'TypeScript', 'Supabase'],
  'Results and impact',
  'https://example.com/image.jpg',
  false,
  10
);
```

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
