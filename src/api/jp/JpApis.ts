import * as authenticator from '../../utils/AuthenticatorHelper';
import { request } from '@playwright/test';



export default class JpCreation {

    public async jpCreate(jpBody: object, idn: String) {
        let jpContext = await request.newContext({
            baseURL: process.env.apiUrl!,
            extraHTTPHeaders: {
                'Authorization': 'Bearer ' + await authenticator.backofficeAuth(),
                'Content-Type': 'application/json',
            },
        });

        const responses = await jpContext.post('saveVacancy', {
            data: jpBody
        })

        return responses
    }

    public async jpActivate(jpId: String) {
        let jpActivateContext = await request.newContext({
            baseURL: process.env.apiUrl!,
            extraHTTPHeaders: {
                'Authorization': 'Bearer ' + await authenticator.backofficeAuth(),
            },
        });

        const responses = await jpActivateContext.post('activateVacancy', {
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'application/json, text/plain, */*'
            },
            data: jpId
        })
    }

    public async algCreate(algBody: object) {
        let algContext = await request.newContext({
            baseURL: process.env.baseApiUrl!,
            extraHTTPHeaders: {
                'Authorization': 'Bearer ' + await authenticator.backofficeAuth(),
            },
        });

        const responses = await algContext.post('aws/saveAlgorthimTemplate', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: algBody
        })

        return responses
    }

    public async jpClose(jpId: String) {
        let jpClosureContext = await request.newContext({
            baseURL: process.env.apiUrl!,
            extraHTTPHeaders: {
                'Authorization': 'Bearer ' + await authenticator.backofficeAuth(),
            },
        });

        const responses = await jpClosureContext.post('closeVacancy', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                'id': jpId,
                'comment': 'test',
                'reason': 'VACANCY_EXPIRED',
            }
        })
    }
}