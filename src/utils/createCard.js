import Card from "../components/Card.js";

export function createCard(
  data,
  handleImgClick,
  handleDeleteClick,
  handleLikeClick
) {
  const card = new Card(
    data,
    "#card-template",
    handleImgClick,
    handleDeleteClick,
    handleLikeClick
  );

  return card.getCardElement();
}
