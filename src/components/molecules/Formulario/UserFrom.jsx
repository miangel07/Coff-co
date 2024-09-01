import React from "react";

const UserFrom = ({ children, onsubmit }) => {
  return (
    <div>
      <form className="card-body" onSubmit={onsubmit}>
        <div className="form-control gap-2">{children}</div>
        <div className="form-control gap-2">
          <button className="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default UserFrom;
