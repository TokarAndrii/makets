import React from 'react'
import MaterialIcon from 'material-icons-react';

const UserMenu = ({dropDownLogoImageSrc, children, className, userName, handleOpenDropDownMenu}) => (
    <div className={className}>
        <img src={dropDownLogoImageSrc} alt="useMenuDropdownLogo"/>
        <h3 style={{margin: "0px 16px"}}>Hello! {userName}</h3>
        <div style={{cursor: "pointer"}}>
            <MaterialIcon icon="list" size={50} onClick={handleOpenDropDownMenu}/>
        </div>

        {children}
    </div>
)

export default UserMenu