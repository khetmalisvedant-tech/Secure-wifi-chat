import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const OperatorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const loadRequests = () => {
    axios.get("http://localhost:5000/api/operator/requests", {
      headers: { Authorization: token }
    }).then(res => setRequests(res.data.requests));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = (id, newStatus) => {
    axios.post(`http://localhost:5000/api/operator/update/${id}`, 
      { status: newStatus },
      { headers: { Authorization: token } }
    ).then(() => loadRequests());
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Operator Control Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <motion.div
            key={req._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-700 p-6 rounded-2xl shadow-xl backdrop-blur-lg"
          >
            <h2 className="text-xl font-semibold">
              User: {req.email}
            </h2>
            <p>Status:  
              <span className="font-bold text-indigo-300">
                {req.status.toUpperCase()}
              </span>
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => updateStatus(req._id, "approved")}
                className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(req._id, "rejected")}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OperatorDashboard;

