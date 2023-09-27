import { Component } from 'react';
import { ICardData } from '../types';
import './Card.css';
import StyledButton from './UI/button/StyledButton';

// type Props = {};

// type State = {};

// class ClassCounter extends Component<Props, State> {
class Card extends Component {
  // state = {
  //   count: 0,
  // };

  // increment() {
  //   this.setState({ count: this.state.count + 1 });
  // }

  // decrement() {
  //   this.setState({ count: this.state.count - 1 });
  // }

  constructor(
    public props: {
      removeCardCallback: (removedCard: ICardData) => void;
      cardData: ICardData;
      index: number;
    }
  ) {
    super(props);
  }

  render() {
    const { removeCardCallback, cardData, index } = this.props;
    const { title, imgSource, description } = cardData;
    return (
      <div className="card">
        <h2 className="card-title">
          {index}. {title}
        </h2>
        <div className="card-info-wrapper">
          <div className="card-image">{imgSource}</div>
          <div className="card-description">{description}</div>
          <StyledButton
            buttonType="delete"
            onClick={() => removeCardCallback(cardData)}
          ></StyledButton>
        </div>
      </div>
    );
  }
}

export default Card;
