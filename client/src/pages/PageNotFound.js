import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>
      <h1> Page Not Found! :/</h1>
      <h3> Try These Links: </h3>
      <Link id="nav-brand" to="/"> PartyCards </Link>
    </div>
  )
}

export default PageNotFound
