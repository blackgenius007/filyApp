import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Collapse, FormHelperText, Box } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker from 'react-emoji-picker';

const EmojiTextArea = ({ placeholder, maxCharacters }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [characters, setCharacters] = useState(0);

  const handleTextFieldChange = useCallback(
    (event) => {
      const { value } = event.target;
      let count = value.length;
      if (maxCharacters) {
        count = Math.min(count, maxCharacters);
      }
      setValue(value);
      setCharacters(count);
    },
    [maxCharacters]
  );

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const onSelectEmoji = useCallback(
    (emoji) => {
      setValue((prevValue) => prevValue + emoji);
    },
    []
  );

  return (
    <>
      <TextField
        fullWidth
        multiline
        variant="outlined"
        rows={6}
        placeholder={placeholder}
        value={value}
        onChange={handleTextFieldChange}
      />
      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <IconButton onClick={toggleOpen}>
          {open ? <CloseIcon style={{ color: 'orange' }} /> : <EmojiEmotionsIcon style={{ color: 'orange' }} />}
        </IconButton>
      </div>
      {maxCharacters && (
        <FormHelperText error={characters >= maxCharacters}>
          {`${characters}/${maxCharacters} characters`}
        </FormHelperText>
      )}
      <Collapse in={open}>
        <Box mt={1}>
          <EmojiPicker onEmojiClick={onSelectEmoji} />
        </Box>
      </Collapse>
    </>
  );
};

EmojiTextArea.propTypes = {
  placeholder: PropTypes.string,
  maxCharacters: PropTypes.number,
};

export default EmojiTextArea;







// import React, { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import { TextField, IconButton, Collapse, FormHelperText, Box } from '@mui/material';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import CloseIcon from '@mui/icons-material/Close';
// import EmojiPicker from 'react-emoji-picker';
// import 'react-emoji-picker/dist/index.css';

// const EmojiTextArea = ({ placeholder, maxCharacters }) => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState('');
//   const [characters, setCharacters] = useState(0);

//   const handleTextFieldChange = useCallback(
//     (event) => {
//       const { value } = event.target;
//       let count = value.length;
//       if (maxCharacters) {
//         count = Math.min(count, maxCharacters);
//       }
//       setValue(value);
//       setCharacters(count);
//     },
//     [maxCharacters]
//   );

//   const toggleOpen = useCallback(() => {
//     setOpen((prevOpen) => !prevOpen);
//   }, []);

//   const onSelectEmoji = useCallback(
//     (emoji) => {
//       setValue((prevValue) => prevValue + emoji);
//     },
//     []
//   );

//   return (
//     <>
//       <TextField
//         fullWidth
//         multiline
//         variant="outlined"
//         rows={6}
//         placeholder={placeholder}
//         value={value}
//         onChange={handleTextFieldChange}
//       />
//       <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
//         <IconButton onClick={toggleOpen}>
//           {open ? <CloseIcon style={{ color: 'orange' }} /> : <EmojiEmotionsIcon style={{ color: 'orange' }} />}
//         </IconButton>
//       </div>
//       {maxCharacters && (
//         <FormHelperText error={characters >= maxCharacters}>
//           {`${characters}/${maxCharacters} characters`}
//         </FormHelperText>
//       )}
//       <Collapse in={open}>
//         <Box mt={1}>
//           <EmojiPicker onEmojiClick={onSelectEmoji} />
//         </Box>
//       </Collapse>
//     </>
//   );
// };

// EmojiTextArea.propTypes = {
//   placeholder: PropTypes.string,
//   maxCharacters: PropTypes.number,
// };

// export default EmojiTextArea;
