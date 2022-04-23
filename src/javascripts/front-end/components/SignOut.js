import React from 'react'
import Avatar from 'react-avatar';
import { toast } from 'react-toastify'

export default function SignOut({displayName}) {
  const signUserOut = () => {
    fetch('/api/users/signout', {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(data => {
      toast.success(`Successfully logged out`, {onClose: () => {
        document.location = "/meals"
      }})
    })
    .catch(err => {
      toast.error(err.message)
    });
  }

  return (
    <>
      <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><Avatar size={30} name={displayName}/> {displayName}</a>
      <ul className="dropdown-menu" style={{right: 0, left: 'auto'}}>
        <li><a href="/profile" className="dropdown-item">Profile</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" onClick={signUserOut}>Sign out</a></li>
      </ul>
    </>
  )
}