import React from "react";
import styles from "./Department.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDeptName, setColor, setAbv } from "../../features/Department/DepartmentSlice";

const DeptCard = ({ name, color, abv }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("object");
    dispatch(setCurrentDeptName(name));
    dispatch(setColor(color));
    dispatch(setAbv(abv));
  };
  return (
    <Link to={`/department/${name}`} className={styles.link} onClick={() => handleClick()}>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer} style={{ background: color }}>
          <h1 className={styles.abv}>{abv}</h1>
        </div>
        <div className={styles.nameContainer} title={name}>
          <h1 className={styles.name}>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default DeptCard;
