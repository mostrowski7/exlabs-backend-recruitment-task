export function snakeToCamelCase(text: string) {
  return text.replaceAll(/_[a-z]{1}/g, (match) => match.charAt(1).toUpperCase());
}

export function convertQueryResultKeys(obj: Record<string, unknown>) {
  const row: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const convertedKey = snakeToCamelCase(key);
    row[convertedKey] = value;
  }

  return row;
}
