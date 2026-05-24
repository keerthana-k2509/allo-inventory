"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const uniqueByName = Object.values(
          data.reduce((acc: any, item: any) => {
            if (
              item.availableStock > 0 &&
              (
                !acc[item.name] ||
                item.availableStock >
                  acc[item.name].availableStock
              )
            ) {
              acc[item.name] = item;
            }

            return acc;
          }, {})
        );

        setProducts(uniqueByName as any[]);
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

  if (loading) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Inventory Products
      </h1>

      {products.map((p) => (
        <div
          key={p.name}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h2>{p.name}</h2>

          <p>📍 Warehouse: {p.warehouse}</p>

          <p>
            📦 Available Stock: {p.availableStock}
          </p>

          <button
            onClick={() => reserveProduct(p)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Reserve Now
          </button>
        </div>
      ))}
    </div>
  );
}