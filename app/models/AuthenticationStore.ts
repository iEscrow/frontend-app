import { api } from "app/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

const UserModel = types.model({
  active: types.boolean,
  createdAt: types.string,
  email: types.string,
  first_name: types.string,
  id: types.integer,
  last_name: types.string,
  password: types.string,
  refer_code: types.string,
  referred_by: types.null,
  role: types.number,
  updatedAt: types.string,
  username: types.string,
})

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
    authUser: types.maybe(UserModel),
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
      api.apisauce.setHeader("Authorization", `Bearer ${token}`)
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
    },
    setAuthUser(value) {
      store.authUser = value
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
