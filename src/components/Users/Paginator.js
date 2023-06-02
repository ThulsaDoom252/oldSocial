import React, {useState} from 'react';
import classNames from "classnames";

let  Paginator = (props) => {
    const pagesCount = Math.ceil(props.totalCount / props.pageSize)
    const pages = []  //50
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / props.portionSize) //5
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber =  (portionNumber - 1) * props.portionSize + 1 //0
    const rightPortionPageNumber =  portionNumber * props.portionSize  //11

    return (
        <div className="paginator-block">
            {portionNumber > 1 &&  <button className="paginator-left-button" onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button> }
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) =>
            {return <span className={classNames({"paginator-selected-page": props.currentPage === p}, "paginator-page-number")}
                          key={p}
                          onClick={(e) => props.onPageChanged(p)}>{`..${p}..`}</span>
            })}
            {portionCount > portionNumber && <button  className={"paginator-right-button"} onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>
    )
}

export default Paginator;