declare module '*.webp' {
  const value: {
    src: string;
    height: number;
    width: number;
    format: string;
  };
  export default value;
}

declare module '*.svg' {
  const src: string;
  export default src;
}