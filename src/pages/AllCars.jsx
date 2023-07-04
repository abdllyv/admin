// SweetAlert
import Swal from "sweetalert2";

// Axios
import axios from "axios";

import { useEffect, useState } from "react";

// Components
import Loader from "../components/Loader";

// Icons
import { FaTrash, FaEdit } from "react-icons/fa";

// Router
import { Link, useNavigate } from "react-router-dom";

const AllCars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // GET DATA
  useEffect(() => {
    const getAllCars = async () => {
      setLoading(true);
      try {
        await axios
          .get(process.env.REACT_APP_ALL_DATA)
          .then((res) => setData(res.data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/error");
      }
    };
    getAllCars();
  }, [navigate, setLoading]);

  // Delete Car From Bacend
  const removeData = (carId) => {
    Swal.fire({
      title: "Delete the Car?",
      text: "If deleted, it will not be returned!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.REACT_APP_ALL_DATA}/${carId}`)
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire("Rejection", "You refused to delete the machine !", "info");
      }
    });
  };
  return (
    <section className="allCars">
      {loading && <Loader />}
      <div className="container">
        <div className="row">
          <h2 className="title">All Cars List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Car Image</th>
                <th>Car Name</th>
                <th>Car Details</th>
                <th>Car Price</th>
                <th>Edit Car</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="carImg">
                    <img
                      src={`${process.env.REACT_APP_BASE}${item.productImage}`}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.details}</td>
                  <td>${item.price}</td>
                  <td className="edit">
                    <Link to={`/edit-car/${item.id}`}>
                      <FaEdit />
                    </Link>
                    <FaTrash onClick={() => removeData(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllCars;
