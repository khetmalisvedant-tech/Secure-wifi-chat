import React, { useState, useEffect } from "react";
import socket from "../socket";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export default function Dashboard() {
  const [ssid, setSsid] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [requests, setRequests] = useState([]);
  const [chartData, setChartData] = useState([]);

  const token = localStorage.getItem("token");

  // fetch personal requests
  const fetchRequests = async () => {
    const res = await fetch("http://localhost:5000/api/wifi/my-requests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();

    // listen for status updates to this user's requests
    socket.on("wifi:update-status", (updated) => {
      // if this update belongs to this user, refresh
      const userId = updated.user?.toString?.() || updated.user;
      // if your backend returns populated user on update, you can check; otherwise refresh anyway
      fetchRequests();
    });

    // get chart data (optionally from a backend analytics route; here we derive locally)
    return () => {
      socket.off("wifi:update-status");
    };
  }, []);

  // submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/wifi/request", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ssid, macAddress }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Failed to submit request.");
      setSsid(""); setMacAddress("");
      fetchRequests();
      alert("Request submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title"><span className="logo-dot" /> User Dashboard</div>
        <div>
          <button className="btn" onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}>Logout</button>
        </div>
      </div>

      <div className="card">
        <h3>Request Wi-Fi Access</h3>
        <form onSubmit={handleSubmit} style={{display:'grid', gap:10}}>
          <input className="input" placeholder="SSID (Network Name)" value={ssid} onChange={(e)=>setSsid(e.target.value)} />
          <input className="input" placeholder="MAC Address (Optional)" value={macAddress} onChange={(e)=>setMacAddress(e.target.value)} />
          <div style={{display:'flex', gap:10}}>
            <button type="submit" className="btn btn-primary">Submit Request</button>
            <button type="button" className="btn" onClick={fetchRequests}>Refresh</button>
          </div>
        </form>
      </div>

      <div className="row">
        <div style={{flex:1}}>
          <div className="card">
            <h3>My Requests</h3>
            {requests.length === 0 ? <p>No requests yet</p> : (
              <div className="requests-list">
                {requests.map(r => (
                  <div key={r._id} style={{padding:'12px', borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div><strong style={{color:'#fff'}}>{r.ssid}</strong><div style={{fontSize:13, color:'var(--muted)'}}>MAC: {r.macAddress || 'N/A'}</div></div>
                      <div>
                        <span className={`badge ${r.status === 'pending' ? 'badge-pending' : r.status === 'approved' ? 'badge-approved' : 'badge-rejected'}`} style={{fontSize:12}}>{r.status}</span>
                      </div>
                    </div>
                    <div style={{marginTop:8, fontSize:13, color:'var(--muted)'}}>Date: {new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{width:360}}>
          <div className="card chart-card">
            <h4 style={{marginTop:0}}>Requests (recent)</h4>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#7cf3ff" />
                <YAxis stroke="#b86bff" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#7cf3ff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <small style={{color:'var(--muted)'}}>Live analytics coming soon</small>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h4 style={{marginTop:0}}>Live Chat (Ephemeral)</h4>
            {/* Placeholder for chat; your existing chat UI can be reused here */}
            <div className="chat-box" id="chatBox"></div>
            <div className="chat-input">
              <input className="input" placeholder="Type a message..." />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
