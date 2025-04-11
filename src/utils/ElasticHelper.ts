import { request } from '@playwright/test';



export default class ElasticHelper {

    public async deleteJs(emiratesId: String) {
        let elasticContext = await request.newContext({baseURL: process.env.elasticUrl!});
        let response = await elasticContext.post('takafo_jobseeker_idx_v5/_delete_by_query', { // Replace with your Elasticsearch endpoint
            data: {
              query: {
                match: {
                  emiratesId: emiratesId,
                },
              },
            }})
            return response;

}
}