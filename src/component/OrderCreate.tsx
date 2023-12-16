import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify'; // Импорт библиотеки toastify
import 'react-toastify/dist/ReactToastify.css'; // Импорт стилей toastify

interface Order {
  name: string;
  dish: string;
}

const CreateOrder: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    name: '',
    dish: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderId = uuidv4();
      const currentTime = new Date().toLocaleTimeString();

      const response = await fetch('/employment_data/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...order, id: orderId, time: currentTime }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('аказ создан успешно!:', data);

        // Уведомление об успешном создании заказа
        toast.success('Заказ создан успешно!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Очистка полей формы
        setOrder({ name: '', dish: '' });
      } else {
        console.error('Ошибка создания заказа!:', response.statusText);

        // Уведомление об ошибке при создании заказа
        toast.error(`Ошибка создания заказа!: ${response.statusText}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Ошибка создания заказа!:', error);

      // Уведомление об ошибке при создании заказа
      toast.error(`Ошибка создания заказа!: ${error}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Имя:
            <input type="text" className="form-control" id="name" name="name" value={order.name} onChange={handleInputChange} />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="dish" className="form-label">
            Блюдо:
            <input type="text" className="form-control" id="dish" name="dish" value={order.dish} onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Создать Заказ</button>
      </form>
      {/* Компонент ToastContainer для отображения уведомлений */}
      <ToastContainer />
    </div>
  );
};

export default CreateOrder;
