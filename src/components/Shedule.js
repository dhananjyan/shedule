import React, { useState } from 'react'
import '../css/shedule.css'
import { useDatas } from '../context/DataContext'
import Modal from './Modal'
import alergist from '../svg/alergist.svg'
import cardiologist from '../svg/cardiologist.svg'
import dentist from '../svg/dentist.svg'

export default function Shedule() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const { data: {categories} } = useDatas()
    const imageWanted = (name) => {
        switch (name) {
            case 'Dentist':
                return dentist
            case 'Alergist':
                return alergist
            case 'Cardiologist':
                return cardiologist
        
            default:
                return null
        }
    }
    const listCategories = categories.map((category) =>  
        <div class="items" style={{cursor:'pointer'}} key={category.name} onClick={()=>setSelectedCategory({name:category.name, id: category.id})}>
            <img src={imageWanted(category.name)} alt={category.name}/>
            <p>{category.name}</p>
        </div>
    ); 
    return (
        <div id="shedule-component">
            {listCategories}
            {selectedCategory ? <Modal category={selectedCategory} close={()=>setSelectedCategory(null)} /> : null}
        </div>
    )
}



