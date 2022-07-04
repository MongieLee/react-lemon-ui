import React, {FC, MouseEventHandler, PropsWithChildren, ReactElement, useRef} from 'react';
import ReactDOM from 'react-dom';
import './modal.less';
import classes from '../utils/classes';
import Icon from '../icon/icon';
import Button from '../button/button';

interface ModalProps {
  visible: boolean;
  footer?: null | ReactElement[];
  maskClosable?: boolean;
  okText?: string;
  onOkClick?: React.MouseEventHandler;
  cancelText?: string;
  onCancelClick?: React.MouseEventHandler;
  title?: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
                                                    children, visible, footer, maskClosable, okText,
                                                    onOkClick, cancelText, onCancelClick, title
                                                  }) => {
  const ele = useRef<HTMLDivElement>(null);
  const onMaskClickHandler: MouseEventHandler = (e) => {
    maskClosable && onCancelClickHandler(e);
  };

  const onCancelClickHandler: MouseEventHandler = (e) => {
    if (onCancelClick) {
      ele.current!.className = ele.current!.className += ` lm-modal-fade-out`
      setTimeout(() => {
        onCancelClick(e);
      }, 200)
    }
  }

  const onOkClickHandler: MouseEventHandler = (e) => {
    onOkClick && onOkClick(e);
  }

  const instance = visible && (<>
    <div className={classes('lm-modal-mask')} onClick={onMaskClickHandler}/>
    <div className={'lm-modal'} ref={ele}>
      <header className={classes('lm-modal-header')}>
        <div>{title ? title : "Modal"}</div>
        <div className={'lm-modal-close'} onClick={onCancelClickHandler}>
          <Icon name={'close'} className={'lm-modal-close-icon'}/>
        </div>
      </header>
      <main className={classes('lm-modal-content')}>{children}</main>
      {footer !== null
        && (<footer className={classes('lm-modal-footer')}>
          {footer
            ? footer.map((eleItem, index) => React.cloneElement(eleItem, {key: index}))
            : <div>
              <Button onClick={onCancelClickHandler}>{cancelText ? cancelText : '取消'}</Button>
              <Button style={{marginLeft: 8}} onClick={onOkClickHandler}
                      type={'primary'}>{okText ? okText : '确定'}</Button>
            </div>}
        </footer>)}
    </div>
  </>);
  return ReactDOM.createPortal(instance, document.body);
};

export default Modal;
