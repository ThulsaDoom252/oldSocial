import React, {useState, useEffect} from 'react';
import classNames from 'classnames';

const Paginator = ({totalCount, paginatorProps}) => {
    const [currentPage, pageSize, handlePageChange] = paginatorProps;
    const portionSize = 10;
    const pagesCount = Math.ceil(totalCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    useEffect(() => {
        const currentPagePortion = Math.ceil(currentPage / portionSize);
        setPortionNumber(currentPagePortion);
    }, [currentPage]);


    return (
        <div className="paginator-block">
            {portionNumber > 1 && (
                <button className="paginator-left-button" onClick={() => setPortionNumber(portionNumber - 1)}>
                    PREV
                </button>
            )}
            {pages
                .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return (
                        <span
                            className={classNames({'paginator-selected-page': currentPage === p}, 'paginator-page-number')}
                            key={p}
                            onClick={() => handlePageChange(p)}
                        >
              {p}
            </span>
                    );
                })}
            {portionCount > portionNumber && (
                <button className="paginator-right-button" onClick={() => setPortionNumber(portionNumber + 1)}>
                    NEXT
                </button>
            )}
        </div>
    );
};

export default Paginator;
