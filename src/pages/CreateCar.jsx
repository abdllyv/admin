import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCar = () => {
  // Local states
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [imgEror, setImgEror] = useState("");
  // Navigation
  const navigate = useNavigate();
  // Select Image
  const base64 = (e) => {
    setImgEror("");
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

  const carSchema = object({
    name: string().required().trim(),
    details: string().required().trim(),
    price: string().required().trim(),
  });

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(carSchema),
  });

  const handleLogin = async (data) => {
    if (image === null) {
      setImgEror("Choose Img");
      return;
    } else {
      const body = new FormData();
      body.append("name", data.name);
      body.append("details", data.details);
      body.append("price", data.price);
      body.append("productImage", image);

      try {
        await axios
          .post(process.env.REACT_APP_ALL_DATA, body)
          .then((res) => console.log(res));
        navigate("/all-cars");
      } catch (error) {
        navigate("/error");
      }
    }
  };

  return (
    <section className="createCar">
      <div className="container">
        <div className="row">
          <h2 className="title">Add new car</h2>
          <div className="login-box">
            {/*  <form noValidate onSubmit={handleSubmit(handleLogin)}  encType="multipart/data-form"> */}
            {/* multipart yəni məmim dataların hamısı bir eyrdən gəlməyəcək,ayrı ayrı yerdən gələcəyini bildirirəm */}
            <form noValidate onSubmit={handleSubmit(handleLogin)}>
              <div className="user-box">
                <input
                  type="text"
                  name="name"
                  {...register("name")}
                  className={errors.name && "error"}
                />
                <label>Car Name</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  name="details"
                  {...register("details")}
                  className={errors.details && "error"}
                />
                <label>Car Details</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  name="price"
                  {...register("price")}
                  className={errors.price && "error"}
                />
                <label>Car Price</label>
              </div>
              <div className="user-box">
                <input
                  type="file"
                  name="productImage"
                  id="cImg"
                  onChange={base64}
                />
                {preview && (
                  <div className="previewImage">
                    <img src={preview} alt="uploaded-img" />
                  </div>
                )}
              </div>
              {imgEror && <span>{imgEror}</span>}
              <div
                className={
                  errors.details || errors.name || errors.price || !preview
                    ? "btn error"
                    : "btn"
                }
              >
                <button>
                  Create Car
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

export default CreateCar;

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
