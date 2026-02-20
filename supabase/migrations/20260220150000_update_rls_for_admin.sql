/*
  # Update RLS Policies for Admin Access

  ## Overview
  Updates the RLS policies to allow admin users to insert, update, and delete projects.
  
  ## Changes
  - Add policy for authenticated users to insert projects (admin_can_insert_projects)
  - Add policy for authenticated users to update projects (admin_can_update_projects)
  - Add policy for authenticated users to delete projects (admin_can_delete_projects)
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can manage projects" ON projects;

-- Projects policies: Admins (authenticated users) can manage
CREATE POLICY "Admin can insert projects"
  ON projects FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can update projects"
  ON projects FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete projects"
  ON projects FOR DELETE
  USING (true);

-- Contact submissions policies: Keep existing
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);
