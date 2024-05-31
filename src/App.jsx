
import './App.css'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation();

    const {data, isLoading: isGettingData, isError: isDataFailed, } = useGetListQuery({
        skip: isAuthenticated,
    });
    console.log(data, isGettingData, isDataFailed, isSuccess);
    /*{} -> query's
    * [] -> mutation's*/

    const logout = () => {
        removeCookie("authToken");
        removeCookie("user");
        setIsAuthenticated(false);
    }

    const {handleSubmit, register, formState: { errors } }= useForm();

    const onSubmit = (data) => {
        loginUser(data);
    }

    useEffect(() => {
        if(isSuccess) {
            console.log("User has logged in, successfully");
        }
        if(getCookie("authToken")) {
            setIsAuthenticated(true);
        }
    }, [isSuccess]);

   return(
       <div className="flex flex-col w-full m-auto h-screen">
           {!isAuthenticated && (<form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
               <div className="mb-5">
                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                       email</label>
                   <input
                       id="id"
                       type="number"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="12324242"
                       {...register("id", {
                           required: {
                               value: true,
                               message: "Por favor digitar cédula"
                           }
                       })}
                   />
                   <span className="text-amber-700">
                    {errors.id?.message && errors.id.message}
                </span>
               </div>
               <div className="mb-5">
                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                       password</label>
                   <input
                       id="password"
                       type="password"
                       {...register("password", {
                           required: {
                               value: true,
                               message: "Por favor digitar password"
                           }
                       })}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   />

               </div>
               <div className="flex items-start mb-5">
                   <div className="flex items-center h-5">
                       <input id="remember" type="checkbox" value=""
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                       />
                   </div>
                   <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                       me</label>
                   <span className="text-amber-700">
                    {errors.password?.message && errors.password.message}
                </span>
               </div>
               <button
                   type="submit"
                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
               </button>
           </form>)}

           {isAuthenticated && (
               <div className="text-amber-700">
                   <h2>You're signed up for your account</h2>
                   <button
                       onClick={() => logout()}
                       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                   >
                       Logout
                   </button>
               </div>
           )}
       </div>
   )
}

export default App
