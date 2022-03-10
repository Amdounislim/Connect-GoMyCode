import React, { Fragment } from "react";
import "./Landing.css";

const Landig = () => {
  return (
    <Fragment>
      <section id="showcase">
        <div className="col-5">
          <div className="showcase-intro">
            <h1>
              Welcome To <span className="text-important">Connect</span>
            </h1>
            <p>
              <span className="text-important text-bold">GoMyCode</span>{" "}
              communuty of devlopers
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landig;
