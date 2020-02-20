import axios from 'axios';

export const getCarouselItems = () =>  axios.get(`https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images/list`);

export const getCarouselItemDetails = (id) =>  axios.get(`https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images?id=${id}`);
