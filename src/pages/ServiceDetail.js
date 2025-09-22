"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

// Legacy placeholder: prefer /service/[id]
export default function ServiceDetailLegacy() {
  const router = useRouter()

  useEffect(() => {
    // If someone navigates here with ?id=123, redirect to the canonical route
    const qid = router.query?.id
    if (qid) {
      router.replace(`/service/${qid}`)
    }
  }, [router])

  return (
    <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2>Service detail has moved</h2>
      <p>
        Please use the canonical route: <code>/service/&lt;id&gt;</code>
      </p>
    </div>
  )
}
