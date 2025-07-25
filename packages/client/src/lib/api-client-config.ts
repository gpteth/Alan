import { alanClient, type ApiClientConfig } from '@alanos/api-client';

export function createApiClientConfig(): ApiClientConfig {
  const getLocalStorageApiKey = () => `alan-api-key-${window.location.origin}`;
  const apiKey = localStorage.getItem(getLocalStorageApiKey());

  const config: ApiClientConfig = {
    baseUrl: window.location.origin,
    timeout: 30000,
    headers: {
      Accept: 'application/json',
    },
  };

  // Only include apiKey if it exists (don't pass undefined)
  if (apiKey) {
    config.apiKey = apiKey;
  }

  return config;
}

// Singleton instance
let alanClientInstance: alanClient | null = null;

export function createalanClient(): alanClient {
  if (!alanClientInstance) {
    alanClientInstance = alanClient.create(createApiClientConfig());
  }
  return alanClientInstance;
}

export function getalanClient(): alanClient {
  return createalanClient();
}

// Function to reset the singleton (useful for API key changes)
export function resetalanClient(): void {
  alanClientInstance = null;
}

export function updateApiClientApiKey(newApiKey: string | null): void {
  const getLocalStorageApiKey = () => `alan-api-key-${window.location.origin}`;

  if (newApiKey) {
    localStorage.setItem(getLocalStorageApiKey(), newApiKey);
  } else {
    localStorage.removeItem(getLocalStorageApiKey());
  }

  // Reset the singleton so it uses the new API key
  resetalanClient();
}
