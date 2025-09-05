export type TagKey = 'PYTHON' | 'STREAMLIT' | 'TAILWIND' | 'TYPESCRIPT' | 'NAVE' | 'REACT' | 'POLARS' | 'PLAYWIRiGHT';

export interface Project {
  title: string;
  description: string;
  image: string;     
  tags: TagKey[];    
  link?: string;     
}
