import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { showToast } from '../store/uiSlice';
import axiosClient from '../api/axiosClient';
import { User, MapPin, Lock, Save } from 'lucide-react';

const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState(localStorage.getItem('default_address') || '');

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosClient.put('users/password/', { password });
      dispatch(showToast({ message: 'Password updated successfully!', type: 'success' }));
      setPassword('');
    } catch {
      dispatch(showToast({ message: 'Failed to update password.', type: 'error' }));
    }
  };

  const handleAddressSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('default_address', address);
    dispatch(showToast({ message: 'Default address saved!', type: 'success' }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Account Settings</h1>

        {/* User Info Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-4 rounded-full text-emerald-600">
                    <User size={32} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">My Profile</h2>
                    <p className="text-slate-500">{userInfo?.email}</p>
                </div>
            </div>
        </div>

        {/* Default Address Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-slate-400" /> Default Shipping Address
            </h3>
            <form onSubmit={handleAddressSave} className="flex gap-4">
                <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your default address"
                    className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button type="submit" className="bg-slate-900 text-white px-6 rounded-xl font-bold hover:opacity-90">
                    Save
                </button>
            </form>
        </div>

        {/* Password Update Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-slate-400" /> Security
            </h3>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-600 mb-2">New Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                </div>
                <button type="submit" className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <Save size={18} /> Update Password
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;