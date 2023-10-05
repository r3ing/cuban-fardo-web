import React from "react";
import { useEffect, useState } from "react";
import { getProvinces, getCities } from "../../repositories/AddressRepository";

export function AddressForm() {
  const [towns, setTowns] = useState([]);
  const [province, setProvince] = useState();
  const [provinces, setProvinces] = useState([]);  

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });

    if(province && province !== 0) {
      getCities(province).then((data) => {
        setTowns(data);
      });
    }
  }, [province]);

  const selectProvince = (e) => {
    setProvince(e.target.value);
  }

  return (
    <form className="card-body card shadow-md shadow-orange-300">
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">perm_identity</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="receives"
          placeholder="Name"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">view_day</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="street"
          placeholder="Street"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">filter_1</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="number"
          placeholder="Number"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">dehaze</i>
        </div>
        <input
          type="tel"
          className="form-control"
          name="between"
          placeholder="Between streets"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">business</i>
        </div>
        <input
          type="tel"
          className="form-control"
          name="neighborhood"
          placeholder="Neighborhood"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">filter_hdr</i>
        </div>
        <select className="form-control" name="town" id="town">
          <option value="0">Town</option>
          {towns.map((t, key) => {
            return (
              <option key={key} value={t.id}>
                {t.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">dialpad</i>
        </div>
        <select className="form-control" name="province" id="province" onChange={selectProvince}>
          <option value={0}>Province</option>
          {provinces.map((p, key) => {
            return (
              <option key={key} value={p.id}>
                {p.name}
              </option>
            );
          })}
        </select>
      </div>

      <button className="btn btn-warning mt-3">
        <i className="material-icons icon">save</i>
        Add
      </button>
    </form>
  );
}
