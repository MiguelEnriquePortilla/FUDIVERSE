// Test FUDINTELLIGENCE
const testFudiIntelligence = async () => {
  try {
    const response = await fetch('https://vdcqwjodfuwrthcuvzfr.supabase.co/functions/v1/fudintelligence', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3F3am9kZnV3cnRoY3V2emZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDI5MzcsImV4cCI6MjA2MzY3ODkzN30.NoBLGk0FqvjOf_8D4F-yJgiXoZTL1-TDY9tMdW2ZXs4'
      }
    });
    
    const data = await response.json();
    console.log('🧠 FUDINTELLIGENCE RESULTS:');
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
};

testFudiIntelligence();