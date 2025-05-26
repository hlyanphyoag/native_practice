import React, { useState } from 'react'

const splashHook = () => {
  const [isAppReady, setIsAppReady ] = useState<boolean>(false)
  return {
    isAppReady,
    setIsAppReady
  }
}

export default splashHook