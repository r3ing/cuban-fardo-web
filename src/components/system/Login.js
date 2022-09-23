import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
      //navigate("/client");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <div className="w-full max-w-xs m-auto">
        <h3 className="text-center mb-3 text-slate">Wolcome CUBAN FARGO</h3>
        <div className="rounded px-8 pt-2 pb-8 mb-4 bg-slate-300">
          <button
            className="text-base text-white bg-blue-400 font-bold rounded shadow focus:outline-none hover:bg-blue-500 shadow-md rounded border-2 py-2 px-4 w-full"
            onClick={handleLoginWithGoogle}
          >
            <span className="block mt-1 align-middle">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
              />
            </span>
            Google Login
          </button>
        </div>
      </div>
    </>
  );
}
