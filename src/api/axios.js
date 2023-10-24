import axios from 'axios';

//To change which API to aquire data from, change the number after "c1" to 3 or 4 to get data from that company
export default axios.create({
    baseURL: process.env.REACT_APP_HOST
}); // '' gets root path automatically
