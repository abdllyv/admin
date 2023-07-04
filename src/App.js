// Router
import { Routes, Route } from "react-router-dom";
import ProtectedRouter from "./router/ProtectedRouter";

// Context
import { MainContext } from "./utils/Context";
import { Auth } from "./utils/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllCars from "./pages/AllCars";
import CreateCar from "./pages/CreateCar";
import EditCar from "./pages/EditCar";

const App = () => {
  return (
    <Auth>
      <MainContext>
        <Header />
        <Routes>
          <Route element={<ProtectedRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/all-cars" element={<AllCars />} />
            <Route path="/create-car" element={<CreateCar />} />
            <Route path="/edit-car/:carID" element={<EditCar />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </MainContext>
    </Auth>
  );
};

export default App;
