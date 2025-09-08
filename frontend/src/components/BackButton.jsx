import {Link} from 'react-router-dom';
import styles from './BackButton.module.css'

const BackButton = ({destination = '/'}) => {
    return (
        <div className={styles.backbutton}>
            <Link to={destination}>
                back
            </Link>
        </div>
    )
}
export default BackButton