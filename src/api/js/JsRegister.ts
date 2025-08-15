import * as authenticator from '../../utils/AuthenticatorHelper';
import ApiClients from '../../utils/ApiClient';
import { APIRequestContext, request } from '@playwright/test';

let jsContext: APIRequestContext;
//let apiClient: apiClients.ApiClient;
let apiReq = new ApiClients()

export default class JsRegister{ 

public async register(registerBody: object, idn: string) { 
    jsContext = await request.newContext({
        baseURL: process.env.apiUrl!,
        extraHTTPHeaders: {
          'Authorization':'Bearer ' + await authenticator.tammAuth(),
          'Current-Emirates-ID': idn
        },
      });

      const responses = await apiReq.postReq("api/tamm/job-seekers/register", jsContext, registerBody);

      return responses
    } 
}