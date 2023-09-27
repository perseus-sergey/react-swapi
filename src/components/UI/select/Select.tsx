import { ICardData, ISelect } from '../../../types';

const Select = ({
  options,
  defaultValue,
  value,
  changeCallback,
}: {
  options: ISelect[];
  defaultValue: string;
  value: string;
  changeCallback: (value: keyof ICardData) => void;
}) => {
  return (
    <select
      style={{ padding: '0.3rem 1rem', borderRadius: '10px' }}
      value={value}
      onChange={(event) => changeCallback(event.target.value as keyof ICardData)}
    >
      <>
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </>
    </select>
  );
};

export default Select;
