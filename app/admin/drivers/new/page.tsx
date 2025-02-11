import NewDriverForm from '@/app/components/admin/drivers/new-driver-form';

export default function NewDriverPage() {
  return (
    <div className='min-h-screen bg-[#111]'>
      <main className='p-4 lg:ml-64 lg:p-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-6'>Add New Driver</h1>
          <NewDriverForm />
        </div>
      </main>
    </div>
  );
}
