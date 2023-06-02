import "./Pages.css";

import { useEffect, useState } from "react";

const Pages = (props) => {
  const [page, setPage] = useState(1);
  const perPage = props.perPage;
  const numItems = props.numItems;
  const itemIndex = [(page - 1) * perPage, page * perPage - 1];
  const totalPages = Math.ceil(numItems / perPage);

  const pageHandler = (e) => {
    if (e.target.innerText === "First") {
      setPage((oldPage) => 1);
    } else if (e.target.innerText === "Last") {
      setPage((oldPage) => totalPages);
    } else {
      let clicked = +e.target.innerText;
      setPage((oldPage) => clicked);
    }
  };

  useEffect(() => {
    if (props.numItems > 0) {
      props.onPageChange(itemIndex[0], itemIndex[1] + 1);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [props.numItems]);

  const selected = "page page-selected";

  const multiplepg = (
    <div className="pagination">
      <button className="page" onClick={pageHandler}>
        First
      </button>
      {page === totalPages && totalPages > 2 ? (
        <button className="page" onClick={pageHandler}>
          {page - 2}
        </button>
      ) : (
        ""
      )}
      {page > 1 ? (
        <button className="page" onClick={pageHandler}>
          {page - 1}
        </button>
      ) : (
        ""
      )}
      <button className={selected} onClick={pageHandler}>
        {page}
      </button>
      {page < totalPages ? (
        <button className="page" onClick={pageHandler}>
          {page + 1}
        </button>
      ) : (
        ""
      )}
      {page === 1 && totalPages >= 3 ? (
        <button className="page" onClick={pageHandler}>
          {page + 2}
        </button>
      ) : (
        ""
      )}
      <button className="page" onClick={pageHandler}>
        Last
      </button>
    </div>
  );

  return totalPages > 1 ? multiplepg : "";
};

export default Pages;
