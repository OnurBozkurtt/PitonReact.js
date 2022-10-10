import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './Sidebar.css';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';


const SideBar = () => {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const Logout = () => {
        localStorage.clear();
        window.location.href = 'login';

    }
    return (
        <div>
            <div className="card">
                <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                    {localStorage.getItem('user') != 'undefined' && localStorage.getItem('access-token') != null ? (<>

                        <Link to={"https://assignment-api.piton.com.tr/api/v1/product/all"}>
                            <button className='pi pi-table'> product</button>
                        </Link><br /><br /><br />

                        <Link to={"https://assignment-api.piton.com.tr/api/v1/product/get/id"}>
                            <button className='pi pi-th-large'> productDetail</button>
                        </Link><br /><br /><br />

                        <button className='pi pi-sign-out' onClick={Logout}>Logout</button>
                    </>) : (<>


                        <Link to={"https://assignment-api.piton.com.tr/api/v1/user/login"}>
                            <button className='pi pi-sign-in'> Login</button>
                        </Link><br /><br /><br />
                        <Link to={"https://assignment-api.piton.com.tr/api/v1/user/register"}>
                            <button className='pi pi-sign-in'> Register</button>
                        </Link><br /><br /><br />


                    </>)
                    }
                </Sidebar>
                <Button icon="pi pi-arrow-right" onClick={() => setVisibleLeft(true)} className="mr-2" />
            </div>
        </div>
    )
}
export default SideBar