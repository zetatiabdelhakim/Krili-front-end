import React, { useState } from "react";
import "./suggest.css";
function Suggest({ element, data, optionsNumber }) {
  let [suggest, setSuggest] = useState(null);
  let [style, setStyle] = useState({
    display: "none",
    width: "200px",
    top: "0",
    left: "0",
  });

  function handelOnInput() {
    let a = { ...style };
    a.display = "";
    a.width = `${element.offsetWidth}px`;
    a.top = `${element.offsetTop + element.offsetHeight}px`;
    a.left = `${element.offsetLeft}px`;
    setStyle(a);
    let value = element.value;
    let list = getList(value);
    setSuggest(list);
  }
  function handelOnBlur() {
    let a = { ...style };
    a.display = "none";
    setTimeout(() => {
      setStyle(a);
    }, 300);
  }
  function handelOnclickLi(e) {
    element.value = e.target.innerHTML;
  }
  function getList(startWith) {
    let list = [];
    for (let item of data) {
      if (
        item.toLowerCase().startsWith(startWith.toLowerCase()) &&
        !list.includes(item)
      ) {
        list.push(item);
        if (list.length >= optionsNumber) {
          return list;
        }
      }
    }
    return list;
  }
  if (element !== null) {
    element.oninput = handelOnInput;
    element.onblur = handelOnBlur;
  }
  return (
    <div style={style} className="suggest">
      <ul>
        {suggest && suggest.length !== 0 ? (
          suggest.map((elem, i) => (
            <li onClick={handelOnclickLi} key={i}>
              {elem}
            </li>
          ))
        ) : (
          <li>pas d'options.</li>
        )}
      </ul>
    </div>
  );
}
export default Suggest;
