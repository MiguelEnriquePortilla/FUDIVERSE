// debug-transactions.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vdcqwjodfuwrthcuvzfr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkY3F3am9kZnV3cnRoY3V2emZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODEwMjkzNywiZXhwIjoyMDYzNjc4OTM3fQ.Dp4LTTUl9BXQGK1etr8FhtEOeHGTvb5YVseeAlJimb4'
);

async function debugTransactions() {
  console.log('🔍 INVESTIGANDO TRANSACCIONES...\n');
  
  try {
    // Ver total de transacciones
    const { count, error: countError } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true });
    
    console.log('📊 Total transacciones en DB:', count);
    if (countError) console.log('❌ Error count:', countError.message);
    
    // Ver por restaurant_id
    const { count: myCount, error: myCountError } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', '13207c90-2ea6-4aa0-bfac-349753d24ea4');
      
    console.log('📊 Mis transacciones:', myCount);
    if (myCountError) console.log('❌ Error myCount:', myCountError.message);
    
    // Ver sample de datos
    const { data, error: dataError } = await supabase
      .from('transactions')
      .select('restaurant_id, transaction_date, total_amount, id')
      .eq('restaurant_id', '13207c90-2ea6-4aa0-bfac-349753d24ea4')
      .limit(5);
      
    console.log('\n📋 Sample de MIS transacciones:');
    if (dataError) {
      console.log('❌ Error:', dataError.message);
    } else {
      console.log(data);
    }
    
    // Probar el query que usa el vectorizer
    console.log('\n🔧 PROBANDO QUERY DEL VECTORIZER:');
    const { data: vectorizerData, error: vectorizerError } = await supabase
      .from('transactions')
      .select(`
        id,
        transaction_date,
        items,
        total_amount,
        payment_method,
        customer_count,
        created_at
      `)
      .eq('restaurant_id', '13207c90-2ea6-4aa0-bfac-349753d24ea4')
      .order('transaction_date', { ascending: false })
      .limit(10);
    
    if (vectorizerError) {
      console.log('❌ Error en query vectorizer:', vectorizerError.message);
    } else {
      console.log('✅ Query vectorizer funciona:', vectorizerData?.length || 0, 'resultados');
      if (vectorizerData && vectorizerData.length > 0) {
        console.log('📋 Primera transacción:', vectorizerData[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

debugTransactions();