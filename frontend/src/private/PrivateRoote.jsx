import {Route, Navigate} from "react-router-dom"
import { useSelector } from "react-redux"




/*export const A2PrivateRoute=({component:Component, path, ...rest})=>{
    const state=useSelector(state =>state.auth)
    return <Route path={path}
                  {...rest}
                  render={(props)=>{
                      if(state.isLoading){
                          return <h3>Loading....</h3>
                      }else if(!state.isAuthenticated ||  !state.isAdmins){
                          return <Navigate to="/login"/>
                      }else{
                          return <Component {...props}/>
                      }
                  }}/>
    
}*/
export const DPrivateRoute = ({ component: Component, ...rest }) => {
    const state = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (state.isLoading) {
                    return <h3>Loading....</h3>;
                } else if (!state.isAuthenticated || !state.isDoctorant) {
                    return <Navigate to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};
/*export const A3PrivateRoute=({component:Component, path, ...rest})=>{
    const state=useSelector(state =>state.auth)
    return <Route path={path}
                  {...rest}
                  render={(props)=>{
                      if(state.isLoading){
                          return <h3>Loading....</h3>
                      }else if(!state.isAuthenticated ||  !state.isAdmint){
                          return <Navigate to="/login"/>
                      }else{
                          return <Component {...props}/>
                      }
                  }}/>
    
}*/
export const A1PrivateRoute = ({ component: Component, ...rest }) => {
    const state = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (state.isLoading) {
                    return <h3>Loading....</h3>;
                } else if (!state.isAuthenticated || !state.isAdminf) {
                    return <Navigate to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};