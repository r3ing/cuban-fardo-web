import { useState } from "react";
import { useForm } from "react-hook-form";
import { addOrEditClient } from "../../repositories/ClientRepository";
import { useAlert } from "react-alert";
import { useClient } from "../../context/clientContext";
// import { useNavigate } from "react-router-dom";

export function CustomerForm({ handleClose }) {
  const alert = useAlert();
  // const navigate = useNavigate();
  const { setCustomer } = useClient();

  const [client, setClient] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddres: [],
    shipping: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    try {
      //TO DO
      await addOrEditClient(client);
      handleClose();
      setCustomer(client);
      //navigate("/shipping")
      alert.success("Customer created cuccessfully");
    } catch (error) {
      alert.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  return (
    <form className="card card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("name", { required: true })}
          placeholder="First Name"
          onChange={handleInputChange}
        />
      </div>
      {errors.name && (
        <small className="text-danger animated fadeIn">Name is required</small>
      )}
      <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input
          type="text"
          className="form-control text-capitalize"
          {...register("lastName", { required: true })}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
      </div>
      {errors.lastName && (
        <small className="text-danger animated fadeIn">
          Last Name is required
        </small>
      )}
      {/* <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">email</i>
        </div>
        <input
          type="email"
          className="form-control"
          {...register("email", {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
          placeholder="Email"
          onChange={handleInputChange}
        />
      </div>
      {errors.email && (
        <small className="text-danger animated fadeIn">
          Invalid format email
        </small>
      )} */}
      <div className="form-group input-group mt-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          type="tel"
          className="form-control"
          {...register("phone", {
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: /^[0-9]*$/,
          })}
          placeholder="Phone"
          onChange={handleInputChange}
        />
      </div>
      {errors.phone?.type === "required" && (
        <small className="text-danger animated fadeIn">Phone is required</small>
      )}
      {errors.phone?.type === "pattern" && (
        <small className="text-danger animated fadeIn">
          Invalid format Phone
        </small>
      )}
      {errors.phone?.type === "minLength" && (
        <small className="text-danger animated fadeIn">
          Invalid format Phone
        </small>
      )}
      {errors.phone?.type === "maxLength" && (
        <small className="text-danger animated fadeIn">
          Invalid format Phone
        </small>
      )}
      <button className="btn-warning custom-btn mt-3">
      <i className="material-icons icon">save</i> 
        Save
      </button>
    </form>
  );
}
