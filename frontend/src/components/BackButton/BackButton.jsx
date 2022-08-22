import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledBackButton } from './BackButton.styles'

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <StyledBackButton onClick={e => navigate(-1)}> - Back</StyledBackButton>
  )
}

export default BackButton