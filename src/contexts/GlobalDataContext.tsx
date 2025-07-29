import React, { createContext, useContext, useState } from "react";

type Status = {
	status: string;
	id: string;
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
};

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(
	undefined
);

export const GlobalDataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<GlobalData | null>(null);
	const [globalLoading, setglobalLoading] = useState(true);
	const handleSetData = (newData: GlobalData) => {
		setData(newData);
	};
	const handleSetLoading = (newData: boolean) => {
		setglobalLoading(newData);
	};
	return (
		<GlobalDataContext.Provider
			value={{
				data,
				globalLoading,
				setData: handleSetData,
				setGlobalLoading: handleSetLoading,
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
