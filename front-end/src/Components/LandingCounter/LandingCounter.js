// import React, { useEffect, useState } from 'react'

// export default function LandingCounter({count}) {
//     const [courseCounter, setCourseCounter] = useState(0)

//     useEffect(() => {
//         let interval = setInterval(() => {
//             setCourseCounter(prev => prev + 1)
//         }, 1);

//         if (courseCounter === count) {
//             clearInterval(interval)
//         }

//         return () => clearInterval(interval)
//     }, [courseCounter])


//     return <span className="landing-status__count">{courseCounter}</span>
// }

import React, { useEffect, useState } from 'react';

export default function LandingCounter({ count }) {
  const [courseCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    if (courseCounter >= count) return; // اگر رسید به مقدار هدف، کار را متوقف کن

    const interval = setInterval(() => {
      setCourseCounter(prev => {
        if (prev >= count) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1); // 10 میلی‌ثانیه، می‌تونی تغییر بدی سرعت رو

    return () => clearInterval(interval); // پاکسازی وقتی کامپوننت حذف شد یا مقدار تغییر کرد
  }, [count, courseCounter]);

  return <span className="landing-status__count">{courseCounter}</span>;
}

