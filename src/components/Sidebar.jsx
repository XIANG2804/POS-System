import "./Sidebar.css";
import { useState } from "react";
import logo from "../assets/temporary-logo.jpg";

function Sidebar() {
  const [selected, setSelected] = useState("首页");
  const menuItems = ["首页", "货物", "车位", "订单", "资料", "设定"];
  {
    /*盒子里的值, 改值的工具 =  useState(默认值)*/
  }
  return (
    <aside>
      <img className="logo" src={logo} alt="Logo" />
      <nav className="navigator">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={selected === item ? "selected" : ""}
              onClick={() => setSelected(item)}
            >
              {item}
            </li>
          ))}
          {/*看最近出什么类型的货,点进去可以看更多车款*/}
          {/*写车款+货名,用于首页的统计,打印Receipt时,不用写车款*/}
          {/*看车停在哪里的*/}
          {/*详细的订单,放大的*/}
          {/*跟着纸皮写的*/}
          {/*之后应该会做备份的地方*/}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
