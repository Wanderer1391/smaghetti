import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { RiCloseFill } from 'react-icons/ri';

import { Button } from '../Button';

import styles from './Modal.module.css';

type ModalProps = ReactModalProps & {
	title?: string;
	onOkClick?: () => void;
	okDisabled?: boolean;
	onXClick?: () => void;
	noAnimation?: boolean;
	children: ReactNode;
};

function Modal({
	onOkClick,
	okDisabled,
	onXClick,
	noAnimation,
	title,
	children,
	...rest
}: ModalProps) {
	const overlayClassName = clsx('modalOverlay', { animate: !noAnimation });

	const modalClassName = clsx(
		styles.root,
		'bg-gray-700 text-white rounded-xl px-4 pb-4 pt-3 shadow-lg outline-none',
		{
			hasOkButton: !!onOkClick,
			hasTitle: !!title,
			relative: !!onXClick,
		}
	);

	return (
		<ReactModal
			{...rest}
			className={modalClassName}
			overlayClassName={overlayClassName}
			closeTimeoutMS={noAnimation ? 0 : 250}
		>
			{!!title && (
				<h2 className="font-bold text-xl pb-3 text-center">{title}</h2>
			)}
			<div>{children}</div>
			{onOkClick && (
				<div className="flex flex-col items-center justify-center pt-6 pb-1">
					<Button
						className="bg-purple-400 px-4 py-2"
						onClick={onOkClick}
						disabled={okDisabled}
					>
						okay
					</Button>
				</div>
			)}
			{onXClick && (
				<button
					className="absolute top-1 right-1 text-xl text-white outline-none"
					onClick={onXClick}
				>
					<RiCloseFill />
				</button>
			)}
		</ReactModal>
	);
}

export { Modal };
export type { ModalProps };
