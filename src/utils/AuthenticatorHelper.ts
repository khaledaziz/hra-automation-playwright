import type { APIResponse } from '@playwright/test';
import { request } from '@playwright/test';

    export async function tammAuth() {
        // Read secrets from cloud and set as env vars
      
        // GET SERVICE API AUTH TOKEN
        try {
          const resp: APIResponse = await (
            await request.newContext({ ignoreHTTPSErrors: true })
          ).post(process.env.authUrl as string, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
                grant_type: process.env.grantType as string,
                client_id: process.env.clientId as string,
                client_secret: process.env.clientSecret as string
            },
            timeout: 300000,
          });
      
          const respJson = await resp.json();
          // set auth token as env variable
          return respJson.access_token;
      
        } catch (e) {
          console.error('Unable to authenticate. Occurred error: ' + e);
        }
      }

    export async function backofficeAuth() {
        // Read secrets from cloud and set as env vars
      
        // GET SERVICE API AUTH TOKEN
        try {
          const resp: APIResponse = await (
            await request.newContext({ ignoreHTTPSErrors: true })
          ).post(process.env.takafoAuthUrl as string, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
                username: process.env.takafoBackofficeUser as string,
                password: process.env.takafoBackofficePassword as string,
                grant_type: process.env.takafoGrantType as string,
                client_id: process.env.takafoClientId as string,
            },
            timeout: 300000,
          });
      
          const respJson = await resp.json();
          // set auth token as env variable
          return respJson.access_token;
      
        } catch (e) {
          console.error('Unable to authenticate. Occurred error: ' + e);
        }
      }
