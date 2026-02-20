/*
  # Add Project URL Field

  ## Overview
  Adds an optional project_url field to the projects table to store links to the live project,
  GitHub repository, or other project resources.

  ## Changes
  - Add `project_url` (text, nullable) column to projects table
*/

-- Add project_url column to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS project_url text;
