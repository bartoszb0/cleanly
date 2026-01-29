export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div className="text-slate-100 font-bold mb-4 mt-24 text-8xl md:text-9xl select-none">
        404
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-2">
        Cleaner not found
      </h2>

      <p className="text-slate-400 max-w-md mb-8">
        We couldn't find the profile you're looking for. They might have moved
        or the link is incorrect.
      </p>
    </div>
  );
}
