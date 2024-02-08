
import '../index.css'

const Navbarlanding = () => {
  return (
    <nav className="bg-purple-800 border-black flex px-5 py-3 text-white w-full" >
      <div>
      <ul className='px-20 py-4 flex  space-x-3 '>
        <li>Learn</li>
        <li>Speaking</li>
        <li>Writing</li>
        <li>Listening</li>
        <li>Reading</li>
        <li>Pricing</li>
        
        
      </ul>
      </div>
     
      <div>
        <button className='bg-blue-400 mt-1.5  '>Signin/Signup</button>
      </div>
    </nav>
  );
};

export default Navbarlanding;
