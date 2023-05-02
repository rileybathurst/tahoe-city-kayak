import * as React from "react"

const ConsolePage = () => {
  return (
    <>
      hey
      <button onClick={() => console.error('🦖')}>
        Error
      </button >
    </>
  )
}

export default ConsolePage
