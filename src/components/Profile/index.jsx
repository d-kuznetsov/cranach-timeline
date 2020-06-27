import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styles from "./Profile.module.scss";

const DEFAULT_AVATAR = "/empty-photo.jpg";

export default function Profile(props) {
  const { name, occupation, phone, email, avatar = DEFAULT_AVATAR } = props;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.avatarWrap}>
          <img className={styles.avatar} src={avatar} alt={name} />
        </div>
      </div>
      <div className={styles.textInfo}>
        <Typography variant="h5" component="h5" noWrap gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" component="p" noWrap gutterBottom color="textSecondary">
          {occupation}
        </Typography>
        <Typography variant="body2" component="p" noWrap gutterBottom>
          {phone}
        </Typography>
        <Typography variant="body2" component="p" noWrap color="textSecondary">
          {email}
        </Typography>
      </div>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string,
  occupation: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
};
