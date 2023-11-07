import { BugType } from "./bug"
import { ProjectType } from "./project"
import { UserType } from "./user"

export interface ProjectPropsType extends Props {
  project: ProjectType | null
}

export interface ProjectLinkPropsType extends ProjectPropsType {
  owner: UserType
}

export interface BugPropsType extends Props {
  bug: BugType
}

export interface UiPropsType extends React.PropsWithChildren {
  className?: string
}
