import React, { useEffect, useState } from 'react';
import Item from '../component/Item.js';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Edititem from '../component/EditItem.js';

function Itemlist({ isLoggedIn, setLoggedIn }) {
  const [itemData, setItemData] = useState({
    isLoad: true,
    data: [],
  });
  const [isEdititem, setEdititem] = useState(0);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/mystore`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isLoggedIn.accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data.items);
        setItemData({
          isLoad: false,
          data: res.data.data.items,
        });
        console.log(itemData.isLoad);
      });
  }, []);

  let clickedBtn = (e) => {
    console.log(e.target.id);
    setEdititem(e.target.id);
  };

  let findOne = (isEdititem) => {
    if (isEdititem !== 0) {
      let Answer = {};
      for (let n = 0; n < itemData.data.length; n++) {
        if (isEdititem === itemData.data[n]) {
          Answer = Object.keys();
          Answer.originalname = itemData.data[n].itemname;
        }
      }
      return Answer;
    }
  };

  return (
    <div className="itemlist container center">
      <div className="subNav">
        <button
          className="mediumBtn reverse"
          onClick={() => {
            history.push('/create');
          }}
        >
          상품 등록
        </button>
      </div>

      <h1>상품 리스트</h1>
      {itemData.isLoad ? (
        <div className="container center">
          <div className="loadimg">
            <div className="bouncybox">
              <div className="bouncy"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container center">
          <div className="itemlistCard container">
            {itemData.data.length !== 0 ? (
              isEdititem === 0 ? (
                itemData.data.map((el, i) => {
                  return <Item key={i} item={el} id={i} button={clickedBtn} />;
                })
              ) : (
                <Edititem chosenItem={findOne} isLoggedIn={isLoggedIn} />
              )
            ) : (
              <div className="bgLightGray center emptyImgContainer">
                <div className="empty">
                  <svg viewBox="0 0 512.005 512.005">
                    <path d="M512.004 192.508c0-10.448-8.501-18.949-18.949-18.949h-47.216a7.5 7.5 0 0 0 0 15h47.216a3.953 3.953 0 0 1 3.949 3.949v259.951L393.547 325.252a18.874 18.874 0 0 0-14.7-6.992H291.45a7.5 7.5 0 0 0 0 15h87.396c1.194 0 2.31.531 3.063 1.457l106.828 131.351H120.565a3.931 3.931 0 0 1-3.064-1.458L15.911 339.7c-1.42-1.747-.824-3.51-.502-4.187.322-.678 1.315-2.253 3.566-2.253h235.448a7.5 7.5 0 0 0 0-15H122.622v-57.471c1.064.029 2.131.047 3.202.047h88.14a15.452 15.452 0 0 0 14.319-9.567 15.454 15.454 0 0 0-3.36-16.891l-12.683-12.683c17.591-19.995 27.565-45.138 28.461-71.862h24.729c1.055 0 2.047.411 2.792 1.156l21.044 21.044a35.219 35.219 0 0 0-2.604 13.306c0 19.527 15.886 35.413 35.413 35.413 18.44 0 33.627-14.171 35.26-32.193h51.477a7.5 7.5 0 0 0 0-15h-53.346c-4.866-13.751-17.993-23.632-33.39-23.632-9.329 0-17.822 3.632-24.154 9.55l-19.093-19.094a18.824 18.824 0 0 0-13.399-5.55h-25.201c-1.839-19.271-8.462-37.674-19.464-53.761a7.501 7.501 0 0 0-12.382 8.468c11.377 16.635 17.391 36.12 17.391 56.346 0 26.697-10.397 51.797-29.275 70.675a7.5 7.5 0 0 0 0 10.606l17.817 17.817c.126.126.236.236.108.544-.127.308-.282.308-.46.308h-88.14c-55.112 0-99.949-44.837-99.95-99.949 0-26.671 10.403-51.763 29.295-70.655s43.984-29.296 70.655-29.296c21.175 0 41.41 6.543 58.517 18.919a7.5 7.5 0 0 0 8.793-12.153c-19.681-14.24-42.957-21.767-67.31-21.767-30.678 0-59.537 11.964-81.262 33.689-21.724 21.726-33.688 50.586-33.688 81.263 0 57.19 41.984 104.752 96.748 113.503v58.87H18.975c-7.383 0-13.94 4.142-17.112 10.81-3.171 6.667-2.248 14.367 2.411 20.095l101.59 124.911a18.874 18.874 0 0 0 14.701 6.993h383.939c4.031.05 7.565-3.467 7.499-7.504V192.508zm-189.928-27.581c11.255 0 20.413 9.157 20.413 20.413s-9.157 20.413-20.413 20.413-20.413-9.157-20.413-20.413 9.157-20.413 20.413-20.413z" />
                    <path d="m276.722 406.47 25.889 34.017a17.598 17.598 0 0 0 13.926 6.902h101.018c4.784 0 9.075-2.663 11.2-6.949s1.645-9.314-1.252-13.122l-25.889-34.017a17.598 17.598 0 0 0-13.926-6.902H286.669a12.425 12.425 0 0 0-11.2 6.95 12.427 12.427 0 0 0 1.253 13.121zm110.966-5.07c.776 0 1.52.369 1.989.986l22.834 30.003h-95.974c-.776 0-1.52-.369-1.989-.986L291.714 401.4zm-185.07 38.487a7.5 7.5 0 0 0 7.5 7.5h45.887a7.5 7.5 0 0 0 0-15h-45.887a7.5 7.5 0 0 0-7.5 7.5zm36.641-17.376a7.5 7.5 0 0 0 0-15h-19.477a7.5 7.5 0 0 0 0 15zm-60.341-307.219a22.35 22.35 0 0 0-6.59-15.909c-4.25-4.25-9.9-6.591-15.91-6.591s-11.661 2.341-15.91 6.591l-14.685 14.685-14.683-14.686c-4.25-4.25-9.9-6.59-15.91-6.59s-11.661 2.341-15.91 6.59c-4.25 4.25-6.59 9.9-6.59 15.91s2.34 11.66 6.59 15.91l14.684 14.685-14.684 14.684c-4.25 4.25-6.59 9.9-6.59 15.91s2.341 11.661 6.59 15.909c4.25 4.25 9.9 6.591 15.91 6.591s11.661-2.341 15.91-6.59l14.684-14.685 14.685 14.685c4.25 4.25 9.9 6.59 15.91 6.59s11.66-2.34 15.91-6.59 6.59-9.9 6.59-15.91-2.34-11.66-6.59-15.91l-14.685-14.685 14.685-14.685a22.351 22.351 0 0 0 6.589-15.909zm-17.197 5.303-19.988 19.988a7.5 7.5 0 0 0 0 10.606l19.988 19.988c1.417 1.417 2.197 3.3 2.197 5.303s-.78 3.887-2.197 5.303-3.3 2.197-5.303 2.197-3.887-.78-5.303-2.197l-19.988-19.988a7.497 7.497 0 0 0-10.606 0l-19.988 19.988c-1.416 1.416-3.299 2.196-5.303 2.196s-3.887-.78-5.303-2.197a7.447 7.447 0 0 1-2.197-5.303c0-2.003.78-3.887 2.197-5.303l19.987-19.988a7.5 7.5 0 0 0 0-10.606l-19.987-19.988c-1.417-1.417-2.197-3.3-2.197-5.303s.78-3.887 2.197-5.303c1.416-1.417 3.299-2.197 5.303-2.197s3.887.78 5.303 2.197l19.987 19.988a7.497 7.497 0 0 0 10.606 0l19.988-19.988c1.417-1.417 3.299-2.197 5.303-2.197s3.886.78 5.303 2.198a7.447 7.447 0 0 1 2.197 5.303 7.445 7.445 0 0 1-2.196 5.303zm258.109 38.777c16.281 0 29.527-13.246 29.527-29.527s-13.246-29.527-29.527-29.527-29.527 13.246-29.527 29.527 13.246 29.527 29.527 29.527zm0-44.054c8.01 0 14.527 6.517 14.527 14.527s-6.517 14.527-14.527 14.527-14.527-6.517-14.527-14.527 6.517-14.527 14.527-14.527zm-75.601-11.07c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197l4.058-4.058 4.058 4.058c1.464 1.465 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197a7.5 7.5 0 0 0 0-10.606l-4.058-4.058 4.058-4.058a7.5 7.5 0 0 0 0-10.606 7.5 7.5 0 0 0-10.606 0l-4.058 4.058-4.058-4.058a7.5 7.5 0 0 0-10.606 0 7.5 7.5 0 0 0 0 10.606l4.058 4.058-4.058 4.058a7.497 7.497 0 0 0 0 10.606zM28.317 295.193c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197l7.065-7.065 7.065 7.065c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197a7.5 7.5 0 0 0 0-10.606l-7.065-7.065 7.065-7.065a7.5 7.5 0 0 0 0-10.606 7.5 7.5 0 0 0-10.606 0l-7.065 7.065-7.065-7.065a7.5 7.5 0 0 0-10.606 0 7.5 7.5 0 0 0 0 10.606l7.065 7.065-7.065 7.065a7.497 7.497 0 0 0 0 10.606z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Itemlist;
