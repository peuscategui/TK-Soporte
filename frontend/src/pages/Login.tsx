import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

interface LoginForm {
  email: string;
  password: string;
}

// Obtener la URL base del backend desde las variables de entorno inyectadas
const API_URL = (window as any).ENV?.REACT_APP_API_URL || 'http://192.168.40.79:5000';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      // Log de la URL que se está usando
      console.log('Using API URL:', API_URL);
      console.log('Full login URL:', `${API_URL}/auth/login`);
      console.log('Login data:', data);

      // Hacer la petición al backend
      const response = await axios.post(`${API_URL}/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Log de la respuesta
      console.log('Login response:', response.data);

      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      // Log detallado del error
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });

      setError('root', {
        type: 'manual',
        message: error.response?.data?.message || 'Error al iniciar sesión',
      });
    }
  };

  // Log al montar el componente
  React.useEffect(() => {
    console.log('Environment:', {
      apiUrl: API_URL,
      nodeEnv: (window as any).ENV?.NODE_ENV,
      windowEnv: (window as any).ENV
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          TK Soporte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Inicia sesión para acceder al sistema
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Usuario"
              type="text"
              autoComplete="username"
              error={errors.email?.message}
              {...register('email', {
                required: 'Este campo es requerido',
              })}
            />

            <Input
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 8,
                  message: 'La contraseña debe tener al menos 8 caracteres',
                },
              })}
            />

            {errors.root && (
              <p className="text-sm text-red-600">{errors.root.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
            >
              Iniciar sesión
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;