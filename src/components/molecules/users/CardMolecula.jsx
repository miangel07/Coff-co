import React from "react";
import CardUsers from "../../molecules/cards/CardUsers";
import { LuUsers } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { HiOutlineUserCircle } from "react-icons/hi";

const CardMolecula = () => {
  return (
    <div className=" w-full justify-evenly flex flex-wrap gap-3">
      <div>
        <CardUsers
          title={"Total de Usuarios"}
          icons={<LuUsers />}
          number={12}
        />
      </div>
      <div>
        <CardUsers
          title={"Total de Administradores"}
          icons={<FcManager />}
          number={12}
        />
      </div>
      <div>
        <CardUsers
          title={"Total de Encargados"}
          icons={<MdOutlineAdminPanelSettings />}
          number={12}
        />
      </div>
      <div>
        <CardUsers
          title={"Total de Invitados"}
          icons={<HiOutlineUserCircle />}
          number={12}
        />
      </div>
    </div>
  );
};

export default CardMolecula;
