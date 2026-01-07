import React, { useEffect, useState } from "react";
import socket from "../socket";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export default function OperatorDashboard() {
  const [requests, setRequests] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    const res = await fetch("http://localhost:5000/api/wifi/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();

    // listen for new requests and status updates
    socket.on("wifi:new-request", (r) => {
      fetchRequests();
    });
    socket.on("wifi:update-status", (r) => {
      fetchRequests();
    });

    // user online/offline events (emit from backend)
    socket.on("user:online", (list) => setUsersOnline(list));
    socket.on("user:offline", (list) => setUsersOnline(list));

    return () => {
      socket.off("wifi:new-request");
      socket.off("wifi:update-status");
      socket.off("user:online");
      socket.off("user:offline");
    };
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/wifi/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    // backend will emit update; but refresh anyway
    fetchRequests();
  };

  // small analytics data
  const chartData = [
    { name: "Mon", value: 4 },
    { name: "Tue", value: 8 },
    { name: "Wed", value: 6 },
    { name: "Thu", value: 10 },
    { name: "Fri", value: 7 },
    { name: "Sat", value: 5 },
    { name: "Sun", value: 3 },
  ];

  return (
    <div className="container">
      <div className="header">
        <div className="title"><span className="logo-dot" /> Operator Dashboard</div>
        <div>
          <button className="btn" onClick={() => {localStorage.removeItem("token"); window.location.href = "/";}}>Logout</button>
        </div>
      </div>

      <div className="operator-grid">
        <div>
          <div className="card">
            <h3>Requests</h3>
            <div className="requests-list">
              {requests.length===0 ? <p>No requests yet</p> :
                requests.map(r => (
                  <div key={r._id} className="card" style={{marginBottom:12, padding:12}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <div>
                        <div style={{fontWeight:800, color:"#e6eef6"}}>{r.ssid} <span style={{fontSize:12, color:"var(--muted)"}}>by {r.user?.name || r.user}</span></div>
                        <div style={{marginTop:6, color:"var(--muted)"}}>{r.macAddress || "N/A"}</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{marginBottom:8}}>
                          <span className={`badge ${r.status==='pending'?'badge-pending':r.status==='approved'?'badge-approved':'badge-rejected'}`}>{r.status.toUpperCase()}</span>
                        </div>
                        {r.status === "pending" && (
                          <div>
                            <button className="btn" style={{marginRight:8}} onClick={()=>updateStatus(r._id,"approved")}>Approve</button>
                            <button className="btn btn-danger" onClick={()=>updateStatus(r._id,"rejected")}>Reject</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Live Chat (Operator)</h4>
            <div className="chat-box" id="operatorChat"></div>
            <div className="chat-input">
              <input className="input" placeholder="Type message..." />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>

        <aside>
          <div className="card chart-card">
            <h4>Requests (week)</h4>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#7cf3ff" />
                <YAxis stroke="#b86bff" />
                <Tooltip />
                <Bar dataKey="value" fill="#b86bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4>Users Online</h4>
            <div>
              {usersOnline.length===0 ? <p style={{color:'var(--muted)'}}>No users online</p> :
                usersOnline.map(u => (
                  <div key={u.id} style={{display:'flex', alignItems:'center', gap:10, padding:'6px 0'}}>
                    <div className="online-dot" style={{background: u.color || 'linear-gradient(90deg,#7cf3ff,#b86bff)'}}/>
                    <div>
                      <div style={{color:'#e6eef6'}}>{u.name || u.id}</div>
                      <div style={{fontSize:12, color:'var(--muted)'}}>{u.email || ''}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
