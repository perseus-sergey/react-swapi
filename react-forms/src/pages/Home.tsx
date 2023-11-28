import { useAppSelector } from '../store/store';
import style from './Home.module.css';

const Home = () => {
  const { name, age, email, gender, tc, password } = useAppSelector(
    (state) => state.formSlice.formData
  );

  return (
    <>
      <h1>My Credentials</h1>
      <ul className={style.formDataUl}>
        <li>
          <span className={style.formDataTitle}>Name</span>: {name}
        </li>
        <li>
          <span className={style.formDataTitle}>Age</span>: {age}
        </li>
        <li>
          <span className={style.formDataTitle}>Email</span>: {email}
        </li>
        <li>
          <span className={style.formDataTitle}>Gender</span>: {gender}
        </li>
        <li>
          <span className={style.formDataTitle}>T&C</span>: {tc ? 'Yes' : 'No'}
        </li>
        <li>
          <span className={style.formDataTitle}>Password</span>: {password}
        </li>
      </ul>
    </>
  );
};

export default Home;
