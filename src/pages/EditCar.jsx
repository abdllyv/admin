import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

const EditCar = () => {
  // Local states
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [car, setCar] = useState([]);

  // PARAMS
  const { carID } = useParams();

  // NAVIGATE
  const navigate = useNavigate();

  // GET DATA
  useEffect(() => {
    const editCar = async () => {
      await axios
        .get(`${process.env.REACT_APP_ALL_DATA}/${carID}`)
        .then((res) => setCar(res.data))
        .catch((err) => {
          navigate("/err");
        });
    };
    editCar();
  }, [navigate, carID]);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  };

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: car.name,
      details: car.details,
      price: car.price,
    },
  });

  // EDIT DATA
  const editCarData = async (data) => {
    const body = new FormData();
    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("productImage", image);

    await axios
      .put(`${process.env.REACT_APP_ALL_DATA}/${carID}`,body)
      .then((res) =>navigate("/all-cars"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="editCar">
      <div className="container">
        <div className="row">
          <h2 className="title">Edit car's data</h2>
          <div className="login-box">
            <form noValidate onSubmit={handleSubmit(editCarData)}>
              <div className="user-box">
                <input
                  type="text"
                  name="name"
                  defaultValue={car.name}
                  {...register("name")}
                />
                <label>Car Name</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  name="details"
                  defaultValue={car.details}
                  {...register("details")}
                />
                <label>Car Details</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  name="price"
                  defaultValue={car.price}
                  {...register("price")}
                />
                <label>Car Price</label>
              </div>
              <div className="user-box">
                <input
                  type="file"
                  name="productImage"
                  id="cImg"
                  onChange={handleImage}
                />
                {preview ? (
                  <div className="previewImage">
                    <img src={preview} alt="old_img" />
                  </div>
                ) : (
                  <div className="previewImage">
                    {car.productImage && (
                      <img
                        src={`${process.env.REACT_APP_BASE}${car.productImage}`}
                        alt="new_img"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="btn">
                <button>
                  Edit car
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditCar;

/*
  const base64 = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  };
*/
