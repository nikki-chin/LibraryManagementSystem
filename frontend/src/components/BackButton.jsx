import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.backbutton}>
      <button onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default BackButton;
