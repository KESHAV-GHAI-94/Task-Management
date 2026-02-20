import React from 'react';

const KanbanViewSection = () => {
  return (
<div className="bg-linear-to-r from-orange-400 to-yellow-400 lg:max-h-[224px] text-white rounded-xl shadow-sm p-5 lg:p-5 hover:shadow-md transition">
              <div className='lg:py-8 xl:py-11 items-center'>
              <div className="flex items-center  justify-between">
                <div>
                  <h2 className="font-semibold text-lg">Kanban Board</h2>
                  <p className="text-sm opacity-90">
                    View and manage your tasks visually
                  </p>
                </div>

                {/* Kanban icon */}
                <div className="flex gap-1">
                  <div className="w-2 h-6 bg-white/80 rounded"></div>
                  <div className="w-2 h-4 bg-white/80 rounded"></div>
                  <div className="w-2 h-5 bg-white/80 rounded"></div>
                </div>
              </div>

              {/* Button */}
              <div className="mt-4">
                <button
                  className="bg-white text-orange-600 px-4 py-1.5 rounded-md text-sm cursor-pointer font-medium hover:bg-orange-50 transition">
                  Go to Kanban →
                </button>
              </div>
              </div>
            </div>
  );
};

export default KanbanViewSection;