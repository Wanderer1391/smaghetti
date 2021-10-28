import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { KeyConfigModal } from './KeyConfigModal';
import { IconGamepad, IconKeyboard } from '../../icons';

type ControlsBannerProps = {
	className?: string;
};

function ControlsBanner({ className }: ControlsBannerProps): ReactElement {
	const [showHelp, setShowHelp] = useState(false);

	return (
		<div className="flex flex-col">
			{showHelp && (
				<KeyConfigModal
					isOpen={showHelp}
					onRequestClose={() => setShowHelp(false)}
				/>
			)}
			<div
				className={clsx(
					className,
					'flex flex-row items-center justify-center space-x-2 p-2 bg-gray-700 text-white'
				)}
			>
				<div>use</div>
				<IconGamepad className="text-2xl" />
				<div>or</div>
				<IconKeyboard className="text-xl" />
				<a
					className="text-blue-300 underline cursor-pointer"
					onClick={() => setShowHelp((h) => !h)}
				>
					configure
				</a>
			</div>
		</div>
	);
}

export { ControlsBanner };
