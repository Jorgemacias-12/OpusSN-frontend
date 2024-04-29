import { loggedUser } from '@/stores/UserStore';
import styles from '@/styles/form.module.css'
import type { AuthResponse, LoginData } from '@/types';
import { convertToLoginData, isValidEmail } from '@/utils';
import react, { useEffect, useState, type FormEvent } from 'react'


export const LoginPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<AuthResponse | null>(null);

  let errorsCount = 0;

  // TODO: I have also import the user store, to save the data there, and then
  // TODO: redirect to /feed.


  const login = async (loginData: LoginData) => {
    setError(false);

    const apiURL = "http://localhost:4000/users/auth";

    const fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),

    }

    setIsLoading(true);

    try {
      const response = await fetch(apiURL, fetchOptions);

      if (!response.ok) {
        const errors = await response.json();

        setError(true);
        setResponse(errors);
        setIsLoading(false);

        return;
      }

      setIsLoading(false);

      const data = await response.json();

      if (data && data.user) {
        loggedUser.set(data.user);
      }

      setResponse(data);
    }
    catch (err) {
      setError(true);
      setIsLoading(false);

      return;
    }

    location.href = "/feed";
  }

  const validationChain = [
    {
      id: "Email",
      required: true,
      validationType: "email"
    },
    {
      id: "Password",
      required: true,
    }
  ]

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;

    const formData = new FormData(formEl);

    if (errorsCount != 0) {
      return;
    }

    const data = convertToLoginData(formData);

    if (!data) return;

    await login(data);
  }

  const inputValidation = (event: Event) => {
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

    if (field.required && inputValue.trim() === '') {
      errorsCount++;

      label.classList.add('text-red-500');
      target.classList.add('border-red-500');

      errorEl.textContent = `El campo ${label.textContent} es obligatorio`;

      return;
    }
    else {
      if (errorsCount > 0) errorsCount--;
    }

    switch (field.validationType) {
      case "email":
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
  }

  useEffect(() => {
    const inputs = document.querySelectorAll(`.${styles.formInput}`);

    inputs.forEach((el) => {
      el.addEventListener('input', inputValidation);
    })

    return () => {
      inputs.forEach((el) => {
        el.removeEventListener('input', inputValidation);
      });
    }
  }, []);

  const buttonLoader = <span className="animate-spin w-6 h-6 border-2 rounded-full border-l-black"></span>

  const errorLogIn = !isLoading && error && response && response.error && response.error.message;

  const authenticated = !isLoading && !error && response && response.message;

  return (
    <main className={styles.formBackground}>
      <a
        href="/"
        className={`${styles.exitLink}`}
        aria-label='Return to the landing page'>
        <span className="fas fa-arrow-left fa-xl"></span>
      </a>

      <form
        id="form:Login"
        className={styles.form}
        method="POST"
        onSubmit={onSubmit}
      >
        <section className={styles.brandContainer}>
          <img width={250} height={150} src="/brand-logo-full.svg" alt="Opus full brand logo" className="mx-auto" />
          <h1 className={`${styles.formTitle}`}>Inicio de sesión</h1>
        </section>

        <section className={styles.formFieldContainer}>
          <label className="label" htmlFor="Email">Correo electrónico</label>
          <input required className={styles.formInput} type="email" name="Email" id="Email" />
          <p className={styles.formFieldInputError}></p>
        </section>

        <section className={styles.formFieldContainer}>
          <label className="label" htmlFor="Password">Contraseña</label>
          <input required className={styles.formInput} type="password" name="Password" id="Password" />
          <p className={styles.formFieldInputError}></p>
        </section>

        <section className="">
          <button className={styles.submitButton} disabled={isLoading}>
            {
              isLoading && !error && buttonLoader
            }
            {
              error && !isLoading && <span className='fas fa-times'></span>
            }
            {
              !error && !isLoading && response?.message === null && <span className="fa fa-check"></span>
            }

            {
              isLoading && !error ? "Iniciando sesión..." : "Iniciar sesión"
            }

          </button>
        </section>

        {
          errorLogIn && <p className="text-sm text-red-500">{response.error!.message}</p>
        }

        {
          authenticated && <p className="text-center text-sm text-green-700">{response.message}</p>
        }

        <p className="text-xs text-right">
          ¿No tienes cuenta? crea una <a className="hover:text-indigo-400 hover:underline" href="/register">aquí</a>
        </p>
      </form>
    </main>
  )
}
