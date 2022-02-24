import React from "react";
import "./style.scss";
import Messenger from "./MessangerCheckbox";
import Social from "./SocialCheckbox";

import PopperInfo from "../Popper";

export function SocialCheckbox({ data }) {
  return (
    <div className="Checkbox">
      <div className="popper-wrapper">
        <div>
          <span>Соцсети</span>
        </div>
        <div>
          <PopperInfo />
        </div>
      </div>
      <Social data={data} />
    </div>
  );
}

export function MessengerCheckbox({ data }) {
  return (
    <div>
      <div>Мессенджеры</div>
      <Messenger data={data} />
    </div>
  );
}
