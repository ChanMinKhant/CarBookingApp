import DateDropdown from '../../utils/DateDropdown';
import TimeDropdown from '../../utils/TimeDropdown';

const AdminApproveForm = () => {
  return (
    <>
      <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className='m-5'>
          <DateDropdown />
          <TimeDropdown />
        </div>
        <div className='border-2 border-red-300 px-2 py-2 my-1 font-bold rounded-lg'>
          <section></section>
        </div>
      </div>
    </>
  );
};

export default AdminApproveForm;
