export type TagKey = 'PYTHON' | 'STREAMLIT' | 'TAILWIND' | 'TYPESCRIPT' | 'NAVE' | 'REACT' | 'POLARS' | 'PLAYWIRiGHT' | 'VITE';

export interface Project {
  title: string;
  description: string;
  image: string;     
  tags: TagKey[];    
  link?: string;     
}
