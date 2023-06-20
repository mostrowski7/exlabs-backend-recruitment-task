function snakeToCamelCase(text: string) {
  return text.replaceAll(/_[a-z]{1}/g, (match) => match.charAt(1).toUpperCase());
}

function camelCaseToSnake(text: string) {
  return text.replaceAll(/[A-Z]/g, (match) => '_' + match.toLowerCase());
}

function convertObjectKeys(obj: Record<string, unknown>, target: 'snake' | 'camel' = 'camel') {
  const row: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const convertedKey = target === 'camel' ? snakeToCamelCase(key) : camelCaseToSnake(key);
    row[convertedKey] = value;
  }

  return row;
}

function transformObjectToQueryColumnsAndParams(obj: Record<string, unknown>): {
  params: unknown[];
  columns: string;
} {
  const columns = Object.keys(obj)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');

  return { params: Object.values(obj), columns };
}

export { convertObjectKeys, transformObjectToQueryColumnsAndParams };
