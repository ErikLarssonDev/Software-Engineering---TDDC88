import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, React } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SmallButton from '../../components/SmallButton';
import NavBarComputer from '../../components/NavBarComputer';
import SearchBar from "@mkyy/mui-search-bar";


const originalRows = [
    { name: "Paracetamol", lioNr: "12345", placement: "Hylla 3 > Fack 5", quantity: "10", orderquantityLevel: "100", normalOrderQ: "55", lagerV: "80000", loh: "2gg/år" },
    { name: "Naproxen", lioNr: "33333", placement: "Hylla 2 > Fack 7", quantity: "23", orderquantityLevel: "80", normalOrderQ: "100", lagerV: "100000", loh: "12gg/år" },
    { name: "Handskar", lioNr: "88888", placement: "Hylla 7 > Fack 4", quantity: "88", orderquantityLevel: "50", normalOrderQ: "120", lagerV: "2000", loh: "6gg/år" },
    { name: "Munskydd", lioNr: "66666", placement: "Hylla 8 > Fack 3", quantity: "16", orderquantityLevel: "90", normalOrderQ: "80", lagerV: "5716", loh: "4gg/år" },
    { name: "Mask", lioNr: "55555", placement: "Hylla 23 > Fack 1", quantity: "98", orderquantityLevel: "105", normalOrderQ: "75", lagerV: "998", loh: "0,3gg/år" },
    { name: "Bandage", lioNr: "22225", placement: "Hylla 31 > Fack 4", quantity: "7", orderquantityLevel: "32", normalOrderQ: "25", lagerV: "33333", loh: "7gg/år" },
]


export default function EconomicToday() {
    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <Box >
            <Box sx={{ width: '100%' }} display={"flex"} justifyContent={"center"}>
                <NavBarComputer></NavBarComputer>
            </Box>
            <Box sx={{ width: '80%' }}  justifyContent={"center"} marginLeft={'200px'} >

                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"stretch"}
                    marginTop={5}>
                    <Card >
                        <CardContent>
                            <Box display={"flex"}>
                                <Box sx={{ width: '50%' }} display={"flex"} justifyContent={"left"}>
                                    <SearchBar
                                        value={searched}
                                        onChange={(searchVal) => requestSearch(searchVal)}
                                        onCancelSearch={() => cancelSearch()}
                                    />
                                </Box>
                                <Box sx={{ width: '50%' }} display={"flex"} justifyContent={"right"}>
                                    <SmallButton text="Ändra"
                                        /*onClick={() => handleClick(article)}*/
                                        sx={{
                                            borderRadius: '12px',
                                            width: 70,
                                            color: 'black',
                                            backgroundColor: "#CFE7FC",
                                        }}

                                    />
                                </Box>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Artikel</TableCell>
                                            <TableCell align="right">Lio</TableCell>
                                            <TableCell align="right">Plats</TableCell>
                                            <TableCell align="right">Lagersaldo</TableCell>
                                            <TableCell align="right">Beställningspunkt</TableCell>
                                            <TableCell align="right">Beställningsmängd</TableCell>
                                            <TableCell align="right">Lagervärde</TableCell>
                                            <TableCell align="right">Lageromsättningshastighet</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.lioNr}</TableCell>
                                                <TableCell align="right" contentEditable="true">{row.placement}</TableCell>
                                                <TableCell align="right" contentEditable="true">{row.quantity}</TableCell>
                                                <TableCell align="right" contentEditable="true">{row.orderquantityLevel}</TableCell>
                                                <TableCell align="right" contentEditable="true">{row.normalOrderQ}</TableCell>
                                                <TableCell align="right">{row.lagerV}</TableCell>
                                                <TableCell align="right">{row.loh}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
