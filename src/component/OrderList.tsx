import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Order {
  id: number;
  name: string;
  dish: string;
  time: string;
}

const OrderList: React.FC = () => {
  const [employmentData, setEmploymentData] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/employment_data/all");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setEmploymentData(data);
      } catch (error) {
        console.error("Error fetching employment data:", error);
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="mb-4" style={{ color: "#3498db" }}>
        Список заказов
      </h2>
      <div
        style={{
          height: "800px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {loading && <p>Идет загрузка...</p>}

        {error && (
          <div className="alert alert-danger" role="alert">
            Ошибка загрузки данных: {error}
          </div>
        )}

        {!loading && !error && employmentData?.length === 0 && (
          <div className="alert alert-info" role="alert">
            Заказов нет.
          </div>
        )}

        {!loading &&
          !error &&
          employmentData?.map((order) => (
            <div
              key={order.id}
              className="card mb-3"
              style={{ backgroundColor: "#ecf0f1" }}
            >
              <div className="card-body">
                <p className="card-text">
                  <strong>ID заказа:</strong> {order.id}
                </p>
                <p className="card-text">
                  <strong>Имя:</strong> {order.name}
                </p>
                <p className="card-text">
                  <strong>Блюда:</strong> {order.dish}
                </p>
                <p className="card-text">
                  <strong>Время создания:</strong> {order.time}
                </p>
              </div>
              <hr className="my-2" style={{ borderColor: "#3498db" }} />
            </div>
          ))}
      </div>
    </>
  );
};

export default OrderList;
