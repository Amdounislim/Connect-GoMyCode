import React, { useEffect, Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../js/actions/profileActions";
import { addScore } from "../../js/actions/adminActions";
import Spinner from "../layouts/Spinner/Spinner";
import gmcicon from "../../images/favicon.png";
import AddScore from "./AddScore";

const ManageScore = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const loading = useSelector(state => state.profile.loading);
  useEffect(() => {
    dispatch(getProfileById(id));
    return () => {
      dispatch({
        type: "CLEAR_PROFILE"
      });
    };
  }, []);

  const addEditScore = (id, gmc_id, formData) => {
    dispatch(addScore(id, gmc_id, formData));
  };

  if (loading) {
    return <Spinner />;
  }
  if (!loading && profile === null) {
    return (
      <section id="admin-content">
        <div
          className="container-icone-user col-10"
          style={{ flexDirection: "column" }}
        >
          <h4 style={{ margin: "10px 0" }}>
            This User Profile is Not Ready Yet
          </h4>
        </div>
      </section>
    );
  }
  return (
    <section id="admin-content">
      <div
        className="container-icone-user col-10"
        style={{ flexDirection: "column" }}
      >
        <h4 style={{ margin: "10px 0" }}>
          {" "}
          <img alt="gomycode" src={gmcicon} /> GOMYCODE Certification
        </h4>
        <h3 style={{ margin: "10px 0" }}>
          <i className="fas fa-user" />
          {profile.user.name.toUpperCase() +
            " " +
            profile.user.lastName.toUpperCase()}
        </h3>

        {profile && profile.gomycode[0] ? (
          profile.gomycode.map(certif => (
            <Fragment>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "80%",
                  padding: "0 1rem",
                  borderBottom: "1px solid  #e8e8e8"
                }}
              >
                <p>
                  {certif.track} -{" "}
                  <Moment format="YYYY/MM/DD">{certif.from}</Moment>
                </p>
                <AddScore id={id} certif={certif} onSubmit={addEditScore} />
              </div>
            </Fragment>
          ))
        ) : (
          <Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "80%",
                padding: "0 1rem",
                borderBottom: "1px solid  #e8e8e8"
              }}
            >
              NA/Data
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default ManageScore;
