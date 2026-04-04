import { useEffect, useState } from "react";
import api from "../api/axios";
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaBoxOpen, 
  FaSignOutAlt, 
  FaShieldAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user details", err);
        // If token is invalid or expired, redirect to login
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Hard refresh to clear all states
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
            <p className="text-gray-500">Manage your profile and viewing preferences</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel: Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaUserCircle className="text-purple-200" size={100} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
                {user?.username || "Guest User"}
              </h2>
              <p className="text-purple-600 font-medium text-sm mb-6 uppercase tracking-widest">
                Verified Member
              </p>
              <div className="pt-6 border-t border-gray-50 flex justify-around text-sm text-gray-500">
                <div>
                  <p className="font-bold text-gray-800">12</p>
                  <p>Orders</p>
                </div>
                <div className="border-l border-gray-100 h-10"></div>
                <div>
                  <p className="font-bold text-gray-800">4</p>
                  <p>Reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Information Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Info Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <FaShieldAlt className="text-purple-600" />
                <h3 className="font-bold text-gray-800 underline decoration-purple-200 decoration-4 underline-offset-4">
                  Profile Information
                </h3>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Email Address</p>
                    <p className="text-gray-700 font-medium">{user?.email || "Not Available"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                    <FaCalendarAlt size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Member Since</p>
                    <p className="text-gray-700 font-medium">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History Card (Placeholder) */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-50 flex items-center gap-2">
                <FaBoxOpen className="text-purple-600" />
                <h3 className="font-bold text-gray-800 underline decoration-purple-200 decoration-4 underline-offset-4">
                  Order History
                </h3>
              </div>
              <div className="p-12 text-center">
                <p className="text-gray-400 italic">You haven't placed any orders yet.</p>
                <button 
                  onClick={() => navigate("/")}
                  className="mt-4 text-purple-600 font-bold hover:underline"
                >
                  Start Shopping →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}