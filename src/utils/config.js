const config = {
    useDemoDateTimeForSchedule: true,
    apiBaseUrl: "https://beam-portal-api.herokuapp.com/api/v3"
}

// map environment overrides
const PROCESS_ENV_OVERRIDES = {
    'REACT_APP_PORTAL_API_BASE_URL': 'apiBaseUrl'
}

for (const [env, key] of Object.entries(PROCESS_ENV_OVERRIDES)) {
    const value = process.env[env]
    if (value) config[key] = value
}

export const getGlobalConfig = () => config
