import React, { useState } from 'react';
import Authentication from '../components/Authentication'; 

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Authentication>
      {/* Tabs */}
      <div className="flex gap-6 sm:gap-8 border-b border-gray-200 mb-8 sm:mb-10">
        <button className="pb-3 text-sm font-bold text-[#0a4073] border-b-2 border-[#0a4073]">
          Đăng nhập
        </button>
        <button className="pb-3 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
          Đăng ký tài khoản
        </button>
      </div>

      {/* Header Form: Chữ nhỏ hơn một chút trên mobile */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mừng bạn quay lại</h2>
        <p className="text-gray-500 text-sm">Vui lòng nhập thông tin để truy cập hồ sơ sức khỏe của bạn.</p>
      </div>

      {/* Login Form */}
      <form className="flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
        
        {/* Email Input */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
            Địa chỉ Email
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
            </div>
            <input
              type="email"
              className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a4073] focus:bg-white transition-all"
              placeholder="email@vi-du.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              Mật khẩu
            </label>
            <a href="#" className="text-xs font-bold text-[#0a4073] hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">lock</span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0a4073] focus:bg-white transition-all tracking-widest"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-gray-400 hover:text-gray-600 text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-[#0a4073] hover:bg-[#08335c] text-white py-3.5 rounded-lg text-sm font-bold transition-colors shadow-md"
        >
          Đăng nhập ngay
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        {/* Divider */}
        <div className="relative my-6 sm:my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-400 tracking-wider">HOẶC ĐĂNG NHẬP BẰNG</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex justify-center items-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Tiếp tục với Google
        </button>

        {/* Footer Text */}
        <div className="mt-6 sm:mt-auto pt-4 sm:pt-8">
          <p className="text-[11px] text-center text-gray-400">
            © 2024 University Medical Center. Bảo mật thông tin của bạn là ưu tiên hàng đầu của chúng tôi.
          </p>
        </div>
      </form>
    </Authentication>
  );
}