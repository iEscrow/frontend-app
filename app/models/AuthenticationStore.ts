import { api } from "app/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationEmailError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      return ""
    },
    get validationPasswordError() {
      if (store.authPassword.length === 0) return "can't be blank"
      if (store.authPassword.length < 6) return "must be at least 6 characters"
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, "")
    },
    distributeAuthToken(value?: string) {
      const token = value || store.authToken
      api.apiSauce.setHeader("Authorization", `Bearer ${token}`)
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
