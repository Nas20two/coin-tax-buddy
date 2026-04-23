-- SUPABASE_SETUP.sql
-- Pocket CGT Tables Setup for NaSy Hub Supabase Project

-- 1. Create pocket_cgt_users table
CREATE TABLE pocket_cgt_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    subscription_status TEXT CHECK (subscription_status IN ('active', 'cancelled', 'trialing', 'inactive')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create pocket_cgt_subscriptions table
CREATE TABLE pocket_cgt_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES pocket_cgt_users(id),
    status TEXT,
    price_id TEXT,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Set up Row Level Security (RLS) policies
ALTER TABLE pocket_cgt_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pocket_cgt_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policy for pocket_cgt_users: Users can only access their own records
CREATE POLICY "Users can view their own user data" 
ON pocket_cgt_users 
FOR SELECT 
USING (auth.uid()::text = id::text);

-- RLS policy for pocket_cgt_subscriptions: Users can only access their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON pocket_cgt_subscriptions 
FOR SELECT 
USING (user_id IN (SELECT id FROM pocket_cgt_users WHERE auth.uid()::text = id::text));

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pocket_cgt_users_updated_at
BEFORE UPDATE ON pocket_cgt_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();