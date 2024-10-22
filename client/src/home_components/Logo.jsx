import '../styles/fonts.css';

function Logo() {
  return (
    <div className='text-black my-2 mx-2 md:mx-6 md:mt-3 w-fit'>
      <h1
        className="text-2xl md:text-3xl lg:text-4xl font-bold montserrat-alternates-semibold"
        style={{
          background: 'linear-gradient(90deg, #1E3A8A, #1E40AF, #1E3A8A)', // Darker bluish gradient
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        eventure
      </h1>
    </div>
  );
}

export default Logo;
