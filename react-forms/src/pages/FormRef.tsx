import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setFormValues } from '../store/slice/formSlice';
import React, { useRef } from 'react';

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

const FormRef: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLInputElement>(null);
  const tcInputRef = useRef<HTMLInputElement>(null);

  const {
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = async () => {
    const formData = {
      name: nameInputRef.current ? nameInputRef.current.value : '',
      age: ageInputRef.current ? ageInputRef.current.value : 0,
      email: emailInputRef.current ? emailInputRef.current.value : '',
      password: passwordInputRef.current ? passwordInputRef.current.value : '',
      passwordConfirm: passwordConfirmInputRef.current ? passwordConfirmInputRef.current.value : '',
      gender: genderInputRef.current ? genderInputRef.current.value : '',
      tc: tcInputRef.current ? tcInputRef.current.value : false,
    };
    try {
      await schema.validate(formData, { abortEarly: false });
    } catch (err) {
      console.error(err);
    }

    dispatch(setFormValues({ formData }));
    navigate('/');
  };

  return (
    // <form onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input ref={nameInputRef} name="name" id="name" />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age</label>
      <input ref={ageInputRef} type="number" id="age" />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email</label>
      <input ref={emailInputRef} id="email" />
      {errors.email && <p>{errors.email.message}</p>}

      <div className="input-group">
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input ref={passwordInputRef} id="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="password-confirm">Confirm password</label>
          <input ref={passwordConfirmInputRef} id="password-confirm" />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </div>
      </div>

      <fieldset>
        <legend>Please select your gender:</legend>
        <div>
          <input ref={genderInputRef} type="radio" id="man" value={GenderType.Man} />
          <label htmlFor="man">Man</label>

          <input ref={genderInputRef} type="radio" id="woman" value={GenderType.Woman} />
          <label htmlFor="woman">Woman</label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
      </fieldset>
      <label htmlFor="tc">I agree to the Terms and Conditions</label>
      <input id="tc" type="checkbox" ref={tcInputRef} />
      {errors.tc && <p>{errors.tc.message}</p>}

      <input type="submit" />
    </form>
  );
};

export default FormRef;
