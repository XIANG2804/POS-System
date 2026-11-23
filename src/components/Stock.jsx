import "./Stock.css";

function Stock({ items, setItems }) { //从App.jsx进来的
  const products = [
    {
      id: 0,
      name: "Saga Oil Filter",
      price: 10,
    },
    {
      id: 1,
      name: "Wira Oil Filter",
      price: 10,
    },
    {
      id: 2,
      name: "Kancil Oil Filter",
      price: 10,
    },
  ];


  const productList = products.map((product) => (
    <div
      key={product.id}
      className="product-card"
      onClick={() => addToCart(product)}>
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  ));

  function addToCart(clickedProduct) {  //创建addToCart函数, 接收被点击product的资料,并命名为clickedProduct
    const existProduct = items.find(    //items是购物车里的商品数组,能找到第一个符合条件的商品就返回,找不到就undefined
      (item) => item.id === clickedProduct.id  //item.id是购物车当前检查的id,clickedProduct.id是这次点击的商品id
    );

    if (existProduct) {                 //如果商品存在购物车
      setItems(items.map((item) => {    //map()逐个检查items里的商品,暂时叫它item
        if (item.id === clickedProduct.id) {  //如果购物车当前检查的商品id,等于刚刚点击的商品id
          return {    //返回一个新的商品对象
            ...item,  //复制原本商品的所有资料
            quantity: item.quantity + 1 //商品quantity加1
          }
        } else {          //如果不是刚刚点击的商品
          return item;  //保留原本商品,不做更改
        }
      }))
    } else {      //如果购物车没有这个商品
      setItems([
        ...items,   //把购物车原本的东西全部保留下来
        {
          ...clickedProduct, //复制刚刚点击的商品资料
          quantity: 1,    //商品quantity初始数量设置为1
        }
      ]);
    }
  };

  return (
    <div>
      <h2>Stocks</h2>
      {productList}
    </div>
  );
};



export default Stock;