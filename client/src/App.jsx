import Navbar from "./components/Navbar";
import { useUserContext } from "./contexts/userContext";
import CustomRoutes from "./routes/CustomRoutes";
import { DNA } from "react-loader-spinner";

const App = () => {
  const { isLoading } = useUserContext();
  return (
    <>
      {isLoading ? (
        <div className="h-[80vh] w-full flex justify-center items-center">
          <div className="flex flex-col w-full items-center">
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <h2 className="hidden md:flex text-sm md:text-md">
              Please wait while we load the application for you. This may take a
              few seconds...
            </h2>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <CustomRoutes />
        </>
      )}
    </>
  );
};

export default App;
