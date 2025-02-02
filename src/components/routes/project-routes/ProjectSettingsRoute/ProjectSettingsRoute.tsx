import './ProjectSettingsRoute.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import useToggle from '../../../../hooks/useToggle'
import useFormState from '../../../../hooks/useFormState'
import { submit } from '../../../../utils/formHandler'
import { changeListen } from '../../../../utils/inputHandler'
import { UserContext } from '../../../../contexts/UserContext'
import { UtilitiesContext } from '../../../../contexts/UtilitiesContext'
import { SetProjectPropsType } from '../../../../types/props'
import PopUpMessage from '../../../PopUpMessage/PopUpMessage'
import Contributors from '../../../Contributors/Contributors'
import Panel from '../../../ui/Panel/Panel'

const ProjectSettingsRoute = (props: SetProjectPropsType) => {
  const userContext = useContext(UserContext)
  const utilitiesContext = useContext(UtilitiesContext)
  const [formState, setFormState] = useFormState({
    name: props.project.name, 
    git_url: props.project.git_url,
    is_private: props.project.is_private
  })
  const [isUrlPresent, toggleUrlPresent] = useToggle(props.project.git_url.length ? true : false )
  const [isOwner] = useToggle(props.project.owner.id === userContext?.user.id ? true : false)
  const navigate = useNavigate()

  const deleteProject = async () => {
    try {
      await utilitiesContext?.load(userContext?.deleteProject(props.project))
      navigate('/')
    } catch {
      utilitiesContext?.showPopUp(<PopUpMessage msg='Error in deleting project!' />)
    }
  }

  const leaveProject = async () => {
    try {
      await utilitiesContext?.load(userContext?.leaveProject(props.project))
      navigate('/')
    } catch {
      utilitiesContext?.showPopUp(<PopUpMessage msg='Error in leaving project!' />)
    }
  }

  const renameProject = async () => {
    try {
      await utilitiesContext?.load(userContext?.patchProject(props.project, {name: formState.name}, props.setProject))
    } catch {
      utilitiesContext?.showPopUp(<PopUpMessage msg='Error in renaming project!' />)
    }
  }

  const updateVisibilityProject = async () => {
    try {
      await utilitiesContext?.load(userContext?.patchProject(props.project, {is_private: formState.is_private}, props.setProject))
    } catch {
      utilitiesContext?.showPopUp(<PopUpMessage msg='Error in updating visibility!' />)
    }
  }

  const updateGitLink = async (deleteMode: Boolean = false) => {
    try {
      if (!deleteMode) {
        await utilitiesContext?.load(userContext?.patchProject(props.project, {git_url: formState.git_url}, props.setProject))
        if (!isUrlPresent) toggleUrlPresent()
      } else {
        await utilitiesContext?.load(userContext?.patchProject(props.project, {git_url: ''}, props.setProject))
        setFormState({...formState, git_url: ''})
        if (isUrlPresent) toggleUrlPresent()
      }
    } catch {
      utilitiesContext?.showPopUp(<PopUpMessage msg='Error in updating Git link!' />)
    }
  }
  
  return (
    <div className='project-settings'>
      <Panel>
        <h1>Settings</h1>
        
        <form onSubmit={(evt) => submit(evt, renameProject)}>
          <label htmlFor='name'>{isOwner ? 'Rename Project' : 'Project Name'}</label>

          {isOwner ? (
            <input
              type='text'
              name='name'
              id='name'
              required
              value={formState.name}
              onChange={(evt) => changeListen(evt, formState, setFormState)}
            />
          ) : (
            <input
              value={formState.name}
              disabled
            />
          )}
          
          {isOwner &&
            <div className='btns'>
              <button className='success'>Rename</button>
            </div>
          }
        </form>

        <form onSubmit={(evt) => submit(evt, updateGitLink)}>
          <label htmlFor='git_url'>
            {isOwner ? (isUrlPresent ? 'Change Git Url' : 'Add Git Url') : 'Git Url'}
          </label>

          {isOwner ? (
            <input
              type='url'
              name='git_url'
              id='git_url'
              placeholder='https://git-url.com'
              value={formState.git_url}
              onChange={(evt) => changeListen(evt, formState, setFormState)}
            />
          ) : (
            <input
              value={formState.git_url}
              disabled
            />
          )}
          

          {isOwner &&
            <div className='btns'>
              <button className='success' type='submit'>{isUrlPresent ? "Change" : "Add"}</button>

              {isUrlPresent &&
                <button className='danger' onClick={() => updateGitLink(true)} type='button'>Remove Url</button>  
              }
            </div>
          }
        </form>

        <div className='visibility'>
          {isOwner ? (
            <div>
              <div className='radio-container'>
                <input 
                  type='radio' 
                  id='public' 
                  value='false' 
                  name='is_private'
                  checked={formState.is_private ? false : true} 
                  onChange={(evt) => changeListen(evt, formState, setFormState)}
                />
                <label htmlFor="public">Public</label>
              </div>
                
              <div className='radio-container'>
                <input 
                  type='radio' 
                  id='private' 
                  value='true' 
                  name='is_private'
                  checked={formState.is_private ? true : false}
                  onChange={(evt) => changeListen(evt, formState, setFormState)}
                />
                <label htmlFor="private">Private</label>
              </div>

              <button className='success' onClick={updateVisibilityProject}>Save</button>
            </div>
          ) : (
            <p>Visibility: {props.project.is_private ? 'Private' : 'Public'}</p>
          )}
        </div>

        <div className='contributors'>
          <h2>Contributors</h2>
          <Contributors project={props.project} setProject={props.setProject} isOwner={isOwner} />
        </div>
        
        {isOwner ? (
            <button className='danger delete-project' onClick={deleteProject}>Delete Project</button>
          ) : (
            <button className='danger delete-project' onClick={leaveProject}>Leave Project</button>
          )
        }
      </Panel>
    </div>
  )
}

export default ProjectSettingsRoute