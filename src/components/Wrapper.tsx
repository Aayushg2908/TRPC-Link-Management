const Wrapper = ({ Heading, subHeading, createButton, children }: { Heading: string, subHeading: string, createButton?: any, children: React.ReactNode }) => {
  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-y-1 ml-2">
          <div className="text-3xl font-bold">{Heading}</div>
          <div className="opacity-60">{subHeading}</div>
        </div>
        {createButton}
      </div>
      {children}
    </div>
  )
}

export default Wrapper
