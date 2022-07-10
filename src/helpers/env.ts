export type EnvVariables = {
    REACT_APP_WEBSOCKET_ENDPOINT: string
};

/**
 * Get environment variable value by key from .env
 */
export function getEnv<T extends keyof EnvVariables>(key: T): string {
    const envVariableValue = process.env[key];

    if (envVariableValue === undefined) {
        throw new Error(`${key} not found in .env config!`);
    }

    return envVariableValue;
}
