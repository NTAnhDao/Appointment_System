export default function Step5() {
  const { bookingData } = useBooking();

  const handlePayment = () => {
    console.log("CALL API PAYMENT", bookingData);
  };

  return (
    <div>
      <h2>Payment</h2>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}