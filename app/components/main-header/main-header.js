import Link from "next/link";
import logoImage from "@/assets/logo.png"
import classes from "./main-header.module.css"
import Image from "next/image";
import NavLink from "./nav-link";

export default function MainHeader(){
  
    
    return <header className={classes.header}>
        <Link className={classes.logo} href="/">
            <Image src={logoImage} alt="A plate with food on it" priority></Image>
            NextLevel Food
        </Link>
        <nav className={classes.nav}>
           <ul>
                <li>
                    <NavLink href="/meals">Browse Meals</NavLink>
                  
                </li>
                <li>
                    <NavLink href="/community">Foodies Community</NavLink>
               
                </li>
                <li>
                    <NavLink href="/meals/share">New Meal</NavLink>
               
                </li>
           </ul>
        </nav>
    </header>
}