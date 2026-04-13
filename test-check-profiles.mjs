import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pikukxvwxigdmoltxbah.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpa3VreHZ3eGlnZG1vbHR4YmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzgzODgsImV4cCI6MjA4NjkxNDM4OH0.RLCjb21CS8t00W8aw6vT8dzKG6iuFLMC_OxbaxW9dhs'
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data: profiles, error } = await supabase.from('profiles').select('id, name, auth_id').order('id', { ascending: false }).limit(10)
  console.log('Last 10 Profiles data:', JSON.stringify(profiles, null, 2))
}
run()
