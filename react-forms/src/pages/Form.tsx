import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setFormValues } from '../store/slice/formSlice';

export enum GenderType {
  Man = 'man',
  Woman = 'woman',
}

interface IFormInput {
  name: string;
  age: number;
  email?: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  tc: boolean;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Z]/, 'Should start with uppercase letter'),
  age: yup
    .number()
    .required('Age is a required field')
    .positive('Too little')
    .typeError('Age must be a number')
    .max(150, 'Very old!'),
  email: yup.string().email('Not a proper email'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'mast contains 8 chars minimum.')
    .matches(/\d+/, 'mast contains at least 1 numeric digit')
    .matches(/[a-z]+/, 'mast contains at least 1 lowercase character')
    .matches(/[A-Z]+/, 'mast contains at least 1 uppercase character')
    .matches(/[@$!%*?&]+/, 'mast contains at least 1 special character (@$!%*?&)'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  gender: yup.string().required('Selecting the gender field is required'),
  tc: yup.boolean().default(false).oneOf([true], 'You must accept the terms and conditions'),
});

const Form: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInput) => {
    dispatch(setFormValues({ formData: data }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} id="name" />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age</label>
      <input {...register('age')} type="number" id="age" />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email</label>
      <input {...register('email')} id="email" />
      {errors.email && <p>{errors.email.message}</p>}

      <div className="input-group">
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input {...register('password')} id="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="password-confirm">Confirm password</label>
          <input {...register('passwordConfirm')} id="password-confirm" />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend>Please select your gender:</legend>
        <div>
          <input {...register('gender')} type="radio" id="man" value={GenderType.Man} />
          <label htmlFor="man">Man</label>

          <input {...register('gender')} type="radio" id="woman" value={GenderType.Woman} />
          <label htmlFor="woman">Woman</label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
      </fieldset>
      <label htmlFor="tc">I agree to the Terms and Conditions</label>
      <input id="tc" type="checkbox" {...register('tc')} />
      {errors.tc && <p>{errors.tc.message}</p>}

      <input type="submit" />
    </form>
  );
};
export default Form;
