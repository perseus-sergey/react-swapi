import { Component } from 'react';
import { ICardData } from '../types';
import StyledButton from './UI/button/StyledButton';
import StyledInput from './UI/input/StyledInput';
import classes from './PostForm.module.css';

class PostForm extends Component {
  state = {
    post: { title: '', description: '' },
  };

  constructor(public props: { createCardCallback: (newCard: ICardData) => void }) {
    super(props);
  }

  addNewCard(event: React.MouseEvent) {
    event.preventDefault();

    const newCard = {
      ...this.state.post,
      id: `card-${Date.now()}`,
      imgSource: 'image-source',
    };

    this.props.createCardCallback(newCard);
    this.setState({ title: '', description: '' });
  }

  render() {
    return (
      <form>
        <fieldset className={classes.postFormFieldset}>
          <legend className={classes.postFormLegend}>Create Card</legend>

          <StyledInput
            type="text"
            placeholder="Card title"
            value={this.state.post.title}
            onChange={(e) => this.setState({ post: { ...this.state.post, title: e.target.value } })}
          />
          <StyledInput
            type="text"
            placeholder="Card description"
            value={this.state.post.description}
            onChange={(e) =>
              this.setState({ post: { ...this.state.post, description: e.target.value } })
            }
          />
          <StyledButton buttonType="submit" onClick={this.addNewCard.bind(this)}>
            Create
          </StyledButton>
        </fieldset>
      </form>
    );
  }
}

// const PostForm = ({ createCardCallback }: { createCardCallback: (newCard: ICardData) => void }) => {
//   const [post, setPost] = useState({ title: '', description: '' });

//   const addNewCard = (event: React.MouseEvent) => {
//     event.preventDefault();

//     const newCard = {
//       ...post,
//       id: `card-${Date.now()}`,
//       imgSource: 'image-source',
//     };
//     createCardCallback(newCard);
//     setPost({ title: '', description: '' });
//   };

//   return (
//     <form>
//       <fieldset className={classes.postFormFieldset}>
//         <legend className={classes.postFormLegend}>Create Card</legend>

//         <StyledInput
//           type="text"
//           placeholder="Card title"
//           value={post.title}
//           onChange={(e) => setPost({ ...post, title: e.target.value })}
//         />
//         <StyledInput
//           type="text"
//           placeholder="Card description"
//           value={post.description}
//           onChange={(e) => setPost({ ...post, description: e.target.value })}
//         />
//         <StyledButton buttonType="submit" onClick={addNewCard}>
//           Create
//         </StyledButton>
//       </fieldset>
//     </form>
//   );
// };

export default PostForm;
