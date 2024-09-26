'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';

interface FormData {
	name: string;
	surname: string;
	mail: string;
	content: string;
}

interface FormDataContextProps {
	formData: FormData;
	updateFormData: (data: Partial<FormData>) => void;
	resetFormData: () => void;
}

const FormDataContext = createContext<FormDataContextProps | undefined>(
	undefined,
);

export const useFormData = (): FormDataContextProps => {
	const context = useContext(FormDataContext);
	if (!context) {
		throw new Error('useFormData must be used within a FormDataProvider');
	}

	return context;
};

interface FormDataProviderProps {
	children: React.ReactNode;
}

export const FormDataProvider = ({ children }: FormDataProviderProps) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		surname: '',
		mail: '',
		content: '',
	});

	const updateFormData = (data: Partial<FormData>): void => {
		setFormData((prev) => ({
			...prev,
			...data,
		}));
	};

	const resetFormData = (): void => {
		setFormData({
			name: '',
			surname: '',
			mail: '',
			content: '',
		});
	};

	return (
		<FormDataContext.Provider
			value={{ formData, updateFormData, resetFormData }}
		>
			{children}
		</FormDataContext.Provider>
	);
};
