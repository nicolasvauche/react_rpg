import "./index.scss";

const Item = ({ item }) => {
  return (
    <figure>
      <img src={"/img/" + item.picture} alt={item.name} />
      <figcaption>{item.name}</figcaption>
    </figure>
  );
};

export default Item;
