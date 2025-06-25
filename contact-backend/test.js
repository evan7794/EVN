const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rnuevrjvtxdmmzuytfdi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudWV2cmp2dHhkbW16dXl0ZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTg5NzcsImV4cCI6MjA2NTU3NDk3N30.Zkg5BIlFMzr6pLAI86qIiFZF_td3wwDUBAjRR_0Pt4M'
);

async function testInsert() {
  const { error } = await supabase.from('contact_messages').insert([
    {
      name: 'Test',
      email: 'test@email.com',
      subject: 'Testing',
      message: 'This is just a test'
    }
  ]);

  if (error) {
    console.error('❌ Supabase Error:', error.message);
  } else {
    console.log('✅ Insert successful!');
  }
}

testInsert();
