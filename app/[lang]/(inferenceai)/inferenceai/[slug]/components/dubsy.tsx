export default function Dubsy() {
  return (
    <div className="flex w-full max-w-7xl flex-col">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Before Video */}
        <div className="group/before flex-1">
          <div className="mb-3 text-center text-lg font-semibold text-white/80 transition-all group-hover/before:scale-105 group-hover/before:text-white">
            Before
          </div>
          <div className="cursor-pointer overflow-hidden rounded-lg transition-all group-hover/before:scale-105">
            <video
              src="/videos/dubsy-input.mp4"
              controls
              className="aspect-video w-full"
              playsInline
            />
          </div>
        </div>

        {/* After Video */}
        <div className="group/after flex-1">
          <div className="mb-3 text-center text-lg font-semibold text-white/80 transition-all group-hover/after:scale-105 group-hover/after:text-white">
            After
          </div>
          <div className="cursor-pointer overflow-hidden rounded-lg transition-all group-hover/after:scale-105">
            <video
              src="/videos/dubsy-output.mp4"
              controls
              className="aspect-video w-full"
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
}
