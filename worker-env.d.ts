declare module '*.html' {
  const content: string;
  export default content;
}

interface Env {
  KV: KVNamespace;
  NABULIFE_TOKEN?: string;
}
