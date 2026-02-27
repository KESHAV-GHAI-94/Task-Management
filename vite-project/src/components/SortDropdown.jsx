import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
const SortDropdown = ({ sortType, setSortType }) => {
  const [open, setOpen] = useState(false);
  const options = [
    { value: "dateDesc", label: "Newest" },
    { value: "nameAsc", label: "A-Z" },
    { value: "nameDesc", label: "Z-A" },
  ];
  const selected = options.find((o) => o.value === sortType);
  return (
    <div className="relative  inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center  gap-1 md:gap-2 bg-taupe-100 hover:bg-taupe-200 border border-taupe-300 text-taupe-800 px-1 md:px-3 py-1 md:py-2 rounded-lg shadow-sm text-sm transition"
      >
        <ArrowUpDown size={14} />
        {selected?.label}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute mt-2 text-center w-25 sm:w-29 bg-white border border-taupe-200 rounded-lg shadow-md overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSortType(option.value);
                setOpen(false);
              }}
              className={`
                px-3 py-2 text-sm cursor-pointer
                hover:bg-taupe-100
                border border-taupe-200
                ${
                  sortType === option.value
                    ? "bg-taupe-200 text-taupe-900 font-medium"
                    : "text-taupe-700"
                }
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
