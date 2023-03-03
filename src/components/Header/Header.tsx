import React from "react";

interface IHeaderProps {
    title: string;
}

const Header = ({ title }: IHeaderProps) => {
    return (
        <header className="sticky-header">
            <h1>{title}</h1>
        </header>
    );
};

export default Header;
