import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { getAllProfiles } from "../../js/actions/profileActions";
import Spinner from "../layouts/Spinner/Spinner";
import Search from "./Search";
import { skills, fieldofstudie, status } from "./queriesData";
import filterProfiles from "../../utils/filterProfiles";
import "./profiles.css";

const Profiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  const profileReducer = useSelector(state => state.profile);
  const [skillsTag, setSkills] = useState(skills);
  const [studieTag, setStudie] = useState(fieldofstudie);
  const [statusTag, setStatus] = useState(status);
  const [filter, setFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [showSkills, setShowSkills] = useState(false);
  const [showStudies, setShowStudies] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  const handleCheck = (state, callback, query) => {
    callback(
      state.map(el =>
        el.value === query.value ? { ...el, checked: !el.checked } : el
      )
    );
    if (filter.find(el => el[0] === query.keywords[0])) {
      setFilter(
        filter.filter(
          el => el[0].toLowerCase() !== query.keywords[0].toLowerCase()
        )
      );
    } else {
      query.keywords && query.keywords[0]  && setFilter([...filter, query.keywords])
       
    }
  };

  const { profiles, loading } = profileReducer;
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profiles-page-container">
      <h1>Students</h1>
      <Search
        skillsTag={skillsTag}
        setSkills={setSkills}
        statusTag={statusTag}
        setStatus={setStatus}
        studieTag={studieTag}
        setStudie={setStudie}
        handleChange={handleCheck}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="profiles-container">
        <div className="profiles-filter col-4">
          <div className="filter-checkbox">
            <h5 onClick={() => setShowStudies(!showStudies)}>
              Field Of Study
              {showStudies ? (
                <i class="fas fa-minus"></i>
              ) : (
                <i class="fas fa-plus"></i>
              )}
            </h5>
            <div
              className={
                showStudies
                  ? "filter-studies collapse-show"
                  : "filter-studies collapse-hidden"
              }
            >
              {studieTag.map(el => (
                <div>
                  <input
                    type="checkbox"
                    checked={el.checked}
                    onChange={e => handleCheck(studieTag, setStudie, el)}
                  />
                  <label>{el.value}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-checkbox">
            <h5 onClick={() => setShowSkills(!showSkills)}>
              Skills
              {showSkills ? (
                <i class="fas fa-minus"></i>
              ) : (
                <i class="fas fa-plus"></i>
              )}
            </h5>

            <div
              className={
                showSkills
                  ? "filter-skills collapse-show"
                  : "filter-skills collapse-hidden"
              }
            >
              {skillsTag.map(el => (
                <div>
                  <input
                    type="checkbox"
                    checked={el.checked}
                    onChange={e => handleCheck(skillsTag, setSkills, el)}
                  />
                  <label>{el.value}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-checkbox">
            <h5 onClick={() => setShowStatus(!showStatus)}>
              Status
              {showStatus ? (
                <i class="fas fa-minus"></i>
              ) : (
                <i class="fas fa-plus"></i>
              )}
            </h5>
            <div
              className={
                showStatus
                  ? "filter-status collapse-show"
                  : "filter-status collapse-hidden"
              }
            >
              {statusTag.map(el => (
                <div>
                  <input
                    type="checkbox"
                    checked={el.checked}
                    onChange={e => handleCheck(statusTag, setStatus, el)}
                  />
                  <label>{el.value}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="list-profiles col-8">
          {!filterProfiles(profiles, filter)[0] ? (
            <h2>No Result</h2>
          ) : (
            filterProfiles(profiles, filter)
              .filter(profile => {
                const search = new RegExp(searchInput, "i", "g");
                return (
                  search.test(profile.name) || search.test(profile.lastName)
                );
              })
              .map(profile => (
                <ProfileCard profile={profile} key={profile._id} />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
