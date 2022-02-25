import React, { useState } from "react";
import cx from "classnames";
import "./_contact-panel.scss";

export default function ContactPanel() {
  const [minimised, setMinimised] = useState(
    Boolean(localStorage.getItem("minimised"))
  );

  const onClick = () => {
    // Remember user preference
    localStorage.setItem("minimised", minimised ? "" : "true");

    setMinimised(!minimised);
  };

  return (
    <div
      className={cx("contact-panel", { "contact-panel--minimised": minimised })}
    >
      <div className="contact-panel__header">
        <i
          className="mdi mdi-exit-to-app contact-panel__toggle"
          onClick={onClick}
        />
        <div className="contact-panel__header__profile">
          <div className="contact-panel__header__profile__picture">
            <i className="fas fa-comment-dots" />
          </div>
          <h1>Stevie</h1>
        </div>
      </div>
      <div className="contact-panel__body">
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Email</p>
          <a href="mailto:stv8904@hotmail.com">
            <p className="contact-panel__body__value">stv8904@hotmail.com</p>
          </a>
        </div>
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Phone</p>
          <p className="contact-panel__body__value">5611737280</p>
        </div>
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Labels</p>
          <div className="contact-panel__body__labels">
            <p>
              Bot
              <i className="fas fa-times" />
            </p>
            <p>
              React
              <i className="fas fa-times" />
            </p>
          </div>
        </div>
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Attachments</p>
          <div className="contact-panel__body__attachments">
            <a
              href="https://drive.google.com/file/d/1X1D08qfKQCinWVkLVzqS7kjlWBX0CPLI/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <p>
                <i className="fas fa-paperclip" />
                Cv-Steve.pdf
              </p>
            </a>
            <p>
              <i className="far fa-image" />
              bot_face.jpg
            </p>
          </div>
          <p className="contact-panel__body__link">View All</p>
        </div>
        <button className="contact-panel__body__edit-btn">Edit Contact</button>
      </div>
    </div>
  );
}
