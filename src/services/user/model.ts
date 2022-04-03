export interface IDataUserToken {
  accessToken: string
  refreshToken: string
}

export interface IDataUser {
  id?: string
  name?: string
  lastName?: string
  userName?: string
  email?: string
  password?: string
  githubId?: string
  token?: IDataUserToken | any
}

export interface IDataUserLogin {
  userName?: string
  password?: string
}
