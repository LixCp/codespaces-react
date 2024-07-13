import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPges, setCurrentPges] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pagesSize = 10;
  
  const pagesCount = Math.ceil(todos.length / pagesSize);
  const pagesNumber = Array.from(Array(pagesCount).keys());

  useEffect(() => {
    let endIndex = pagesSize * currentPges;
    let startIndex = endIndex - pagesSize;
    let allShownTodos = todos.slice(startIndex, endIndex);
    setPaginatedTodos(allShownTodos);
  }, [currentPges]);

  const changePaginate = (newPage)=>{
    setCurrentPges(newPage)

  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pagesSize * currentPges
        let startIndex = endIndex - pagesSize
        let allShowTodos = datas.slice(startIndex,endIndex)
        setPaginatedTodos(allShowTodos)  
      });
  }, []);

  return (
    <div>
      {!todos ? (
        "Loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>
                  <p
                    className={
                      item.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {item.completed ? "Completed" : "Pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center" aria-label="...">
        <ul className="pagination pagination-md">
          {pagesNumber.map((item) => (
            <li
              key={item + 1}
              className={
                item + 1 === currentPges ? "active page-item" : "page-item"
              }
              onClick={()=>changePaginate(item+1)}
              aria-current="page"
            >
              <span className="page-link">{item + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
