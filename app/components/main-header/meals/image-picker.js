'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';
export default function ImagePicker({label,name}){
    const[pickedImage,setPickedImage]=useState();
     const  imageInput=  useRef();
    function handlePickerClick(){
        imageInput.current.click();
    }
    function handleImageChange(event){
        debugger
         const file=event.target.files[0]
         if(!file){
            setPickedImage(null);
            return;
         }
         const fileReader = new FileReader();
         fileReader.onload=()=>{
            setPickedImage(fileReader.result);

         };
         fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No Image picked yet</p>}
                    {pickedImage &&  <Image src={pickedImage} alt="Image selected by user" fill/>}
                </div>
                <input required className={classes.input} onChange={handleImageChange} type="file" id={name} ref={imageInput} name={name} accept='image/png,image/jpeg' />
                <button className={classes.button} type='button' onClick={handlePickerClick}>Pick an image</button>
            </div>
        </div>
    )
}