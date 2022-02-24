import React from "react";
import "./style.scss";
import Messenger from "./MessangerCheckbox";
import Social from "./SocialCheckbox";

export function SocialCheckbox({ data }) {
  return (
    <div className="Checkbox">
      <div>Соцсети</div>
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
