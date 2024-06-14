import { createContext, useState } from "react";

const StatusContext = createContext();

const StatusProvider = ({ children }) => {
	const [responseStatus, setResponseStatus] = useState("initial");

	return (
		<StatusContext.Provider value={{ responseStatus, setResponseStatus }}>
			{children}
		</StatusContext.Provider>
	);
};

export { StatusContext, StatusProvider };