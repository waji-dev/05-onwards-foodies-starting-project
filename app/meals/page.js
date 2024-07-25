import Link from "next/link"
import classes from './page.module.css'
import MealsGrid from "@/app/components/main-header/meals/meal-grid"
import { getMeals } from "@/app/lib/meals"
import { Suspense } from "react";
async function Meals(){
  const meals  = await getMeals();
  return (<MealsGrid meals={meals} />)
}
export default async function MealsPage() {

   const meals = await getMeals();
    return (
    <>
      <header className={classes.header}>
        <h1>
          Delcious meals , created {' '}
          <span className={classes.highlight}>by you</span>
          <p>Choose your favourite reciepe and cook it yourself . It is easy and fun! </p>
          <p className={classes.cta}>
            <Link href="/meals/share">Share  your favourite  Reciepe </Link> </p>
        </h1>
      </header>
      <main className={classes.main}>
      <Suspense  fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
    );
  }
  