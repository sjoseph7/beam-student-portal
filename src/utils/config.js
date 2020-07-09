const config = {
  now: undefined,
  apiBaseUrl: 'https://beam-portal-api.herokuapp.com/api/v3',
}

// map environment overrides
const PROCESS_ENV_OVERRIDES = {
  REACT_APP_PORTAL_API_BASE_URL: 'apiBaseUrl',
}

for (const [env, key] of Object.entries(PROCESS_ENV_OVERRIDES)) {
  const value = process.env[env]
  if (value) config[key] = value
}

// map query string overrides
const QUERY_STRING_OVERRIDES = {
  now: 'now',
}

const params = new URLSearchParams(window.location.search)
for (const [param, key] of Object.entries(QUERY_STRING_OVERRIDES)) {
  const value = params.get(param)
  if (value != null) config[key] = value
}

export const getGlobalConfig = () => config
