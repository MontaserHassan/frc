/* eslint-disable prettier/prettier */
const generateOrderNumber = (): number => {
    const newOrderNumber = Math.floor(10000000 + Math.random() * 90000000);
    return newOrderNumber;
};



export {
    generateOrderNumber
};