import Typography from "@material-ui/core/Typography";
import styles from "./Profile.module.scss";

const DEFAULT_AVATAR = "/empty-photo.jpg";

interface Props {
  name: string;
  occupation?: string;
  phone?: string;
  email?: string;
  avatar?: string;
}

export default function Profile(props: Props) {
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
