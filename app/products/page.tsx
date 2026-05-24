"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  async function reserveProduct(product: any) {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.productId,
          warehouseId: product.warehouseId,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Reservation failed");
        return;
      }

      window.location.href = "/reservation-success";

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          fontSize: "24px"
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f4f4",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Inventory Products
      </h1>

      {products.map((p) => (
        <div
          key={p.productId}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h2>{p.name}</h2>

          <p>📍 Warehouse: {p.warehouse}</p>

          <p>📦 Available Stock: {p.availableStock}</p>

          <button
            onClick={() => reserveProduct(p)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px"
            }}
          >
            Reserve Now
          </button>
        </div>
      ))}
    </div>
  );
}