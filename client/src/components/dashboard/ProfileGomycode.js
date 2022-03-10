import React, { Fragment } from "react";
import Moment from "react-moment";
import AddGomycode from "../dashboard-modals/AddGomycodeModal";
import gmcicon from "../../images/favicon.png";

const ProfileGomycode = ({ profile, addGomycode, deleteInfo }) => {
  return (
    <Fragment>
      {profile && profile.gomycode && profile.gomycode[0] ? (
        <div
          className="container-icone-user col-10"
          style={{ flexDirection: "column" }}
        >
          <AddGomycode addGomycode={addGomycode} />
          <h4 style={{ margin: "10px 0" }}>
            {" "}
            <img alt="gomycode" src={gmcicon} /> GOMYCODE Certification
          </h4>
          {profile.gomycode.map(certif => (
            <Fragment>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "80%",
                  padding : "0 1rem",
                  borderBottom: "1px solid  #e8e8e8"
                }}
              >
                <p>
                  {certif.track} -{" "}
                  <Moment format="YYYY/MM/DD">{certif.from}</Moment>
                </p>
                <i
                  className="fas fa-trash remove-btn"
                  onClick={() =>
                    deleteInfo(certif._id, "gomycode", "Certification Deleted")
                  }
                />
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        profile !== null && (
          <div
            className="container-icone-user col-10"
            style={{ flexDirection: "column" }}
          >
            <h3 style={{ margin: "10px 0" }}>GOMYCODE Certification</h3> Add
            Your Gomycode Certification{" "}
            <AddGomycode addGomycode={addGomycode} />{" "}
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProfileGomycode;
