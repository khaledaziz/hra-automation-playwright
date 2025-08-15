import { APIRequestContext, expect } from '@playwright/test';

/**
 * Represents a generic API client for making HTTP requests.
 */
 export default class ApiClient {
   //private requestContext: APIRequestContext;
  // private baseURL: string;

  // /**
  //  * Initializes a new instance of the ApiClient.
  //  * @param requestContext The Playwright APIRequestContext object.
  //  * @param baseURL The base URL for the API.
  //  */
  // constructor(requestContext: APIRequestContext, baseURL: string) {
  //   this.requestContext = requestContext;
  //   //this.baseURL = baseURL;
  // }

//   /**
//    * Sends a GET request.
//    * @param url The endpoint URL (relative to baseURL).
//    * @param params Optional query parameters.
//    * @returns The APIResponse object.
//    */
//   async get(url: string, params?: object) {
//     return this.requestContext.get(`${this.baseURL}${url}`, { params });
//   }

  /**
   * Sends a POST request.
   * @param url The endpoint URL (relative to baseURL).
   * @param requestContext The request context (relative to baseURL).
   * @param data Optional request body.
   * @returns The APIResponse object.
   */
  async postReq(url: string, requestContext: APIRequestContext, data?: object) {
    return await requestContext.post(url,  { data });
  }

  /**
   * Sends a PUT request.
   * @param url The endpoint URL (relative to baseURL).
   * @param data Optional request body.
   * @returns The APIResponse object.
   */
  // async put(url: string, data?: object) {
  //   return this.requestContext.put(`${this.baseURL}${url}`, { data });
  // }

  // /**
  //  * Sends a DELETE request.
  //  * @param url The endpoint URL (relative to baseURL).
  //  * @returns The APIResponse object.
  //  */
  // async delete(url: string) {
  //   return this.requestContext.delete(`${this.baseURL}${url}`);
  // }

  // /**
  //  * Sends a PATCH request.
  //  * @param url The endpoint URL (relative to baseURL).
  //  * @param data Optional request body.
  //  * @returns The APIResponse object.
  //  */
  // async patch(url: string, data?: object) {
  //   return this.requestContext.patch(`${this.baseURL}${url}`, { data });
  // }
}