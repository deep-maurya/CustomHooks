import { useState, useRef, useEffect } from 'react';

export const useHover = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const onMouseEnter = () => setHovered(true);
      const onMouseLeave = () => setHovered(false);

      node.addEventListener('mouseenter', onMouseEnter);
      node.addEventListener('mouseleave', onMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', onMouseEnter);
        node.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [ref]);

  return [ref, hovered];
};
