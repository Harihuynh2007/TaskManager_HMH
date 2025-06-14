import React, { useState } from 'react';

function ChangePasswordSection() {
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = security;
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("❌ Mật khẩu mới không khớp");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch("http://127.0.0.1:8000/api/accounts/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đổi mật khẩu thất bại");

      alert("✅ Đổi mật khẩu thành công");
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input
          type="password"
          value={security.currentPassword}
          onChange={e => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          value={security.newPassword}
          onChange={e => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          value={security.confirmPassword}
          onChange={e => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleChangePassword}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition mt-2"
      >
        Change Password
      </button>
    </div>
  );
}

export default ChangePasswordSection;
