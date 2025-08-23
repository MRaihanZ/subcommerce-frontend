import React, { createContext, useContext, useState } from "react";

type Status = {
	is_login: boolean;
	is_seller: boolean;
};

type GlobalData = {
	code?: number | null;
	status?: string | null;
	data?: Status | null;
	error?: string | null;
};

type GlobalDataContextType = {
	data: GlobalData | null;
	setData: (newData: GlobalData) => void;
	globalLoading: boolean;
	setGlobalLoading: (newData: boolean) => void;
	globalToast: string | null;
	setGlobalToast: (newData: string | null) => void;
};

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(
	undefined
);

export const GlobalDataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<GlobalData | null>(null);
	const [globalLoading, setGlobalLoading] = useState(true);
	const [globalToast, setGlobalToast] = useState<string | null>(null);
	const handleSetData = (newData: GlobalData) => {
		setData(newData);
	};
	const handleSetLoading = (newData: boolean) => {
		setGlobalLoading(newData);
	};
	const handleSetToast = (newData: string | null) => {
		setGlobalToast(newData);
	};
	return (
		<GlobalDataContext.Provider
			value={{
				data,
				globalLoading,
				globalToast,
				setData: handleSetData,
				setGlobalLoading: handleSetLoading,
				setGlobalToast: handleSetToast,
			}}
		>
			{children}
		</GlobalDataContext.Provider>
	);
};

export const useGlobalData = () => {
	const context = useContext(GlobalDataContext);
	if (!context) {
		throw new Error("useGlobalData must be used within a GlobalDataProvider");
	}
	return context;
};
