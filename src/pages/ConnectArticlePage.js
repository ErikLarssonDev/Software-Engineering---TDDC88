import * as React from "react";
import NavBar from "../components/NavBar";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { selected as selectedAtom, storage as storageAtom } from '../recoil/atoms';
import MenuIcon from "../assets/navBarIcons/MenuIcon";
import InstructionTextBox from "../components/InstructionTextBox";
import SearchArticle from "../components/SearchArticle";
import { useState } from "react";
import { fetchArticleLio } from "../utils/articles";
import { fetchArticleName } from "../utils/articles";
import { useRecoilValue } from "recoil";
import ExtraSmallButton from "../components/ExtraSmallButton";
import ConnectDialog from "../components/ConnectDialog";
import { useNavigate } from "react-router-dom";
import { connectArticle } from "../utils/storages";
/**
 *
 * @returns The order connect article component i.e view 13.1
 * TODO: Implement function searchArticle
 */



const ConnectArticlePage = () => {

  const selectedArticle = useRecoilValue(selectedAtom); 
  const [article, setArticle] = useState("");
  const selectedStorage = useRecoilValue(storageAtom);
  const [error, setError] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();


  const onSearch = async (searchedArticle) => {
    setArticle("");
    setError("")
    if (searchedArticle) {
      // If the user searches by LIO number.
      if (!isNaN(searchedArticle)) {
        const queryRes = await fetchArticleLio(searchedArticle);
        if (queryRes.lioNr === undefined) {
          setError("Ogiltigt LIO-nummer")
        } else {
          setError("")
          setArticle(queryRes);
        }
      } else {
        // If the user searches by article name.
        const queryRes = await fetchArticleName(
          searchedArticle.charAt(0).toUpperCase() + searchedArticle.slice(1)
        );
        if (queryRes.name === undefined) {
          setError("Ogiltigt namn")
        } else {
          setError("")
          console.log(queryRes)
          setArticle(queryRes);
        }
      }
    } else {
      setError("Något gick fel...")
      return;
    }
  };


const showDialog = () => {
  setShowConfirmDialog(true);
};

const handleConnectArticle = () => {
  connectArticle(selectedStorage.qrCode,article.lioNr, 0);
}
  var buttonText = "Välj"

  return (

    <Box >
      {!showConfirmDialog && (
        <>
          <NavBar leftIcon={<MenuIcon />} />
          <Container>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <InstructionTextBox text={"Koppla artikel till QR"} ></InstructionTextBox>


              <Card sx={{
                borderRadius: '12px',
                width: '90%',
                minWidth: 300,
                maxHeight: 90,
                border: 1,
                borderColor: '#D0D4D9',
                boxShadow: 4,
                alignContent: 'center',
                mx: 3,
                mt: 3,
                mb: 3,


              }}>

                <CardContent >
                  <Typography style={{ fontWeight: 400, fontSize: 18 }} variant="body2" >Lagerplats</Typography>
                  <Typography style={{ paddingTop: 8, fontWeight: 300, fontSize: 18 }} variant="body2" >
                    Lager {selectedStorage.storageId} {'>'} {selectedStorage.placement}

                  </Typography>

                </CardContent>
              </Card>

              <SearchArticle error={""} onSearch={onSearch} />

              {article !== "" && (
                <Card sx={{
                  borderRadius: '12px',
                  width: '90%',
                  minWidth: 300,
                  maxHeight: 90,
                  border: 1,
                  borderColor: '#D0D4D9',
                  boxShadow: 4,
                  alignContent: 'center',
                  mx: 3,
                  mt: 3,
                  mb: 3,


                }}>
                  <CardContent >
                    <Typography style={{ fontWeight: 400, fontSize: 20 }} variant="body2" >
                      {article.name}
                    </Typography>
                    <Box display={"flex"} flexDirection={"row"}>
                      <Box>
                        <Typography style={{ paddingTop: 8, fontWeight: 300, fontSize: 18 }} variant="body2" >
                          {article.lioNr}
                        </Typography>
                      </Box>
                      <Box ml={12} mr={5} mt={-2}>
                        <ExtraSmallButton
                          text={buttonText}
                          bgColor="#CFE7FC;"
                          onClick={showDialog}

                          
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

              )}

            </Box>
          </Container>
        </>
      )}
      {showConfirmDialog && (
        <>
        <ConnectArticlePage/>
        <ConnectDialog 
        article={article.name}
        lioNr = {article.lioNr}
        storageId={selectedStorage.storageId}
        placement={selectedStorage.placement}
            open={showConfirmDialog}
            targetPage={"../manage-inventory"}
            onClose={() => setShowConfirmDialog(false)}
            successMessage="Artikel kopplad"
            defaultButtons={true}
            onConfirm={handleConnectArticle}
            
          >

        </ConnectDialog>

        </>)}


    </Box>
  );
};

export default ConnectArticlePage;
