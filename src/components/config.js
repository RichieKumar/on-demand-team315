import configJson from './auth_config.json';

export function getConfig() {
    const audience = configJson.audience && configJson.audience !== "https://dev-fp7u5r2i.us.auth0.com/api/v2/" ? configJson.audience : null;

    return {
        domain: configJson.domain,
        clientId: configJson.clientId,
        scope: configJson.scope,
        ...(audience ? { audience } : null),
    };
}