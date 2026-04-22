// import MainLayout from "../components/layout/MainLayout";
// import { Link } from 'react-router-dom';
// export default function PaymentPage() {
//     const createVnpayPayment = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/api/v1/payments/vnpay/create_url', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                  amount: 10000,
//                   appointment_id: 1,        
//                   payment_method: "VNPAY"      
//             })
//         });

//         const data = await response.json();

//         if (data.code === '00') {
//             window.location.href = data.paymentUrl;   // Chuyển sang VNPAY
//         } else {
//             alert(data.message);
//         }
//     } catch (error) {
//         console.error("Lỗi:", error);
//         alert("Có lỗi khi tạo link thanh toán");
//     }
// };

// const createMomoPayment = async () => {
//   const res = await fetch("http://localhost:5000/api/v1/payments/momo/create", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       amount: 10000,
//       appointment_id: 1,        
//       payment_method: "MOMO"      
//     }),
//   });

//    console.log("STATUS:", res.status);

//   const data = await res.json();   // ✅ phải ở đây trước

//   console.log("MOMO RESPONSE:", data);

//   if (data && data.payUrl) {
//     window.location.href = data.payUrl;
//   } else {
//     alert("Backend không trả payUrl");
//   }
// };
//   return (
//  <MainLayout>
//       <main className="pt-20 pb-24 px-6 max-w-[1100px] mx-auto font-sans">
        

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-2">
//               <button className="bg-[#0a315e] hover:bg-[#062447] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
//                 onClick={createVnpayPayment}>
                
//                 Cổng VNPAY
//               </button>

//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-2">
//               <button className="bg-[#0a315e] hover:bg-[#062447] text-white px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
//                 onClick={createMomoPayment}>
                
//                 Ví MOMO
//               </button>

//               </div>
//       </main>
//     </MainLayout>
//   );
// }



// http://localhost:5173/success?
// partnerCode=MOMOBKUN20180529
// &orderId=1776751870235&
// requestId=1776751870235
// &amount=10000&orderInfo=Test+thanh+to%C3%A1n+MoMo&orderType=momo_wallet
// &transId=4725043911&resultCode=0
// &message=Successful.
// &payType=napas
// &responseTime=1776752085515
// &extraData=&
// signature=1e079a39a4b6028d4c01e9b0ee3f1139feac451247d33801225ee8ecc472eafd


// repositories/payment.repository.js

// repositories/payment.repository.js
