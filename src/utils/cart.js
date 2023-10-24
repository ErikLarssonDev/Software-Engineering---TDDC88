/**
 * Here we will put all functions that are related to the cart functionality.
 */

import { selected } from "../recoil/atoms";

export const remaining = (selectedArticle) => {
  return selectedArticle.quantity - selectedArticle.amount;
};

export const displayRemaining = (selectedArticle) => {
  if (selectedArticle.amount < selectedArticle.quantity ) {
  return selectedArticle.quantity - selectedArticle.amount;
} else return 0;
};

export const displayRemainingSearch = (selectedSearch) => {

  if (selectedSearch.amount < selectedSearch.compartments[0].quantity) {
  return selectedSearch.compartments[0].quantity - selectedSearch.amount;
} else return 0;
};


export const remainingAfterReturned = (selectedArticle) => {
  return selectedArticle.quantity + selectedArticle.amount;
};


 
// export const removeFromCart = (article) => {
//   const [cart, setCart] = useRecoilState(cartAtom);
//   const newCart = cart.filter((item) => item.lioNum !== article);
//   setCart(newCart);
// };
