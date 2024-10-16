import React from "react";
import { useTranslation } from 'react-i18next';

const UserFrom = ({ children, onsubmit }) => {
  const { t } = useTranslation();
  return (
    <div>
      <form className="card-body" onSubmit={onsubmit}>
        <div className="form-control gap-2">{children}</div>
        <div className="form-control gap-2">
          <button className="btn btn-primary">{t("enviar")}</button>
        </div>
      </form>
    </div>
  );
};

export default UserFrom;
