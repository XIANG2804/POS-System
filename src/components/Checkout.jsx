import { useState } from "react";
import "./Checkout.css";
import formatPlate from "../utils/formatPlate";

function Checkout({ items, setItems }) {
  const listItem = items.map((product) => (
    <div key={product.id} className="item-list">
      <p>{product.name}</p>
      <p>{product.quantity}</p>
      <button onClick={() => increaseQuantity(product.id)}>+</button>
      {/*点击时调用函数,把当前商品的id传进去*/}
      <button onClick={() => decreaseQuantity(product.id)}>-</button>
      <p>{product.price}</p>
    </div>
  ));




  function increaseQuantity(id) {
    setItems(// const [items, setItems] = useState
      items.map((product) => { //map()逐个检查items里的商品,暂时叫它product
        if (product.id === id) { //找到要增加数量的id
          return { //返回一个新的商品对象
            ...product, //复制原本商品的所有资料
            quantity: product.quantity + 1, //商品quantity加1
          };
        } else {  //反之
          return product; //保留原本商品,不做更改
        }
      })
    );
  }






  function decreaseQuantity(id) {                     //创建 decreaseQuantity 函数,接收id资料
    const targetProduct = items.find((product) => product.id === id); //使用find()找到id符合的商品,保存到targetProduct
    if (targetProduct.quantity === 1) { //如果targetProduct的quantity是1
      setItems(         // const [items, setItems] = useState
        items.filter((product) => product.id !== id) //使用filter()保留id不等于目标id的商品
      );
    } else {//反之
      setItems(// const [items, setItems] = useState
        items.map((product) => {          //map()一个一个拿出items,暂时叫它product
          if (product.id === id) {        //找到要减少数量的id
            return {                      //返回结果
              ...product,//保留原本的商品的所有资料
              quantity: product.quantity - 1,//quantity减1
            };
          } else {//反之
            return product;//不做任何更改, 直接返回原本商品的结果
          }
        })
      );
    }
  }








  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const quantity = items[i].quantity;
    const price = items[i].price;
    total += quantity * price;
  }

  const [numberPlate, setNumberPlate] = useState("");

  function validateCheckout() {
    if (items.length === 0) {
      alert("Please add the product to cart");
      return false;
    }
    if (!numberPlate.trim()) {      //如果删除空格后没有任何内容,代表输入为空
      alert("Please enter Number Plate"); //弹通知
      return false;       //验证失败
    }   //反之
    return true;  //验证成功
  }

  function handleCheckout() {
    if (!validateCheckout()) {
      return;
    }
    console.log("Checkout Successful");
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  {
    /*padStart() 是字符串（String）的方法，不能直接用在数字上，所以月份和日期先用 String() 转换成文字。*/
  }
  const day = String(today.getDate()).padStart(2, "0");
  {
    /*padStart(2, "0")：如果月份或日期只有一位数字，就在前面补 0。例如 5 变成 05。,2的意思是字符串最少要有2个字符*/
  }
  const todayDate = `${year}-${month}-${day}`;
  {
    /*2026-10-20格式*/
  }
  const [date, setDate] = useState(todayDate);
  const [cash, setCash] = useState(false);
  const [fpx, setFpx] = useState(false);
  const [tng, setTng] = useState(false);
  const [cashAmount, setCashAmount] = useState(0);
  const [fpxAmount, setFpxAmount] = useState(0);
  const [tngAmount, setTngAmount] = useState(0);
  const totalPaid = cashAmount + fpxAmount + tngAmount;
  const change = Math.max(totalPaid - total, 0);
  const outStanding = Math.max(total - totalPaid, 0);

  return (
    <div>
      <h2>Checkout</h2>
      <div>{listItem}</div>
      <p>Total (MYR) {total}</p>
      <p>Paid {totalPaid}</p>
      <p>Change {change}</p>
      <p>Outstanding {outStanding}</p>
      <label>
        No.Plate:
        <input
          type="text"
          id="numberPlate"
          value={numberPlate}
          onChange={(e) => setNumberPlate(formatPlate(e.target.value.toUpperCase()))}
        />
      </label>
      <label>
        Invoice No:
        <input type="text" id="invoiceNo" value="" readOnly />
      </label>

      <label>
        Date:
        <input type="date" id="dateTime" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>Payment Detail</label>
      <div className="payment-options">
        <div className="payment-option">
          <input
            type="checkbox"
            id="paymentCash"
            name="payment"
            value="cash"
            checked={cash}
            onChange={(e) => {
              setCash(e.target.checked);
              if (!e.target.checked) {
                setCashAmount(0);
              }
            }}
          />
          <label htmlFor="paymentCash">Cash</label>
          {cash && (
            <div className="payment-amount">
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        <div className="payment-option">
          <input
            type="checkbox"
            id="paymentFpx"
            name="payment"
            value="fpx"
            checked={fpx}
            onChange={(e) => {
              setFpx(e.target.checked);
              if (!e.target.checked) {
                setFpxAmount(0);
              }
            }}
          />

          <label htmlFor="paymentFpx">FPX</label>

          {fpx && (
            <div className="payment-amount">
              <input
                type="number"
                value={fpxAmount}
                onChange={(e) => setFpxAmount(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        <div className="payment-option">
          <input
            type="checkbox"
            id="paymentTng"
            name="payment"
            value="tng"
            checked={tng}
            onChange={(e) => {
              setTng(e.target.checked);
              if (!e.target.checked) {
                setTngAmount(0);
              }
            }}
          />

          <label htmlFor="paymentTng">TNG</label>

          {tng && (
            <div className="payment-amount">
              <input
                type="number"
                value={tngAmount}
                onChange={(e) => setTngAmount(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>

      <button onClick={handleCheckout}>
        Check Out
      </button>

    </div>
  );
}

export default Checkout;
