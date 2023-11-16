import { ProjectPayloadType, ProjectType } from "./project"

export interface UserPayloadType {
  id: number | null,
  name: string,
  username: string,
  email: string
}

export interface UserType extends UserPayloadType {
  projects: ProjectType[]
}

export interface UserContextType {
  user: UserType,
  setUser: (user: UserType) => void,
  updateUser: () => void,
  findProject: (name: string) => ProjectType | null,
  postProject: (payload: ProjectPayloadType) => void,
  deleteProject: (id: number) => void,
  authenticated: Boolean,
  toggleAuthenticated: (bool?: Boolean) => any[],
  handleLogout: () => void
}