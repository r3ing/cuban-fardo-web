import React from "react";
import { useEffect, useState } from "react";
import {
  getProvinces,
  getCities,
  saveShippingAddress,
} from "../../repositories/AddressRepository";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useShipment } from "../../context/shipmentContext";
import { useNavigate } from "react-router-dom";

export function AddressForm() {
  const alert = useAlert();
  const { customer, setAddress } = useShipment();
  const [towns, setTowns] = useState([]);
  const [province, setProvince] = useState();
  const [provinces, setProvinces] = useState([]);
  const navigate = useNavigate();
  const [address, setShippingAddress] = useState({
    beneficiary: "",
    phone: "",
    ci: "",
    street: "",
    number: "",
    betweenStreet: "",
    locality: "",
    ref: "",
    town: "",
    province: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...address, [name]: value });

    if (e.target.name === "town") {
      let townLabel = e.target.options[e.target.selectedIndex].text;
      setShippingAddress({ ...address, town: townLabel });
    }
  };

  const onSubmit = async () => {
    try {
      await saveShippingAddress(customer.id, address);
      setAddress(address);
      alert.success("Address successfully added");
      navigate("/shipping");
    } catch (error) {
      alert.error(error.message);
    }
  };

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });

    if (province && province !== "") {
      getCities(province).then((data) => {
        setTowns(data);
      });
    }
  }, [province]);

  const selectProvince = (e) => {
    setProvince(e.target.value);
    let provinceLabel = e.target.options[e.target.selectedIndex].text;
    setShippingAddress({ ...address, province: provinceLabel });
  };

  return (
    <form
      className="card-body card shadow-md shadow-orange-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">perm_identity</i>
        </div>
        <input
          {...register("beneficiary", {
            required: "Beneficiary is required",
            pattern: {
              value: /^[a-zA-Z ]*$/,
              message: "Please enter a valid Name",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Name"
          onChange={handleInputChange}
          value={address.beneficiary}
        />
      </div>
      {errors.beneficiary && (
        <small className="text-danger animated fadeIn">
          {errors.beneficiary.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9 \- 0-9]*$/,
              message: "Please enter a valid phone number",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Phone"
          onChange={handleInputChange}
          value={address.phone}
        />
      </div>
      {errors.phone && (
        <small className="text-danger animated fadeIn">
          {errors.phone.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">view_day</i>
        </div>
        <input
          {...register("street", {
            required: "Street is required",
            pattern: {
              value: /^[a-zA-Z0-9 ]*$/,
              message: "Please enter a valid street",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Street"
          onChange={handleInputChange}
          value={address.street}
        />
      </div>
      {errors.street && (
        <small className="text-danger animated fadeIn">
          {errors.street.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">filter_1</i>
        </div>
        <input
          {...register("number", {
            pattern: {
              value: /^[0-9a-zA-Z ]*$/,
              message: "Please enter a valid number",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Number"
          onChange={handleInputChange}
          value={address.number}
        />
      </div>
      {errors.number && (
        <small className="text-danger animated fadeIn">
          {errors.number.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">dehaze</i>
        </div>
        <input
          {...register("betweenStreet", {
            pattern: {
              value: /^[0-9a-zA-Z ]*$/,
              message: "Please enter a valid Between streets",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Between streets"
          onChange={handleInputChange}
          value={address.betweenStreet}
        />
      </div>
      {errors.between && (
        <small className="text-danger animated fadeIn">
          {errors.between.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">business</i>
        </div>
        <input
          {...register("locality", {
            pattern: {
              value: /^[a-zA-Z0-9 ]*$/,
              message: "Please enter a valid Neighborhood",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Neighborhood"
          onChange={handleInputChange}
          value={address.locality}
        />
      </div>
      {errors.locality && (
        <small className="text-danger animated fadeIn">
          {errors.locality.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">dialpad</i>
        </div>
        <select
          {...register("province", {
            required: "Province is required",
          })}
          className="form-control"
          name="province"
          id="province"
          onChange={selectProvince}
        >
          <option value="">Province</option>
          {provinces.map((p, key) => {
            return (
              <option key={key} value={p.id}>
                {p.name}
              </option>
            );
          })}
        </select>
      </div>
      {errors.province && (
        <small className="text-danger animated fadeIn">
          {errors.province.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">filter_hdr</i>
        </div>
        <select
          {...register("town", {
            required: "Town is required",
          })}
          className="form-control"
          name="town"
          onChange={handleInputChange}
        >
          <option value="">Town</option>
          {towns.map((t, key) => {
            return (
              <option key={key} value={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
      </div>
      {errors.town && (
        <small className="text-danger animated fadeIn">
          {errors.town.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">forward</i>
        </div>
        <input
          {...register("ref", {
            pattern: {
              value: /^[0-9a-zA-Z ]*$/,
              message: "Please enter a valid Reference",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Reference"
          onChange={handleInputChange}
          value={address.ref}
        />
      </div>
      {errors.ref && (
        <small className="text-danger animated fadeIn">
          {errors.ref.message}
        </small>
      )}

      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">folder_shared</i>
        </div>
        <input
          {...register("ci", {
            pattern: {
              value: /\d{11}/g,
              message: "Please enter a valid ci",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="CI"
          onChange={handleInputChange}
          value={address.ci}
        />
      </div>
      {errors.ci && (
        <small className="text-danger animated fadeIn">
          {errors.ci.message}
        </small>
      )}

      <button className="btn btn-warning mt-3">
        <i className="material-icons icon">save</i>
        Add
      </button>
    </form>
  );
}
