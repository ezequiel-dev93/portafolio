export type TagKey =
  | 'PYTHON'
  | 'PYDANTIC'
  | 'STREAMLIT'
  | 'TAILWIND'
  | 'TYPESCRIPT'
  | 'NAVE'
  | 'REACT'
  | 'POLARS'
  | 'PLAYWRIGHT'
  | 'VITE'
  | 'SUPABASE'
  | 'AWS'
  | 'POSTGRESQL';

export interface Project {
  title: string;
  description: string;
  tags: TagKey[];
  github?: string;
  web?: string;
  link?: string;
}
