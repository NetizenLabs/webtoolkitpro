self.onmessage = (e: MessageEvent<{ code: string; indent: number }>) => {
  const { code, indent } = e.data;
  
  try {
    const parsed = JSON.parse(code);
    const result = JSON.stringify(parsed, null, indent);
    self.postMessage({ result });
  } catch (error: any) {
    self.postMessage({ error: error.message || 'Invalid JSON syntax' });
  }
};
