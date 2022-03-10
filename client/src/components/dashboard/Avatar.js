import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import noAvatar from "../../images/no-avatar.png";

const Avatar = ({ id, style = null, localAvatar = null }) => {
  const avatar = useSelector(state => state.profile.avatar);
  const userID = useSelector(state => state.auth.user && state.auth.user._id);
  const [loading, setLoading] = useState(true);
  const [av, setAv] = useState("");
  useEffect(() => {
    setLoading(true);
    userID === id
      ? setAv(localAvatar || avatar || `/api/avatar/${id}`)
      : setAv(`/api/avatar/${id}`);
  }, [avatar, localAvatar, id]);

  return (
    <img
      src={loading ? noAvatar : av}
      alt="Avatar"
      onError={e => {
        e.target.src = noAvatar;
      }}
      onLoad={e => {
        setLoading(false);
      }}
      style={
        loading && style
          ? {
              filter: "blur(3px)",
              ...style
            }
          : !loading && style
          ? style
          : {
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "0.5px solid #2626267d",
              margin: "0.5rem 0"
            }
      }
    />
  );
};

export default Avatar;
