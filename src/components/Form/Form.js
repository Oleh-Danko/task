import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useHttp } from '../../hooks/httpHook'

import Success from '../Success/Success';

import './form.scss'

export default function Form({getUsers, setPage}) {
  const [positions, setPositions] = useState([])
  const [token, setToken] = useState('')
  const {request} = useHttp()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    watch,
  } = useForm({
    defaultValues: {
      phone: '',
      email: '',
      name: '',
      photo: null,
      position_id: '1'
    },
    mode: 'all'
  })

  useEffect(() => {
    request(`https://frontend-test-assignment-api.abz.agency/api/v1/token`)
      .then(data => setToken(data.token))
    request(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
      .then(data => setPositions(data.positions))
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('position_id', data.position_id);
    formData.append('name', data.name); 
    formData.append('email', data.email); 
    formData.append('phone', data.phone); 
    formData.append('photo', data.photo[0]);

    await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      body: formData,
      headers: { 'Token': token }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if(res.success) {
        setSuccess(true)
        setPage(1)
        getUsers()
      }  else {
        alert(JSON.stringify(`${res.message}, status: ${res.status}`))
      }
    });
  };

  const renderForm = () => (
    <div className='form'>
      <div className="container">
        <h2 className="form__title title">Working with POST request</h2>
        <form className='form__wrapper' onSubmit={handleSubmit(onSubmit)}>

          {watch().name && <label className='form__input-label' htmlFor="name">Your name</label>} 
          <input 
            className={`form__input ${errors.name && 'error-border'}`} 
            type="text" 
            {...register('name', {
              required: 'This is required',
              minLength : {
                value: 2,
                message: 'Minimum 2 letters'
              }, 
              maxLength: {
                value: 60,
                message: 'Max 60 letters'
              }
            })}
            placeholder='Your name'/>
          <p className='error-text'>{errors.name?.message}</p>

          {watch().email && <label className='form__input-label' htmlFor="email">Email</label>}
          <input 
            className={`form__input ${errors.email && 'error-border'}`} 
            type="text" 
            {...register("email", {
              required: 'This is required',
              minLength : {
                value: 2,
                message: 'Minimum 2 letters'
              }, 
              maxLength: {
                value: 100,
                message: 'Max 60 letters'
              },
              pattern: {
                // value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                message: 'Invalid email adress'
              }
            })}
            placeholder='Email'/> 
          <p className='error-text'>{errors.email?.message}</p>

          {watch().phone && <label className='form__input-label' htmlFor="email">Phone</label>}
          <input 
            className={`form__input ${errors.phone && 'error-border'}`} 
            type="number" 
            {...register('phone', {
              pattern: {
                value: /^[\+]{0,1}380([0-9]{9})$/,
                message: 'Invalid phone number'
              }
            })} 
            placeholder='Phone'/> 
            <p className={errors.phone ? 'phone-mask-error' : 'phone-mask'}>+38 (XXX) XXX - XX - XX</p>

          <p>Select your position</p>
          <div className="form__positions">
            {
              positions.map(item => (
                <label key={item.id}><input 
                  type="radio" 
                  {...register('position_id')}
                  name='position_id' 
                  value={item.id}/>{item.name}</label>
              ))
            }
          </div>

          <div className="form__upload">
            <label htmlFor="photo" className="form__upload-label">
              <div className={errors.photo ? 'error-border' : ''} >Upload</div>
            </label>
              <span className={errors.photo ? 'error-border-span' : ''}>{watch().photo ? watch().photo[0].name : 'Upload your photo' }</span>

            <input 
              id='photo'
              {...register('photo')} 
              type="file"
              accept="image/jpg, image/jpeg" />
          </div>

          <button 
            disabled={!isValid} 
            className="btn form__btn">Sign up</button>
        </form>
      </div>
  </div>
  )

  return (
    <>
      {success ? <Success /> : renderForm()} 
    </>
  )
}
