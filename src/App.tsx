import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import OrderList from "./component/OrderList";
import OrderCreate from "./component/OrderCreate";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Убран белый фон и оставлены только кнопки по центру */}
        <nav className="navbar navbar-expand-lg">
          <div className="container d-flex justify-content-center">
            <Link to="/" className="nav-link">
              <button type="button" className="btn btn-primary mx-2">
                Создать заказ
              </button>
            </Link>
            <Link to="/order" className="nav-link">
              <button type="button" className="btn btn-success mx-2">
                Список заказов
              </button>
            </Link>
          </div>
        </nav>

        {/* Основной контент ниже */}
        <div className="container text-center mt-3">
          <Routes>
            <Route path="/" element={<OrderCreate />} />
            <Route path="/order" element={<OrderList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
