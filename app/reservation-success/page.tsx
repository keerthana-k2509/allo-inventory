export default function SuccessPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Reservation Created Successfully 🎉</h1>

      <p>Your item has been reserved.</p>

      <a href="/products">
        Back to Products
      </a>
    </div>
  );
}