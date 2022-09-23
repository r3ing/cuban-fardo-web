export function Address() {
  return (
    <form className="card card-body">
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">perm_identity</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">perm_identity</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="lastName"
          placeholder="Last Name"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">email</i>
        </div>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">phone</i>
        </div>
        <input
          type="tel"
          className="form-control"
          name="phone"
          placeholder="Phone"
        />
      </div>
    </form>
  );
}
