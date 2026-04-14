import React from 'react';

export default function Authentication({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 relative font-sans">
      
      {/* Main Card: Tự động điều chỉnh chiều cao trên mobile, cố định chiều cao tối thiểu trên desktop */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row min-h-[auto] lg:min-h-[700px]">
        
        {/* Cột trái (Branding): Ẩn hoàn toàn trên thiết bị có màn hình nhỏ hơn 'lg' (desktop) */}
        <div className="hidden lg:flex w-1/2 bg-[#0a4073] p-12 flex-col justify-between text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-md flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0a4073]">health_and_safety</span>
            </div>
            <span className="font-bold text-xl tracking-wide">University Medical Center</span>
          </div>

          {/* Main Content */}
          <div className="mt-10 mb-20">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Sanctuary of <br /> Care.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Chào mừng bạn đến với hệ thống đặt lịch khám bệnh trực tuyến. Chúng tôi kết nối bạn với những chuyên gia y tế hàng đầu trong một không gian an tâm và tin cậy.
            </p>
          </div>

          {/* Footer - Avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-[#0a4073] object-cover" src="https://i.pravatar.cc/100?img=1" alt="Doctor 1" />
              <img className="w-10 h-10 rounded-full border-2 border-[#0a4073] object-cover" src="https://i.pravatar.cc/100?img=2" alt="Doctor 2" />
              <div className="w-10 h-10 rounded-full border-2 border-[#0a4073] bg-[#43b9b8] flex items-center justify-center text-xs font-bold text-white">
                +200
              </div>
            </div>
            <span className="text-sm text-gray-300">Hơn 200 bác sĩ đầu ngành sẵn sàng tư vấn</span>
          </div>
        </div>

        {/* Cột phải (Form Content): Full width trên mobile, 50% width trên desktop. Padding nhỏ lại trên mobile */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
          {children}
        </div>
      </div>

      {/* Floating Info Widget: Ẩn trên mobile để không chắn màn hình, chỉ hiện từ tablet (md) trở lên */}
      <div className="fixed bottom-6 right-6 bg-[#f3f4f6] p-4 rounded-xl shadow-md gap-4 max-w-sm hidden md:flex border border-gray-200">
        <span className="material-symbols-outlined text-[#0a4073] shrink-0 mt-0.5">info</span>
        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-1">Gợi ý cho Đăng ký</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Khi chuyển sang Đăng ký, hệ thống sẽ yêu cầu: Họ tên, Email, Số điện thoại và Mật khẩu xác nhận.
          </p>
        </div>
      </div>
    </div>
  );
}