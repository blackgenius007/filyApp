import React, { useState } from 'react';
import { Chip, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import SearchBar from './searchBar';
import { Button } from '@mui/material';

function PdfViewer({ docs, email }) {
  const [url, setUrl] = useState([]);
  const [counter, setCounter] = useState(0);

  const deleteDocs = (e, i) => {
    console.log(i);
    axios.post(`/api/v1/docs/delete/${email}/${i}`).then(
      (res) => {
        alert('Deleted successfully!');
        window.location.reload();
      },
      (err) => {
        alert('An error occurred! Try again.', err);
      }
    );
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {/* <SearchBar /> */}
          <ul>
            {docs &&
              docs.map((data, i) => (
                <li key={data.index}>
                  <Button
                    id="docButton"
                    onClick={() => {
                      setUrl(data);
                      setCounter(i + 1);
                    }}
                    style={{ color: 'blue' }}
                  >
                    Document{i + 1}
                  </Button>
                  <IconButton onClick={(e) => deleteDocs(e, i)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-trash"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#9e9e9e"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </IconButton>
                </li>
              ))}
          </ul>
        </div>
        <div style={{ flex: 3 }} className="webviewer">
          <object width="100%" height="800" data={url} type="application/pdf">
            {' '}
          </object>
        </div>
      </div>
    </>
  );
}

export default PdfViewer;

// import React, { useEffect, useState, useRef } from "react";
// import { Chip, IconButton, Typography } from '@mui/material';
// import axios from 'axios';
// import SplitPane from "react-split-pane";

// import SearchBar from "./searchBar";

// import { Button } from "@mui/material";

// function PdfViewer({docs,email}) {

//   console.log(docs)
//   const [url, setUrl] = useState([]);
//   const [counter, setCounter] = useState(0);

//   console.log(url)

// const deleteDocs=(e,i)=>{
// console.log(i)
// axios.post(`/api/v1/docs/delete/${email}/${i}`).then(
//   (res) => {
//     alert('Deleted successfully!');
//     window.location.reload();
//   },
//   (err) => {
//     alert('An error occured! Try again.', err);
//   }
// );
// }

//   return (
//     <>
//     <div>
//     <div class="row">
//   <div class="column"></div>
//   <div class="column"><Button style={{color:"blue"}} > {counter > 0 ? <Typography>Document {''}{counter}</Typography>:"" }</Button></div>
// </div>

//     </div>

//     <br/>
//     <SplitPane split="vertical" minSize={250} defaultSize={200} maxSize={400}>

//       <view>
//         {/* <SearchBar /> */}
//         <ul>
//           {docs && docs.map((data,i) => (

//             <li key={data.index} >
//               {/* <Button id="docButton" onClick={() => setUrl(data)}> */}
//               <Button id="docButton" onClick={()=> {setUrl(data); setCounter(i+1)}} >
//                 {" "}
//              Document{i+1}

//               </Button>
//               <IconButton onClick={(e)=>deleteDocs(e,i)} ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
//   <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
//   <line x1="4" y1="7" x2="20" y2="7" />
//   <line x1="10" y1="11" x2="10" y2="17" />
//   <line x1="14" y1="11" x2="14" y2="17" />
//   <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
//   <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
// </svg></IconButton>
//             </li>

//           ))}
//         </ul>
//       </view>
//       <div className="webviewer">
//         <object width="100%" height="800" data={url} type="application/pdf">
//           {" "}
//         </object>
//       </div>
//     </SplitPane>

//     </>
//   );
// }

// export default PdfViewer;
