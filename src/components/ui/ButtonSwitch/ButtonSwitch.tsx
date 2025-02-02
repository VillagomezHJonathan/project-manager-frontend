import './ButtonSwitch.css'
import useToggle from '../../../hooks/useToggle'
import { UiPropsType } from '../../../types/props'

const ButtonSwitch = (props: UiPropsType & {onClick: () => void}) => {
  const [isClicked, toggleIsClicked] = useToggle(false)
  const classesBase: string = `btn-switch ${props.className ? props.className : ''}`
  const classes = `${isClicked ? 'danger' : ''} ${classesBase}`

  const clickHandler = () => {
    toggleIsClicked()
    props.onClick()
  }
  
  return (
    <button onClick={clickHandler} className={classes}>
      {!isClicked ? props.children : 'X'}
    </button>
  )
}

export default ButtonSwitch