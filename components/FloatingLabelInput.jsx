
const FloatingLabelInput = ({ type, id, label }) => {
  return (
    <div className="relative h-fit">
      <input type={type} name={id} id={id} placeholder=" "
        className="w-full h-[42px] border border-border rounded-md bg-background px-3 py-2 text-base outline-none peer placeholder-transparent" //ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      />
      <label htmlFor={id}
        className="absolute transition-all duration-200 bg-background text-sm px-1 rounded left-3 -top-1/2 translate-y-[50%] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-[50%] peer-focus:-top-1/2 peer-focus:translate-y-[50%] peer-focus:text-sm"
      >
        {label}
      </label>
    </div>

  )
}

export default FloatingLabelInput