import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [ssid, setSsid] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch user's Wi-Fi requests
  const fetchRequests = async () => {
    const res = await fetch("http://localhost:5000/api/wifi/my-requests", {
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

  // Submit new Wi-Fi request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/wifi/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ssid, macAddress }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error submitting request");
      return;
    }

    alert("Wi-Fi Request Submitted!");
    setSsid("");
    setMacAddress("");

    fetchRequests(); // refresh list
  };

  return (
    <div style={{ width: "60%", margin: "40px auto" }}>
      <h2>User Dashboard 🚀</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        style={{ float: "right" }}
      >
        Logout
      </button>

      <h3>Request Wi-Fi Access</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="SSID (Network Name)"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="MAC Address (Optional)"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
        />
        <br /><br />

        <button type="submit">Submit Request</button>
      </form>

      <h3>My Requests</h3>

      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        {requests.length === 0 ? (
          <p>No requests submitted yet.</p>
        ) : (
          requests.map((r) => (
            <div
              key={r._id}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px 0",
              }}
            >
              <strong>SSID:</strong> {r.ssid} <br />
              <strong>MAC:</strong> {r.macAddress || "N/A"} <br />
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    r.status === "approved"
                      ? "green"
                      : r.status === "rejected"
                      ? "red"
                      : "orange",
                }}
              >
                {r.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
