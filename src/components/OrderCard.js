import { React } from "react";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ExtraSmallButton from "./ExtraSmallButton";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedOrder as orderAtom } from "../recoil/atoms";
import { format, parseISO } from 'date-fns'

/**
 * @param {order} param0, The order item.
 * @returns The card for orderPage.
 */

const OrderCard = ({
    order
}
) => {
    const navigate = useNavigate();
    //A atom for the selected order.
    const [selectedOrder, setSelectedOrder] = useRecoilState(orderAtom);

    const handleNavigation = () => {
        setSelectedOrder({ ...order })
        navigate("/manage-order")
    }
    return (
        <Box
            marginTop={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
        >
            <Card sx={{
                borderRadius: '12px',
                minWidth: 350,
                border: 1,
                borderColor: '#D0D4D9',
                boxShadow: 4,
            }}>
                <CardContent sx={{ px: 4.6 }}>
                    <Typography sx={{ mt: 2, fontFamily: "Montserrat " }} variant="h5" component="div">
                        Lager {order.storageId}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontWeight: 400, fontSize: 16, fontFamily: "Montserrat " }} color="black">
                        Beställnings ID: {order.id}
                    </Typography>
                    {/* Formating date from ISO-standard into dd/MM-yyyy*/}
                    <Typography sx={{ fontWeight: 300, fontSize: 16 }} variant="body2">
                        Beställningsdatum: {format(parseISO((order.orderDate)), "dd/MM-yyyy")}
                        <br />
                        Beräknad leverans: {format(parseISO((order.estimatedDeliveryDate)), "dd/MM-yyyy")}
                    </Typography>

                    <Grid container spacing={0} sx={{ mt: 2, color: 'text.primary' }}>
                        <Grid >
                            <CheckIcon sx={{ color: 'lightgreen' }}></CheckIcon>
                        </Grid>
                        <Grid sx={{ mx: 1.5, mt: 0.2 }}>
                            <Typography>
                                Status: Levererad
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", mt: -2 }}>
                    <ExtraSmallButton
                        text="Hantera beställning"
                        bgColor="rgba(63, 142, 252, 0.15)"
                        onClick={handleNavigation}
                    />
                </CardActions>
            </Card>
        </Box>
    );
};

export default OrderCard;