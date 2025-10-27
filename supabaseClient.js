import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nltnmjlxmphamxziycuf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sdG5tamx4bXBoYW14eml5Y3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMzg0MjAsImV4cCI6MjA3MjcxNDQyMH0.upEhU4waIW1iCeO5n7as517dtdbC4x6xYDLLzrRdEhQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)