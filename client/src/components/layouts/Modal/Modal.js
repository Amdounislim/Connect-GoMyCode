import React from "react";
import "./Modal.css";

export default function Modal({
  setIsOpen = () => {},
  isOpen = false,
  children
}) {
  const fadeIn = `
  @keyframes fade-in {
    0% {
      button: 0%;
      opacity: 0;
      transform: translateY(60%);
    }
    100% {
      /* transform: translateY(5%); */
  
      opacity: 1;
      button: 25%;
    }
  }  
  `;

  return (
    <div
      className="modal"
      style={{ display: isOpen ? "block" : "none" }}
      onClick={() => setIsOpen(false)}
    >
      <style children={fadeIn} />
      <div className="modal-body col-5" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
