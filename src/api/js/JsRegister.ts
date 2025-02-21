import * as authenticator from '../../utils/AuthenticatorHelper';
import { request } from '@playwright/test';

let jsContext;

export default class JsRegister{ 

public async register(registerBody: object, idn: String) { 
    jsContext = await request.newContext({
        baseURL: process.env.apiUrl!,
        extraHTTPHeaders: {
          'Authorization':'Bearer ' + await authenticator.tammAuth(),
        },
      });

      const responses = await jsContext.post('api/tamm/job-seekers/register', {
        headers:{ 
          'Current-Emirates-ID': idn
      },
        data: registerBody
      })

      return responses
    } 
}