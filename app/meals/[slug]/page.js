
import { getMeal } from '@/app/lib/meals';
import classes from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function MealsDetailPage({params}) {
  const meal  = getMeal(params.slug);
  if(!meal){
    notFound();
  }
  meal.instructions=meal.instructions.replace(/\n/g,'<br />')
    return (
      <>
        <header className={classes.header}>
          <div className={classes.image}>
            <Image src={meal.image}  fill />
          </div>
          <div className={classes.headerText}>
             <h1>{meal && meal.title}</h1>
             <p className={classes.creator}>
               by <a href={`mailto:${'EMAIL'}`}>{meal.creator_email}</a> 
             </p>
             <p className={classes.summary}>{meal.summary}</p>
          </div>
        </header>
        <main className={classes.instructions} dangerouslySetInnerHTML={{__html:meal.instructions}}></main>
      </>
    );
  }
  