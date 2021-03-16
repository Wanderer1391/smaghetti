import React, { useState } from 'react';
import clsx from 'clsx';
import { FaGamepad, FaKeyboard } from 'react-icons/fa';
import { ControlsHelpModal } from './ControlsHelpModal';

type ControlsBannerProps = {
	className?: string;
};

function ControlsBanner({ className }: ControlsBannerProps) {
	const [showHelp, setShowHelp] = useState(false);

	return (
		<>
			<ControlsHelpModal
				isOpen={showHelp}
				onRequestClose={() => setShowHelp(false)}
			/>
			<div
				className={clsx(
					className,
					'flex flex-row items-center justify-center space-x-2 p-2 bg-white'
				)}
			>
				<div>use</div>
				<FaGamepad className="text-2xl" />
				<div>or</div>
				<FaKeyboard className="text-xl" />
				<a
					className="text-blue-500 underline"
					onClick={() => setShowHelp((h) => !h)}
				>
					help
				</a>
			</div>
		</>
	);
}

export { ControlsBanner };
