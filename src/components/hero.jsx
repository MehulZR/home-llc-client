function Hero() {
  return (
    <div className="flex-auto scroll-smooth">
      <div
        className="h-[calc(100vh-3.5rem)] scroll-mt-14 flex justify-center items-center font-semibold bg-pink-300"
        id="one"
      >
        One
      </div>
      <div
        className="h-[calc(100vh-3.5rem)] scroll-mt-14 flex justify-center items-center font-semibold bg-blue-300"
        id="two"
      >
        Second
      </div>
      <div
        className="h-[calc(100vh-3.5rem)] scroll-mt-14  flex justify-center items-center font-semibold bg-green-300"
        id="three"
      >
        Third
      </div>
    </div>
  );
}
export default Hero;
