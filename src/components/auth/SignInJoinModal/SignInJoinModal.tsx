import React, { useState } from 'react';
import clsx from 'clsx';
import { Modal } from '../../Modal';

import logoPng from '../../../images/logo.png';

type SignInJoinModalMode = 'sign-in' | 'join' | 'join-to-save';
type Credentials = { username?: string; email: string; password: string };

type PublicSignInJoinModalProps = {
	className?: string;
	initialMode?: SignInJoinModalMode;
	message?: string;
	onCancel?: () => void;
};

type InternalSignInJoinModalProps = {
	onSignIn: (value: Credentials) => void;
	onJoin: (value: Credentials) => void;
	error?: string | null;
};

const titles: Record<SignInJoinModalMode, string> = {
	'sign-in': 'Sign In',
	join: 'Join',
	'join-to-save': 'Join to save your level',
};

function Input({
	label,
	type,
	value,
	onChange,
}: {
	label: string;
	type: 'email' | 'password' | 'text';
	value: string | undefined;
	onChange: (value: string) => void;
}) {
	return (
		<label className="w-full text-xs my-2 text-gray-400">
			<div className="pb-0.5">{label}</div>
			<input
				className="p-2 text-black w-full"
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</label>
	);
}

const BLANK_CREDENTIALS = {
	email: '',
	password: '',
};

function SignInJoinModal({
	onCancel,
	initialMode = 'sign-in',
	message,
	onSignIn,
	onJoin,
	error,
}: PublicSignInJoinModalProps & InternalSignInJoinModalProps) {
	const [showDisclaimer, setShowDisclaimer] = useState(false);
	const [mode, _setMode] = useState<SignInJoinModalMode>(initialMode);
	const [credentials, setCredentials] = useState<Credentials>(
		BLANK_CREDENTIALS
	);

	const isJoining = mode === 'join' || mode === 'join-to-save';

	function setMode(newMode: SignInJoinModalMode) {
		if (newMode !== mode) {
			_setMode(newMode);
			setCredentials(BLANK_CREDENTIALS);
		}
	}

	const title = titles[mode];

	const aClassName = 'text-blue-400 underline cursor-pointer';

	const toggle =
		mode === 'sign-in' ? (
			<>
				No account?{' '}
				<a className={aClassName} onClick={() => setMode('join')}>
					create one
				</a>
			</>
		) : (
			<>
				Already a member?{' '}
				<a className={aClassName} onClick={() => setMode('sign-in')}>
					sign in
				</a>
			</>
		);

	const upperArea =
		mode === 'join-to-save' ? (
			<div className="p-4 bg-gray-200 text-gray-900 text-sm space-y-2 mb-4">
				You need an account to save your level. Accounts are free.
			</div>
		) : (
			<img
				className="block w-20 mx-auto py-6"
				src={logoPng}
				alt="smaghetti logo"
			/>
		);

	return (
		<Modal
			className="w-20"
			isOpen
			title={title}
			onRequestClose={onCancel}
			onXClick={onCancel}
			flexWidth
		>
			<div className="flex flex-col items-center w-80 -mx-4">
				{upperArea}
				{isJoining && (
					<div className="px-4 py-2 text-sm">
						joining means you agree to our{' '}
						<a className={aClassName} href="/privacy" target="_blank">
							privacy policy
						</a>
						, our{' '}
						<a className={aClassName} href="/tos" target="_blank">
							terms of service
						</a>
						, and understand Smaghetti is in early preview, it will be a{' '}
						<span className="px-1 bg-red-700 text-white font-bold">
							rough ride
						</span>{' '}
						at times (
						<a
							className={aClassName}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setShowDisclaimer(true);
							}}
						>
							what?
						</a>
						)
					</div>
				)}
				{showDisclaimer && isJoining && (
					<div className="p-4 bg-gray-200 text-gray-900 text-sm my-4">
						Since we are still building the site, things are going to change a
						lot. You might find a level you made no longer works and possibly
						many other headaches.
					</div>
				)}
				{(message || error) && (
					<div
						className={clsx('w-full text-center py-2', {
							'bg-yellow-100 text-yellow-900': !!message,
							'bg-red-100 text-red-900': !!error,
						})}
					>
						{error || message}
					</div>
				)}
				<form className="flex flex-col w-44">
					{isJoining && (
						<Input
							label="public display name"
							type="text"
							value={credentials.username}
							onChange={(newValue) => {
								setCredentials((c) => {
									return {
										...c,
										username: newValue,
									};
								});
							}}
						/>
					)}
					<Input
						label="email"
						type="email"
						value={credentials.email}
						onChange={(newValue) => {
							setCredentials((c) => {
								return {
									...c,
									email: newValue,
								};
							});
						}}
					/>
					<Input
						label="password"
						type="password"
						value={credentials.password}
						onChange={(newValue) => {
							setCredentials((c) => {
								return {
									...c,
									password: newValue,
								};
							});
						}}
					/>
					<input
						type="submit"
						className="w-full p-2 mt-4 bg-green-500 text-white"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (mode === 'sign-in') {
								onSignIn(credentials);
							} else {
								onJoin(credentials);
							}
						}}
					/>
				</form>
				<div className="pt-6 text-sm text-gray-300">{toggle}</div>
			</div>
		</Modal>
	);
}

export { SignInJoinModal };
export type { SignInJoinModalMode, Credentials, PublicSignInJoinModalProps };
