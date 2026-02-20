/*
  # Portfolio Database Schema

  ## Overview
  Creates the database structure for Dave's portfolio website, including projects,
  tech stack, and contact submissions.

  ## New Tables

  ### `projects`
  Stores all portfolio projects with detailed information.
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Project name
  - `slug` (text, unique) - URL-friendly identifier
  - `category` (text) - Project category (Web Applications, Automation Systems, Client Projects, Experimental)
  - `summary` (text) - Short description for cards
  - `problem` (text) - Problem statement
  - `solution` (text) - Solution description
  - `architecture` (text) - Technical architecture details
  - `tech_stack` (text[]) - Array of technologies used
  - `results` (text) - Impact and results
  - `image_url` (text) - Main project image
  - `screenshots` (text[]) - Array of screenshot URLs
  - `featured` (boolean) - Whether to show on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `contact_submissions`
  Stores contact form submissions.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Projects table: Public read access for viewing portfolio
  - Contact submissions: Insert-only access for visitors
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  summary text NOT NULL,
  problem text,
  solution text,
  architecture text,
  tech_stack text[] DEFAULT '{}',
  results text,
  image_url text,
  screenshots text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Projects policies: Public read access
CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- Contact submissions policies: Public can insert
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- Create index for featured projects
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);