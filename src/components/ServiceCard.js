import Link from "next/link"

const ServiceCard = ({ service }) => {
  return (
    <div className="card">
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={service.imageUrl || "/placeholder.svg"}
          alt={service.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#3b82f6",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          ₹{service.price}
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1e293b",
              margin: 0,
            }}
          >
            {service.name}
          </h3>
          <span
            style={{
              background: "#f1f5f9",
              color: "#475569",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {service.category}
          </span>
        </div>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            lineHeight: "1.5",
            marginBottom: "16px",
          }}
        >
          {service.description.length > 100
            ? `${service.description.substring(0, 100)}...`
            : service.description}
        </p>

        <Link href={`/service/${service.id}`} className="btn btn-primary" style={{ width: "100%" }}>
          Book Service
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard
