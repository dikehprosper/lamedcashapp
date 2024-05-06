'use client' // Error components must be Client Components
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div style={{display:"flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px"}}>
      <h2>Oops!....Something went wrong</h2>
      <button
      style={{height: "50px",  width: "130px", background: "transparent", borderRadius: "25px", border: "1px solid gray", fontWeight: "700", color: "white" }}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}