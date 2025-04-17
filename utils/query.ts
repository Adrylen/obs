export const joinQueryParameters = 
  (baseParameters: Record<string, string | undefined>) => 
  (overrideParameters: Record<string, string | undefined> = {}) => 
    Object
      .entries({ ...baseParameters, ...overrideParameters })
      .filter(([_, value]) => !!value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
