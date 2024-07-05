/* eslint-disable camelcase */
import { ApiResponse, ApisauceInstance, create } from 'apisauce';
import { Toast } from 'toastify-react-native';

import Config from '../../config';
import { GeneralApiProblem, getGeneralApiProblem } from './apiProblem';

import type { ApiConfig, ApiFeedResponse } from "./api.types"
/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 30,
}

type Currency = {
  Country: {
    Country: Object | null
    country_id: number | null
  } | null
  CurrencyType: Object
  Token: Object | null
  TokenStandard: Object | null
  country_id: number | null
  id: number
  name: string
  token_id: number | null
  token_standard_id: number | null
  type: number
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
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.post(`/users/login`, {
      username,
      password,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response.data.error)
      Toast.error(response.data.error, "top")
      if (problem) return problem
    }

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
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`/escrows/marketplace`)

    if (response.status === 403)
      return getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 403 })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async myEscrows(): Promise<
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
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`/escrows/my-escrows`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async createEscrow({
    payer_currency,
    payee_currency,
    type,
  }: {
    payer_currency: Currency
    payee_currency: Currency
    type: number
  }): Promise<GeneralApiProblem> {
    const body = {
      payer_currency,
      payee_currency,
      type,
    }
    console.log(body)
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.post(`/escrows`, body)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async publishEscrow({ escrow }): Promise<GeneralApiProblem> {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.post(`/escrows`, escrow)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async buyEscrow(id: string): Promise<
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

    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.put(`/escrows/buy/${id}`)
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

  async getCurrencies() {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`/currencies`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getBankAccounts() {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get("/bank-account")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { data: response.data }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getFooter() {
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get("/footer")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
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
