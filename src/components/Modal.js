import React, { useState, useEffect } from 'react'
import { DateInput, Select, TextareaInput } from '../forms/Inputs'
import { useDatas } from '../context/DataContext'
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Validate from '../forms/Validate'
import '../css/modal.css'
import Button from '../buttons/Button'
import { useQuery, useMutation } from '@apollo/client'
import {categoriedDoctors, addEventQuery} from '../query/query'
import { modalFormControls } from '../forms/Forms'
import moment from 'moment'

export default function Modal({ category: {name, id}, close }) {
  const { data: {datas: { userId }}} = useDatas()
  const [addEvent] = useMutation(addEventQuery)
  const [loadings, setLoadings] = useState(false)
  const [busyTimes, setBusyTimes] = useState(null)
  const [formIsValid, setFormIsValid] = useState(false)
  const [formControls, setFormControls] = useState(modalFormControls)
    const { loading, data } = useQuery(categoriedDoctors,{ variables: { id } })
    useEffect(() => {
      if(!loading){
        let options = data.category.providers.map((doctor)=>{
            return {value: doctor.id, displayValue: doctor.username}
        })
        let allControls = {
          ...formControls
        }
        let updatedDoctorElement = {
          ...allControls['doctor']
        }
        updatedDoctorElement.options = options
        allControls['doctor'] = updatedDoctorElement
        setFormControls(allControls)
      }
    },[data])
    useEffect(() => {
      if(!loading){ 
        data.category.providers.map((provider) => {
          if(provider.id === formControls['doctor'].value) {
            let times = provider.events.map((event)=> {
              return { date: moment(event.start).zone(-330).format("YYYY-MM-DD"), start: moment(event.start).zone(-330).format("h:mm A"), end: moment(event.end).zone(-330).format("h:mm A")}
            })
            console.log(times)
            setBusyTimes(times)
          }
        }) 
      }
      
    },[formControls['doctor'].value])
    // useEffect(() => {
    //   if(!loading) {
    //     let times = busyTimes.filter((times) => {
    //       return times.date === formControls['date'].value
    //     })
    //     console.log(busyTimes)
    //     console.log(times)
    //     setBusyTimes(times)
    //   }
    //   console.log('date changed')
    // },[formControls['date'].value])

    
    // useEffect(() => {
    //   function giveUtc(start) {
    //     var t = moment().format("YYYY-MM-DD")
    //     var t1 = t + " " + start
    //     return moment(t1, "YYYY-MM-DD h:mm A").format()
      
    //   }
      
      
    //   if(busyTimes){
    //   busyTimes.sort((a, b) => {
    //     var utcA = giveUtc(a.start)
    //     var utcB = giveUtc(b.start)
    //     if (utcA < utcB) {
    //       return -1
    //     }
    //     if (utcA > utcB) {
    //       return 1
    //     }
    //     return 0
    //   })
      
    //   const availableTimeArray = []
      
    //   let endTimeFarthest = moment(giveUtc("0.00 AM"))
    //   let startTimeMinimum = moment(giveUtc("12.59 PM"))
      
    //   busyTimes.forEach((element, index) => {
    //     let currentEndTime = moment(giveUtc(element.end))
    //     const currentStartTime = moment(giveUtc(element.start))
    //     if (currentStartTime.isBefore(startTimeMinimum)) {
    //       startTimeMinimum = currentStartTime
    //     }
    //     if (currentEndTime.isAfter(endTimeFarthest)) {
    //       endTimeFarthest = currentEndTime
    //     }
    //     /* console.log(startTimeMinimum.format("h:mm A"), endTimeFarthest.format("h:mm A")) */
    //     if (index === busyTimes.length - 1) {
    //       if (busyTimes.length === 1) {
    //         availableTimeArray.push({
    //           start: "00:00 AM",
    //           end: currentStartTime.format("h:mm A")
    //         })
    //       }
    //       availableTimeArray.push({
    //         //start: currentEndTime.format("h:mm A"),
    //         start: endTimeFarthest.format("h:mm A"),
    //         end: "11.59 PM"
    //       })
      
    //     } else {
    //       const nextBusyTime = busyTimes[index + 1]
    //       const nextStartTime = moment(giveUtc(nextBusyTime.start))
    //       if (index === 0) {
    //         availableTimeArray.push({
    //           start: "00:00 AM",
    //           end: currentStartTime.format("h:mm A")
    //         })
    //       }
    //       let endTimeToCompare = currentEndTime.isBefore(endTimeFarthest) ? endTimeFarthest : currentEndTime
    //       if (endTimeToCompare.isBefore(nextStartTime)) {
    //         availableTimeArray.push({ 
    //           start: endTimeToCompare.format("h:mm A"),
    //           end: nextStartTime.format("h:mm A")
    //         })
    //       }
      
    //     }
      
    //   })
    //   console.log(availableTimeArray)
    // }
    // },[busyTimes])
    let display = 'display-block'
    
    const changeHandler = (event) => {
        console.log('changehandler')
          const name = event.target.name
          const value = event.target.value
          const updatedControls = {
            ...formControls
          }
          const updatedFormElement = {
            ...updatedControls[name]
          }
          updatedFormElement.value = value;
          updatedFormElement.touched = true;
          updatedFormElement.valid = Validate(value, updatedFormElement.validationRules)
    
          updatedControls[name] = updatedFormElement
    
          let formIsValid = true
          for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid
          }
          console.log(updatedControls)
          console.log(formIsValid)
          setFormControls(updatedControls)
          setFormIsValid(formIsValid)
    
      }
      const changeTimeHandler = (value) => {
        value = moment(value,'h:mm A')
        const updatedControls = {
          ...formControls
        }
        const updatedFormElement = {
          ...updatedControls['time']
        }
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        
        let times = busyTimes.filter((times) => {
          return times.date === formControls['date'].value
        })
        
        updatedFormElement.valid = times.every(time => {
          return !value.isBetween(moment(time.start,'h:mm A'), moment(time.end,'h:mm A'))
        });
        console.log("Time is valid or not"+updatedFormElement.valid)
        // updatedFormElement.valid = Validate(value, updatedFormElement.validationRules)
  
        updatedControls['time'] = updatedFormElement
  
        let formIsValid = true
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid && formIsValid
        }
        console.log(busyTimes)
        console.log(updatedControls)
        console.log("Form is valid or not: "+formIsValid)
        setFormControls(updatedControls)
        setFormIsValid(formIsValid)
      }
      const formSubmitHandler = () => {
        setLoadings(true)
          let time = moment(formControls['date'].value + " " + moment(formControls['time'].value).format('h:mm A'))
          let start = time.format()
          let end = time.add(30, 'm').format()
          addEvent({ variables: { 
            title: formControls['desc'].value,
            start,
            end,
            userId,
            providerId: formControls['doctor'].value
           } }).then((data)=>close())
          setLoadings(false)
      }
    return (
        <div id='modal' className={`modal ${display}`}>
            <section className="modal-main">
                <div className='close' style={{textAlign:'flex-end'}} onClick={close}>X</div>
                <div className="heading">Shedule appoitment to {name}</div>
                
                <Select name="doctor" 
                    placeholder={formControls.doctor.placeholder}
                    value={formControls.doctor.value}
                    onChange={changeHandler}
                    touched={formControls.doctor.touched}
                    valid={formControls.doctor.valid}
                    className={formControls.doctor.className}
                    options={formControls.doctor.options}
                />
                {formControls['doctor'].valid && <DateInput name="date" 
                    placeholder={formControls.date.placeholder}
                    value={formControls.date.value}
                    onChange={changeHandler}
                    touched={formControls.date.touched}
                    valid={formControls.date.valid}
                    className={formControls.date.className}
                />}
                {formControls['date'].valid && <TimePicker
                  placeholder={formControls.time.placeholder}
                  value={formControls.time.value}
                  showSecond={false}
                  use12Hours={true}
                  minuteStep={30}
                  name={'time'}
                  onChange={changeTimeHandler}
                  className={formControls.time.className}
                />}
                {formControls['time'].valid && <TextareaInput
                    name={'desc'}
                    placeholder={formControls.desc.placeholder}
                    value={formControls.desc.value}
                    onChange={changeHandler}
                    touched={formControls.desc.touched}
                    valid={formControls.desc.valid}
                    className={formControls.desc.className}
                />}
                
                <Button onClick={formSubmitHandler} 
                  disabled={!formIsValid}
                  className='btn' 
                  type='submit'
                  name='shedule'
                  loading={loadings}
                />
            </section>
        </div>
    )
}
















