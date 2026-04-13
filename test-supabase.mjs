import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pikukxvwxigdmoltxbah.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpa3VreHZ3eGlnZG1vbHR4YmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMzgzODgsImV4cCI6MjA4NjkxNDM4OH0.RLCjb21CS8t00W8aw6vT8dzKG6iuFLMC_OxbaxW9dhs'
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data: profile } = await supabase.from('profiles').select('id').limit(1).single()
  const uid = profile ? profile.id : 10
  const { data, error } = await supabase
    .from('statuses')
    .insert({
      status_id: Date.now(),
      status: 'Test status resolving the DB constraint!',
      user_id: uid
    })
    .select()
    .single()
    
  console.log('Result:', JSON.stringify({data, error}, null, 2))
}
run()
