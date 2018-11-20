import React from 'react'

const Logo = ({logoSrc, logoAlt, className}) => (
    <div className={className}>
        <img src={logoSrc} alt={logoAlt} style={{borderRadius: "100%"}}/>
    </div>
)

export default Logo