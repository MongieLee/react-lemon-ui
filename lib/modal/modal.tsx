import React, {FC, MouseEventHandler, PropsWithChildren, ReactElement} from "react";
import ReactDOM from "react-dom";
import "./modal.less"
import classes from "../utils/classes";
import Icon from "../icon/icon";
import Button from "../button/button";

interface ModalProps {
  visible: boolean;
  buttons?: null | ReactElement[];
  onClose?: React.MouseEventHandler;
  maskClosable?: boolean;
  okText?: string;
  onOkClick?: React.MouseEventHandler;
  cancelText?: string;
  onCancelClick?: React.MouseEventHandler;
}


const Modal: FC<PropsWithChildren<ModalProps>> = ({
                                                    children,
                                                    visible,
                                                    buttons,
                                                    onClose,
                                                    maskClosable,
                                                    okText,
                                                    onOkClick,
                                                    cancelText,
                                                    onCancelClick
                                                  }) => {
  const originOnClickHandler: MouseEventHandler = (e) => {
    onClose && onClose(e);
  }

  const onMaskClickHandler: MouseEventHandler = (e) => {
    maskClosable && onClose && onClose(e)
  }

  const instance = visible && (<>
    <div className={classes('lm-modal-mask')} onClick={onMaskClickHandler}/>
    <div>
      <header onClick={originOnClickHandler}>
        <Icon name={'info'}/>
      </header>
      <main className={classes('modal-context')}>{children}</main>
      {buttons !== null
        && (<footer className={classes('modal-footer')}>
          {buttons
            ? buttons.map((eleItem, index) => React.cloneElement(eleItem, {key: index}))
            : <div>
              <Button onClick={onOkClick && onOkClick}>{cancelText ? cancelText : '取消'}</Button>
              <Button style={{marginLeft: 8}} onClick={onCancelClick && onOkClick}
                      type={"primary"}>{okText ? okText : '确定'}</Button>
            </div>}
        </footer>)}
    </div>
  </>)
  return ReactDOM.createPortal(instance, document.body);
};

export default Modal;