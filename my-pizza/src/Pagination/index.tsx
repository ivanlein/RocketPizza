import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number; 
  onChangePage: (page: number) => void;
  show: boolean;
  setShow: (show: boolean) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, show, setShow }) => {
  return (
    <div className={styles.all}>
      {show || (
        <>
          <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event: any) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
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
