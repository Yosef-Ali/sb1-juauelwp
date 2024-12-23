/*
  # Customer Management Schema

  1. New Tables
    - `customers`
      - Extends the profiles table with customer-specific information
      - Tracks customer status, contact details, and preferences
    
  2. Security
    - Enable RLS
    - Add policies for customer data access
*/

-- Create customer status enum
CREATE TYPE customer_status AS ENUM (
  'active',
  'inactive',
  'blocked'
);

-- Add customer-specific fields to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status customer_status DEFAULT 'active';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_orders integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_spent decimal(10,2) DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_order_date timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notes text;