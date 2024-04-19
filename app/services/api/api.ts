import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

import type { ApiConfig, ApiFeedResponse } from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode"
import { getRootStore, useStores } from "app/models"
import { Toast } from "toastify-react-native"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */

  async login({ username, password }): Promise<
    | {
        user: {
          id: number
          username: string
          email: string
          password: string
          updatedAt: string
          createdAt: string
        }
        token: string
      }
    | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.post(`/users/login`, {
      username,
      password,
    })
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response.data.error)
      Toast.error(response.data.error, "top")
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      Toast.success("Logueado con exito!", "top")
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async escrows(): Promise<
    | {
        user: {
          id: number
          username: string
          email: string
          password: string
          updatedAt: string
          createdAt: string
        }
        token: string
      }
    | GeneralApiProblem
  > {
    // make the api call

    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`/escrows`)
    console.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
