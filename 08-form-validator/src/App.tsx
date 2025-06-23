import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from './schema';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Form Validator</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('name')} placeholder="Name" />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="Email" />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <input type="number" {...register('age')} placeholder="Age" />
          {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

