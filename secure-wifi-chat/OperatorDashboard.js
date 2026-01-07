import React, { useEffect, useState } from "react";

export default function OperatorDashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch ALL requests
  const fetchRequests = async () => {
    const res = await fetch("http://localhost:5000/api/wifi/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve or Reject
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/wifi/update-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchRequests(); // refresh list
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h2>Operator Dashboard ⚡</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{ float: "right" }}
      >
        Logout
      </button>

      <h3>Pending Wi-Fi Access Requests</h3>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "15px",
              background: "#f9f9f9",
            }}
          >
            <strong>User:</strong> {req.user?.name} ({req.user?.email}) <br />
            <strong>SSID:</strong> {req.ssid} <br />
            <strong>MAC:</strong> {req.macAddress || "N/A"} <br />
            <strong>Status:</strong>{" "}
            <span
              style={{
                color:
                  req.status === "approved"
                    ? "green"
                    : req.status === "rejected"
                    ? "red"
                    : "orange",
                fontWeight: "bold",
              }}
            >
              {req.status.toUpperCase()}
            </span>
            <br />
            <br />

            {req.status === "pending" && (
              <>
                <button
                  style={{
                    padding: "6px 12px",
                    marginRight: "10px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => updateStatus(req._id, "approved")}
                >
                  APPROVE
                </button>

                <button
                  style={{
                    padding: "6px 12px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => updateStatus(req._id, "rejected")}
                >
                  REJECT
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
