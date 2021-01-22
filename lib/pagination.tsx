import React, { useState } from "react";
import "./pagination.scss";

interface PaginationProps {
  preBtnText?: string;
  nextBtnText?: string;
  onPageChange: (currentPage: number) => void;
  showQuickJumper?: boolean;
  total: number;
  showTotal?: boolean;
  currentPage: number;
}

interface PaginationState {
  total: number;
  totalPageSize: number;
  currentPage: number;
  inputValue: string;
}

interface pageOmitProps {
  title: string;
  onClick(): void;
}

const PageOmit: React.FC<pageOmitProps> = (props) => {
  return (
    <li title={props.title} onClick={props.onClick && props.onClick}>
      ...
    </li>
  );
};

const Pagination: React.FC<PaginationProps> = (props) => {
  const [state, setState] = useState<PaginationState>({
    total: props.total || 1, //总条数
    totalPageSize: Math.ceil(props.total / 10) || 1, //总分页数
    currentPage: props.currentPage || 1, //当前分页数
    inputValue: "", //快速跳转输入框值
  });
  const pageChange = (currentPage: number) => {
    const { currentPage: stateCurrentPage } = state;
    if (currentPage === stateCurrentPage) return;
    setState({ ...state, currentPage });
    props.onPageChange.call(undefined, currentPage);
  };

  const nextPageChange = () => {
    let { currentPage, totalPageSize } = state;
    if (currentPage === totalPageSize) return;
    pageChange(currentPage + 1);
  };

  const prePageChange = () => {
    let { currentPage } = state;
    if (currentPage === 1) return;
    pageChange(currentPage - 1);
  };

  const preOmitPageChange = () => {
    const { currentPage } = state;
    pageChange(currentPage - 5);
  };

  const nextOmitPageChange = () => {
    const { currentPage } = state;
    pageChange(currentPage + 5);
  };

  const onInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key === "Enter") {
      //keyCode为13就是回车
      const value = parseInt(event.currentTarget.value.toString());
      const { currentPage, totalPageSize } = state;
      if (isNaN(value)) {
        setState({
          ...state,
          inputValue: "",
        });
      } else if (value > totalPageSize) {
        //如果输入的合法数字大于总页数，则跳转至最后一页
        if (totalPageSize === currentPage) {
          //如果当前已经是第一页，则只清空输入框
          setState({ ...state, inputValue: "" });
        } else {
          setState({
            ...state,
            currentPage: totalPageSize,
            inputValue: "",
          });
          props.onPageChange.call(undefined, totalPageSize);
        }
      } else if (value < 1) {
        //如果输入的合法数字大于总页数，则跳转至最后一页
        if (1 === currentPage) {
          //如果当前已经是最后一页，则只清空输入框
          setState({ ...state, inputValue: "" });
        } else {
          setState({ ...state, currentPage: 1, inputValue: "" });
          props.onPageChange.call(undefined, 1);
        }
      } else if (state.currentPage === parseInt(value.toString())) {
        setState({ ...state, inputValue: "" });
      } else {
        setState({
          ...state,
          inputValue: "",
          currentPage: parseInt(value.toString()),
        });
        props.onPageChange.call(undefined, value);
      }
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, inputValue: event.target.value.toString() });
  };

  const initPage = () => {
    const { nextBtnText, preBtnText } = props;
    const { totalPageSize, currentPage } = state;
    let contentList = [];
    if (totalPageSize <= 9) {
      contentList = Array.from({ length: 9 - 2 }).map((_, i) => {
        return (
          <li
            onClick={() => pageChange(i + 1)}
            className={currentPage === i + 1 ? "page-item-active" : ""}
            key={i + Math.random()}
          >
            {i + 1}
          </li>
        );
      });
    } else if (currentPage + 4 >= totalPageSize) {
      contentList = [
        <li
          key={"first" + Math.random()}
          onClick={() => {
            pageChange(1);
          }}
        >
          1
        </li>,
        <PageOmit
          key={"omit" + Math.random()}
          title="向前5页"
          onClick={preOmitPageChange}
        />,
      ].concat(
        Array.from({ length: 9 - 2 }).map((_, i) => {
          return (
            <li
              onClick={() => pageChange(i + totalPageSize - 9 + 3)}
              className={
                currentPage === i + totalPageSize - 9 + 3
                  ? "page-item-active"
                  : ""
              }
              key={i + Math.random()}
            >
              {i + totalPageSize - 9 + 3}
            </li>
          );
        })
      );
    } else if (currentPage - 4 <= 1) {
      contentList = Array.from({ length: 9 - 2 })
        .map((_, i) => {
          return (
            <li
              onClick={() => pageChange(i + 1)}
              className={currentPage === i + 1 ? "page-item-active" : ""}
              key={i + Math.random()}
            >
              {i + 1}
            </li>
          );
        })
        .concat([
          <PageOmit
            key={"omit" + Math.random()}
            title="向后5页"
            onClick={nextOmitPageChange}
          />,
          <li
            key={"last" + Math.random()}
            onClick={() => {
              pageChange(totalPageSize);
            }}
          >
            {totalPageSize}
          </li>,
        ]);
    } else {
      // eslint-disable-next-line no-sparse-arrays
      contentList = [
        <li key={"first" + Math.random()} onClick={() => pageChange(1)}>
          1
        </li>,
        <PageOmit
          key={"omit" + Math.random()}
          title="向前5页"
          onClick={preOmitPageChange}
        />,
        ,
        ...Array.from({ length: 9 - 4 }).map((_, i) => {
          return (
            <li
              onClick={() => pageChange(i + currentPage - 2)}
              className={
                currentPage === i + currentPage - 2 ? "page-item-active" : ""
              }
              key={i + Math.random()}
            >
              {i + currentPage - 2}
            </li>
          );
        }),
        <PageOmit
          key={"omit" + Math.random()}
          title="向后5页"
          onClick={nextOmitPageChange}
        />,
        <li
          key={"last" + Math.random()}
          onClick={() => pageChange(totalPageSize)}
        >
          {totalPageSize}
        </li>,
      ];
    }

    contentList.unshift(
      <li
        className={currentPage === 1 ? "disabled" : ""}
        onClick={prePageChange}
        key={"pre"}
      >
        {preBtnText}
      </li>
    );
    contentList.push(
      <li
        className={currentPage === totalPageSize ? "disabled" : ""}
        onClick={nextPageChange}
        key={"next"}
      >
        {nextBtnText}
      </li>
    );

    return contentList;
  };

  const { inputValue } = state;
  const { showQuickJumper, showTotal, total } = props;
  return (
    <div className="page-container">
      {showTotal && (
        <span style={{ color: `#333`, marginRight: `.5em`, marginLeft: `1em` }}>
          共{total}条
        </span>
      )}
      <ul className="page-wrapper">{initPage()}</ul>
      {showQuickJumper && (
        <div className="qucik-jump-wrapper">
          跳至
          <input
            onKeyUp={onInputKeyUp}
            value={inputValue}
            onChange={inputChangeHandler}
          />
          页
        </div>
      )}
    </div>
  );
};
Pagination.defaultProps = {
  preBtnText: "<", //上一页的文本
  nextBtnText: ">", //下一页的文本
  onPageChange: () => {}, //页码跳转回调
  showQuickJumper: true, //是否展示快速跳转输入框
  showTotal: true, //是否展示总条数
};

export default Pagination;
