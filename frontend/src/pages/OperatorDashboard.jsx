import React, { useEffect, useState } from "react";
import axios from "axios";

function OperatorDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wifi/requests");
      setRequests(res.data.requests);
    } catch (error) {
      console.error("Error fetching requests", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/wifi/approve/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/wifi/reject/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1d2b64, #f8cdda)",
      padding: "40px",
      fontFamily: "Poppins, Arial"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "white",
        fontSize: "40px",
        marginBottom: "30px"
      }}>
        📡 Operator Dashboard
      </h1>

      <div style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        maxWidth: "900px",
        margin: "auto",
        boxShadow: "0 10px 35px rgba(0,0,0,0.2)"
      }}>
        
        <h2 style={{ marginBottom: "15px" }}>Pending Wi-Fi Access Requests</h2>

        {requests.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#777" }}>No pending requests 🎉</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th>ID</th>
                <th>User Email</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req._id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                  <td>{req._id}</td>
                  <td>{req.email}</td>
                  <td>{req.reason}</td>

                  <td>
                    <button
                      onClick={() => handleApprove(req._id)}
                      style={{
                        padding: "6px 14px",
                        background: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "8px"
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      style={{
                        padding: "6px 14px",
                        background: "#e63946",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}

export default OperatorDashboard;

