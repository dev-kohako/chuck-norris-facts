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
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full min-h-screen bg-opacity-50 backdrop-blur-lg">
        <div
          style={modalStyle}
          className="relative flex flex-col items-center justify-center w-full max-w-full px-0.5 pt-4 pb-2 overflow-y-auto bg-gradient-to-tl from-zinc-300 to-zinc-200 shadow-neumorphism dark:from-zinc-800 dark:to-zinc-700 dark:shadow-dark-neumorphism backdrop-blur-3xl sm:landscape:min-w-[70%] sm:landscape:max-w-[80%] xs:min-w-[85%] xs:max-w-[85%] sm:min-w-[80%] sm:max-w-[80%] md:min-w-[70%] md:max-w-[70%] xl:landscape:min-w-[60%] xl:landscape:max-w-[60%] rounded-xl"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            className="absolute m-0.5 text-3xl duration-150 hover:text-sky-500 top-1 right-2 md:right-3 md:text-4xl text-zinc-700 dark:text-zinc-200 dark:hover:text-sky-500"
            aria-label="Close modal"
          >
            &times;
          </button>
          <div className="w-full px-6 py-2 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
