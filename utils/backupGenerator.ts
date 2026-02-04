import { supabase } from '../lib/supabase';

// Helper to escape single quotes for SQL (e.g. "It's" -> "It''s")
const formatValue = (val: any): string => {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return `${val}`;
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (Array.isArray(val)) {
    // Convert JS array to Postgres Array string: '{item1,item2}'
    const cleaned = val.map(v => `"${v}"`).join(','); 
    return `'${"{" + cleaned + "}"}'`; 
  }
  // Strings: Escape single quotes
  return `'${val.toString().replace(/'/g, "''")}'`;
};

const generateInsert = (tableName: string, rows: any[]) => {
  if (!rows || rows.length === 0) return '';
  
  const headers = Object.keys(rows[0]).join(', ');
  const values = rows.map(row => {
    const rowValues = Object.values(row).map(formatValue).join(', ');
    return `(${rowValues})`;
  }).join(',\n');

  return `\n-- DATA: ${tableName} --\nINSERT INTO ${tableName} (${headers}) VALUES\n${values};\n`;
};

export const generateMasterBackup = async () => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // 1. Fetch Data in Dependency Order
  // Profiles first (Parent of all)
  const { data: profiles } = await supabase.from('profiles').select('*');
  
  // Specs (Parent of ADRs)
  const { data: specs } = await supabase.from('specs').select('*');
  
  // Quests
  const { data: quests } = await supabase.from('quests').select('*');
  
  // Children
  const { data: signals } = await supabase.from('signals').select('*');
  const { data: meetings } = await supabase.from('meetings').select('*');
  const { data: contributions } = await supabase.from('contributions').select('*');
  const { data: notifications } = await supabase.from('notifications').select('*');

  // NOTE: We generally DO NOT backup 'profile_secrets' (passwords) for security.
  // When restoring, you should run a script to reset passwords to a default.

  let sqlContent = `-- IOI NEXUS MASTER BACKUP\n-- Generated: ${new Date().toISOString()}\n\n`;

  // 2. Build SQL String (Strict Order enforced here)
  if (profiles) sqlContent += generateInsert('profiles', profiles);
  if (specs) sqlContent += generateInsert('specs', specs);
  if (quests) sqlContent += generateInsert('quests', quests);
  if (signals) sqlContent += generateInsert('signals', signals);
  if (meetings) sqlContent += generateInsert('meetings', meetings);
  if (contributions) sqlContent += generateInsert('contributions', contributions);
  if (notifications) sqlContent += generateInsert('notifications', notifications);

  // 3. Trigger Download
  const blob = new Blob([sqlContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ioi_backup_full_${timestamp}.sql`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};