export type TagKey = 'PYTHON' | 'STREAMLIT' | 'TAILWIND' | 'TYPESCRIPT' | 'NAVE' | 'REACT' | 'POLARS' | 'PLAYWIRiGHT' | 'VITE';

export interface Project {
  title: string;
  description: string;
  image: any;     
  tags: TagKey[];    
  link?: string;     
}
