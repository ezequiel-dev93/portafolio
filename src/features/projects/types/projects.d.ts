export type TagKey = 'PYTHON' | 'STREAMLIT' | 'TAILWIND' | 'TYPESCRIPT' | 'NAVE' | 'REACT' | 'POLARS' | 'PLAYWRIGHT' | 'VITE' | 'SUPABASE' | 'AWS';

export interface Project {
  title: string;
  description: string;    
  tags: TagKey[];    
  link?: string;     
}
