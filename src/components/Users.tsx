import { useEffect, useState } from 'react'
import '../styles/Users.css'
import Panel from './ui/Panel'
import useFormState from '../hooks/useFormState'
import { changeListen } from '../utils/inputHandler'
import { submit } from '../utils/formHandler'

const Users = () => {
  const [formState, setFormState, resetFormState] = useFormState(['identifier'])

  const submitHandler = async () => {
    console.log(formState)
  }

  return (
    <Panel>
      <h2>Users</h2>

      <form onSubmit={(evt) => submit(evt, submitHandler)}>
        <label htmlFor='identifier'>Search User</label>
        <input 
          type='text'
          id='identifier'
          name='identifier'
          placeholder='Email or Username'
          required
          value={formState.identifier}
          onChange={(evt) => changeListen(evt, formState, setFormState)}
        />

        <button>Search</button>
      </form>
    </Panel>
  )
}

export default Users