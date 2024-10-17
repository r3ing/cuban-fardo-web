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
import {ROUTE_PRODUCTS} from '../common/Costanst';

export function AddressForm() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { customer, address, setAddress } = useShipment();
  
  const [towns, setTowns] = useState([]);
  const [province, setProvince] = useState();
  const [provinces, setProvinces] = useState([]);  
  // const [address, setShippingAddress] = useState({
  //   beneficiary: "",
  //   phone: "",
  //   ci: '',
  //   street: "",
  //   number: "",
  //   betweenStreet: "",
  //   locality: "",
  //   ref: "",
  //   town: "",
  //   province: "",    
  // });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value.toUpperCase() });

    if (e.target.name === "town") {
      let townLabel = e.target.options[e.target.selectedIndex].text;
      setAddress({ ...address, town: townLabel });
    }
  };

  const onSubmit = async () => {
    try {
      const msg = address.id ? "Dirección actualizada exitosamente." : "Dirección agregada exitosamente!.";
      await saveShippingAddress(customer.id, address);
      //setAddress(address);
      alert.success(msg);
      //navigate(ROUTE_PRODUCTS);
    } catch (error) {
      alert.error(error.message);
    }
  };

  const selectProvince = (e) => {
    setProvince(e.target.value);
    let provinceLabel = e.target.options[e.target.selectedIndex].text;
    setAddress({ ...address, province: provinceLabel });
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

    if (address) {
      setValue("beneficiary", address.beneficiary);
      setValue("phone", address.phone);
      setValue("street", address.street);
      setValue("number", address.number);
      setValue("betweenStreet", address.betweenStreet);
      setValue("locality", address.locality);
    
      //province
      //town

      setValue("ref", address.ref);
      setValue("ci", address.ci);
    }    
    
  }, [province, address, setValue]);  

  return (
    <form
      className="card-body card shadow-md shadow-orange-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">perm_identity</i>
        </div>
        <input
          {...register("beneficiary", {
            required: "Agregue el nombre del beneficiario.",
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]*$/,
              message: "Escriba un nombre válido.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Nombre"
          onChange={handleInputChange}
          //value={address.beneficiary}
        />
      </div>
      {errors.beneficiary && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.beneficiary.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          {...register("phone", {
            required: "Agregue un número de teléfono.",
            pattern: {
              value: /^[0-9 \- 0-9]*$/,
              message: "Escriba un número de teléfono válido.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Teléfono"
          onChange={handleInputChange}
          // value={address.phone}
        />
      </div>
      {errors.phone && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.phone.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">view_day</i>
        </div>
        <input
          {...register("street", {
            required: "Agregue una calle.",
            pattern: {
              value: /^[\w\sÑñ#,/ ]*$/,
              message: "Escriba un nombre de calle válido.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Calle"
          onChange={handleInputChange}
          // value={address.street}
        />
      </div>
      {errors.street && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.street.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">filter_1</i>
        </div>
        <input
          {...register("number", {
            pattern: {
              value: /^[\w\s# /]*$/,
              message: "Agregue un número válido.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Número"
          onChange={handleInputChange}
          // value={address.number}
        />
      </div>
      {errors.number && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.number.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">dehaze</i>
        </div>
        <input
          {...register("betweenStreet", {
            pattern: {
              value: /^[\w\s,/]*$/,
              message: "Agregue un entre calles válido",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Entre calles"
          onChange={handleInputChange}
          // value={address.betweenStreet}
        />
      </div>
      {errors.between && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.between.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">apartment</i>
        </div>
        <input
          {...register("locality", {
            pattern: {
              value: /^[\w\s ,/]*$/,
              message: "Escriba un reparto válido.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Comunidad o Reparto"
          onChange={handleInputChange}
          // value={address.locality}
        />
      </div>
      {errors.locality && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.locality.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">map</i>
        </div>
        <select
          {...register("province", {
            required: "Seleccione una provincia.",
          })}
          className="form-control"
          name="province"
          id="province"
          onChange={selectProvince}
        >
          <option value="">Provincia</option>
          {provinces.map((p, key) => {
            return (
              <option key={key} value={p.id}>
                {p.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      {errors.province && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.province.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">filter_hdr</i>
        </div>
        <select
          {...register("town", {
            required: "Seleccione un municipio.",
          })}
          className="form-control"
          name="town"
          onChange={handleInputChange}
        >
          <option value="">Municipio</option>
          {towns.map((t, key) => {
            return (
              <option key={key} value={t.id}>
                {t.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      {errors.town && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.town.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">forward</i>
        </div>
        <input
          {...register("ref", {
            pattern: {
              value: /^[\w\sÑñ ,/]*$/,
              message: "Escriba una referencia válida.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="Referencia"
          onChange={handleInputChange}
          // value={address.ref}
        />
      </div>
      {errors.ref && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.ref.message}
        </small>
      )}

      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">folder_shared</i>
        </div>
        <input
          {...register("ci", {
            pattern: {
              value: /\d{11}/g,
              message: "Escriba un ci válido.",
            },
          })}
          type="text"
          className="form-control text-capitalize"
          placeholder="CI"
          onChange={handleInputChange}
          // value={address.ci}
        />
      </div>
      {errors.ci && (
        <small className="text-danger animated fadeIn mb-3">
          {errors.ci.message}
        </small>
      )}

      <button className="btn btn-warning mt-2">
        <i className="material-icons icon">save</i>
        Guardar
      </button>
    </form>
  );
}
