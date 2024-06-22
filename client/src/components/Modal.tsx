import React, { Component, ReactNode, CSSProperties } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalState {
  show: boolean;
}

export default class Modal extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      show: props.isOpen,
    };
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.setState({ show: true });
      } else {
        setTimeout(() => this.setState({ show: false }), 300);
      }
    }
  }

  render() {
    const { onClose, children } = this.props;
    const { show } = this.state;

    const modalStyle: CSSProperties = {
      transition: 'opacity 300ms, transform 300ms',
      opacity: this.props.isOpen ? 1 : 0,
      transform: this.props.isOpen ? 'scale(1)' : 'scale(0.9)',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
    };

    if (!show) {
      return null;
    }

    return (
      <div className="fixed z-50 top-0 left-0 w-full xs:min-w-[85%] sm:min-w-[80%] min-h-screen max-h-max flex justify-center items-center dark:bg-black bg-opacity-50 backdrop-blur-lg">
        <div style={modalStyle} className="backdrop-blur-3xl sm:landscape:min-w-[70%] sm:landscape:max-w-[80%] bg-zinc-900/80 px-5 pb-8 pt-6 rounded-xl relative xs:max-w-[85%] sm:max-w-[80%] sm:min-w-[80%] xs:min-w-[85%] xs:min-h-[20%] xs:landscape:max-h-[60%] flex flex-col justify-center items-center">
          <button onClick={onClose} className="absolute top-1 right-2 m-0.5 text-3xl text-zinc-200 hover:text-sky-500 duration-150 font-Poppins" aria-label="Close modal">
            &times;
          </button>
          <div className="w-full px-4 py-2 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
