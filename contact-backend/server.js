const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Supabase connection
const supabase = createClient(
  'https://rnuevrjvtxdmmzuytfdi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudWV2cmp2dHhkbW16dXl0ZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTg5NzcsImV4cCI6MjA2NTU3NDk3N30.Zkg5BIlFMzr6pLAI86qIiFZF_td3wwDUBAjRR_0Pt4M'
);

// ✅ POST /contact route
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Save to Supabase
    const { error } = await supabase.from('contact_messages').insert([
      { name, email, subject, message }
    ]);

    if (error) throw error;

    console.log('✅ Message saved to Supabase');
    res.status(200).json({ success: true, message: 'Message saved to Supabase!' });

  } catch (err) {
    console.error('❌ Supabase Error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
