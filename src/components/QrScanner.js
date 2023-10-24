import React from "react";
import Box from "@mui/material/Box";
import { QrReader } from "react-qr-reader";
import { useState, useEffect } from "react";

/**
 * 
 * @returns A QR scanner component. It is currently not used since we have the ModernQrScanner but this is kepts as a backup. 
 */

const QrScanner = () => {
  const [data, setData] = useState("No result");
  
  const detectCamera = async () => {
    navigator.permissions.query({name:'camera'}).then(res => {
        res.onchange = ((e)=>{
          // detecting if the event is a change
          if (e.type === 'change'){
            // checking what the new permissionStatus state is
            const newState = e.target.state
            if (newState === 'denied') {
              console.log('why did you decide to block us?')
            } else if (newState === 'granted') {
              console.log('We will be together forever!')
            } else {
              console.log('Thanks for reverting things back to normal')
            }
          }
        })
      })
  };

  useEffect(() => {
    (async function effectDetectCamera() {
      await detectCamera();
    })();
  }, []);

  return (
    <Box>
      <Box marginLeft={1} marginRight={1}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }
            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
          constraints={{ facingMode: "rear" }}
        />
        <p>{data}</p>
      </Box>
    </Box>
  );
};

export default QrScanner;
