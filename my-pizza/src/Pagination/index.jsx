import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, onChangePage, show, setShow }) => {
  return (
    <div className={styles.all}>
      {show || (
        <>
          <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
          <button className={styles.button} onClick={() => setShow(!show)}>
            Show All
          </button>
        </>
      )}
      {show && (
        <button className={styles.button} onClick={() => setShow(!show)}>
          Show Pagination
        </button>
      )}
    </div>
  );
};

export default Pagination;
