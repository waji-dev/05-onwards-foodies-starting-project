import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss  from 'xss';
import fs from 'node:fs'

const db = sql('meals.db');
export async function getMeals(){
    console.log("fetching meals")
     await new Promise((resolve) => setTimeout(resolve,2000));
    // db.prepare('delete from meals where id=8').run();
    return db.prepare('select * from meals').all();
}
export function getMeal(slug){
    console.log(slug);
  //  await new Promise((resolve) => setTimeout(resolve,5000));
    //throw new Error("loading db failed");
    return db.prepare('select * from meals where slug = ? ').get(slug);
}
export async function saveMeal(meal){
    meal.slug= slugify(meal.title,{lower:true});
    meal.instructions=xss(meal.instructions);
    const extension =meal.image.name.split('.').pop();
    const fileName =  `${meal.slug}.${extension}`
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage=await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage),(error)=>{
        if(error){
            throw new Error('saving image failed');
        }
    });
    meal.image=`/images/${fileName}`;
    db.prepare(`
        INSERT INTO meals(title,summary,instructions,creator,creator_email,image,slug)
        values(@title,@summary,@instructions,@creator,@creator_email,@image,@slug)
    `).run(meal);
}