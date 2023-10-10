// import React, { Fragment, useState, useCallback } from "react";
// import PropTypes from "prop-types";
// // import "emoji-mart/css/emoji-mart.css";
// import { Picker } from "emoji-mart";
// import {
//   TextField,
//   IconButton,
//   Collapse,
//   FormHelperText,
//   Box,
//   Grid
// } from "@mui/material";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import CloseIcon from "@mui/icons-material/Close";
// import countWithEmojis from "../functions/countWithEmojis";

// const styles = {
//   "@global": {
//     ".emoji-mart-category-label": {
//       fontSize: "1rem"
//     },
//     ".emoji-mart-bar": { display: "none !important" },
//     ".emoji-mart-search input": {
//       fontSize: "1rem",
//       // Add your border styles here
//     },
//     ".emoji-mart-search": {
//       marginTop: "1rem !important",
//       paddingRight: "1rem !important",
//       paddingLeft: "1rem !important",
//       paddingBottom: "1rem !important"
//     },
//     ".emoji-mart-search-icon": {
//       top: "5px !important",
//       right: "14px !important",
//       fontSize: 20
//     },
//     ".emoji-mart-scroll": {
//       height: 240
//     },
//     ".emoji-mart": {
//       // Add your border styles here
//     }
//   },
//   floatButtonWrapper: {
//     position: "absolute",
//     bottom: 12,
//     right: 12
//   },
//   floatButtonSVG: {
//     color: "orange"
//   },
//   relative: {
//     position: "relative"
//   }
// };

// /**
//  * Emojis whose unified is greater than 5 sometimes
//  * are not displayed correctly in the browser.
//  * We won't display them.
//  */
// const emojisToShowFilter = emoji => {
//   if (emoji.unified.length > 5) {
//     return false;
//   }
//   return true;
// };

// function EmojiTextarea(props) {
//   const {
//     theme,
//     emojiSet,
//     rightContent,
//     placeholder,
//     maxCharacters,
//     inputClassName
//   } = props;
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("");
//   const [characters, setCharacters] = useState(0);

//   const onSelectEmoji = useCallback(
//     emoji => {
//       let _characters;
//       let _value = value + emoji.native;
//       if (maxCharacters) {
//         _characters = countWithEmojis(_value);
//         if (_characters > maxCharacters) {
//           return;
//         }
//       }
//       setValue(_value);
//       setCharacters(_characters);
//     },
//     [value, setValue, setCharacters, maxCharacters]
//   );

//   const handleTextFieldChange = useCallback(
//     event => {
//       const { target } = event;
//       const { value } = target;
//       let characters;
//       if (maxCharacters) {
//         characters = countWithEmojis(value);
//         if (characters > maxCharacters) {
//           return;
//         }
//       }
//       setValue(value);
//       setCharacters(characters);
//     },
//     [maxCharacters, setValue, setCharacters]
//   );

//   const toggleOpen = useCallback(() => {
//     setOpen(!open);
//   }, [open, setOpen]);

//   return (
//     <Fragment>
//       <Grid spacing={0} container>
//         <Grid
//           item
//           xs={rightContent ? 8 : 12}
//           sm={rightContent ? 9 : 12}
//           lg={rightContent ? 10 : 12}
//           style={{ position: "relative" }}
//         >
//           <TextField
//             fullWidth
//             multiline
//             variant="outlined"
//             rows={6}
//             onInput={handleTextFieldChange}
//             value={value}
//             placeholder={placeholder}
//             InputProps={{
//               classes: {
//                 notchedOutline: inputClassName ? inputClassName : null
//               }
//             }}
//           />
//           <div style={{ position: "absolute", bottom: 12, right: 12 }}>
//             <IconButton onClick={toggleOpen}>
//               {open ? (
//                 <CloseIcon style={{ color: "orange" }} />
//               ) : (
//                 <EmojiEmotionsIcon style={{ color: "orange" }} />
//               )}
//             </IconButton>
//           </div>
//         </Grid>
//         {rightContent && (
//           <Grid item xs={4} sm={3} lg={2}>
//             {rightContent}
//           </Grid>
//         )}
//       </Grid>
//       {maxCharacters && (
//         <FormHelperText error={characters >= maxCharacters}>
//           {`${characters}/${maxCharacters} characters`}
//         </FormHelperText>
//       )}
//       <Collapse in={open}>
//         <Box mt={1}>
//           <Picker
//             set={emojiSet}
//             color={theme.palette.primary.main}
//             style={{ width: "100%" }}
//             onSelect={onSelectEmoji}
//             emojisToShowFilter={emojisToShowFilter}
//           />
//         </Box>
//       </Collapse>
//     </Fragment>
//   );
// }

// EmojiTextarea.propTypes = {
//   theme: PropTypes.object.isRequired,
//   emojiSet: PropTypes.string.isRequired,
//   rightContent: PropTypes.element,
//   placeholder: PropTypes.string,
//   maxCharacters: PropTypes.number,
//   inputClassName: PropTypes.string
// };

// export default function StyledEmojiTextarea(props) {
//   return (
//     <EmojiTextarea {...props} />
//   );
// }
