import { useRef } from "react";

type Props = {
  skills: string[];
};

export default function SkillPills({ skills }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.2; // scroll speed factor
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto whitespace-nowrap cursor-grab scrollbar-hide select-none"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xl rounded-full bg-gray-800 text-white font-medium inline-block"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
