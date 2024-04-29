import { useState, type ChangeEvent, type FormEvent } from 'react'

import styles from '@/styles/form.module.css'
import type { NewUser } from '@/types';
import { convertToNewUser, isValidEmail, isValidUsername } from '@/utils';

export const RegisterPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");

  let errorsCount: number = 0;

  const apiURL = "http://localhost:4000/users";


  const createUser = async (userData: NewUser) => {

    setIsLoading(true);

    if (errorsCount != 0) {
      return;
    }

    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      }

      console.log(userData);

      const response = await fetch(apiURL, fetchOptions);

      const data = await response.json();

      setIsLoading(false);

      const { message } = data;
      setResponse(message);
    }
    catch (error) {
      setIsLoading(false);
      setError(true);
      throw error;
    }

    setIsLoading(false);
  }

  // useEffect(() => {
  //   const inputs = document.querySelectorAll(`.${styles.formInput}`);

  //   inputs.forEach((el) => {
  //     el.addEventListener('input', inputValidation);
  //   })

  //   return () => {
  //     inputs.forEach((el) => {
  //       el.removeEventListener('input', inputValidation);
  //     });
  //   }
  // }, []);

  const validationChain = [
    {
      id: 'Name',
      required: true,
      min: 4,
      max: 50
    },
    {
      id: 'LastName',
      required: true,
      min: 5,
      max: 30
    },
    {
      id: 'UserName',
      required: true,
      min: 3,
      max: 15,
      validationType: 'username'
    },
    {
      id: 'Email',
      required: true,
      min: 5,
      max: 50,
      validationType: 'email'
    },
    {
      id: 'Password',
      required: true,
      min: 5,
      max: 15,
    },
  ]

  const inputValidation = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    const inputId = target.id;

    const field = validationChain.find((item) => item.id === inputId);

    const label = document.querySelector(`label[for=${inputId}]`);
    const errorEl = document.querySelector(`#${inputId} ~ .${styles.formFieldInputError}`) as HTMLParagraphElement;

    if (!field) {
      return;
    }

    if (!errorEl) {
      return;
    }

    if (!label) {
      return;
    }

    target.classList.remove('border-teal-500');
    label.classList.remove('text-teal-500')

    if (field.required && inputValue.trim() === '') {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');
      errorEl.textContent = `El campo ${field.id} es obligatorio`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    if (field.min && inputValue.length < field.min) {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');
      errorEl.textContent = `El campo ${field.id} debe tener al menos ${field.min} caracteres.`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    if (field.max && inputValue.length > field.max) {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');
      errorEl.textContent = `El campo ${field.id} no debe exceder los ${field.max} caracteres.`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    switch (field.validationType) {
      case 'username':
        if (!isValidUsername(inputValue)) {
          errorsCount++;

          label.classList.add('text-red-500');
          target.classList.add('border-red-500');
          errorEl.textContent = `El nombre de usuario debe contener entre 3 y 15 caracteres alfanuméricos (letras, números o guiones bajos).`;

          return;
        }
        else {
          if (errorsCount > 0) errorsCount--;
        }

        // if () {

        // }

        break;
      case 'email':
        if (!isValidEmail(inputValue)) {
          errorsCount++;

          label.classList.add('text-red-500');
          target.classList.add('border-red-500');
          errorEl.textContent = `Por favor ingrese un correo electrónico válido.`;

          return;
        }
        else {
          if (errorsCount > 0) errorsCount--;
        }

        break;
    }

    errorEl.textContent = "";
    target.classList.remove('border-red-500');
    label.classList.remove('text-red-500')

    target.classList.add('border-teal-500');
    label.classList.add('text-teal-500')
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;

    const formData = new FormData(formEl);

    const newUser = convertToNewUser(formData);

    if (!newUser) { return; }

    await createUser(newUser);
  }

  const buttonLoader = <span className="animate-spin w-6 h-6 border-2 rounded-full border-l-black"></span>

  return (
    <main className={`${styles.formBackground}`}>
      <a
        href="/"
        className={`${styles.exitLink}`}
        aria-label='Return to the landing page'>
        <span className="fas fa-arrow-left fa-xl"></span>
      </a>

      <form
        id="form:CreateUser"
        className={`${styles.form}`}
        method="POST"
        onSubmit={onSubmit}
      >

        <input name='Role' value={"0"} id="Role" className='hidden' type="text" />

        <section className={`${styles.brandContainer}`}>
          <img width={250} height={150} src="/brand-logo-full.svg" alt="Opus full brand logo" className="mx-auto" />
          <h1 className={`${styles.formTitle}`}>Registrarse en Opus</h1>
        </section>

        <section className={`${styles.formWrapperGrid}`}>
          <section className={`${styles.formFieldContainer}`}>
            <label className="label" htmlFor="Name">Nombre</label>
            <input
              aria-required
              required
              className={`${styles.formInput}`}
              type="text"
              placeholder="Jefferson"
              name="Name"
              id="Name"
              onInput={inputValidation}
            />
            <p className={`${styles.formFieldInputError}`}>
            </p>
          </section>

          <section className={`${styles.formFieldContainer}`}>
            <label className="label" htmlFor="LastName">Apellido(s)</label>
            <input
              required
              className={`${styles.formInput}`}
              aria-required
              type="text"
              placeholder="Gutierritos"
              name="LastName"
              id="LastName"
              onInput={inputValidation}
            />
            <p className={`${styles.formFieldInputError}`}>
            </p>
          </section>
        </section>

        <section className={`${styles.formFieldContainer}`}>
          <label className="label" htmlFor="UserName">Nombre de usuario</label>
          <section className="">
            <input
              aria-required
              required
              type="text"
              id="UserName"
              name="UserName"
              className={`${styles.formInput}`}
              placeholder="El buki"
              onInput={inputValidation}
            />
            <p className={`${styles.formFieldInputError}`}></p>
          </section>
        </section>

        <section className={styles.formFieldContainer}>
          <label className="label" htmlFor="Email">Correo electronico</label>
          <input
            aria-required
            required
            id="Email"
            name="Email"
            type="email"
            placeholder="alguien@example.com"
            className={`${styles.formInput}`}
            onInput={inputValidation}
          />
          <p className={`${styles.formFieldInputError}`}></p>
        </section>

        <section className={`${styles.formFieldContainer}`}>
          <label className="label" htmlFor="Password">Contraseña</label>
          <input
            className={`${styles.formInput}`}
            type="password"
            name="Password"
            id="Password"
            onInput={inputValidation}
          />
          <p className={`${styles.formFieldInputError}`}></p>
        </section>

        <section>
          <button className={`${styles.submitButton}`} disabled={isLoading}>
            {
              isLoading && !error && buttonLoader
            }
            {
              error && !isLoading && <span className='fas fa-times'></span>
            }
            {
              !error && !isLoading && response && <span className="fa fa-check"></span>
            }
            Registrarse
          </button>
        </section>

        {
          error && !isLoading && <p className="text-red-500">Error al abrirte una cuenta en Opus, por favor espera un tiempo y vuelvelo a intentar.</p>
        }

        {
          response && <p className="text-green-600 text-sm font-bold text-center capitalize">{response}</p>
        }

        {
          response && <a aria-label='Go to login' className="text-right" href="/login">Iniciar sesión</a>
        }
      </form>
    </main>
  )
}
